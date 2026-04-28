import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartData,
    type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SceneFrame from '../components/SceneFrame';
import { useIndustry } from '../hooks/useIndustry';
import type { ChatScript, IndustryKey, SceneComponentProps } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ORION_BLUE = '#185FA5';
const ORION_TEAL = '#1D9E75';
const ORION_DARK = '#2C2C2A';

const toneClass: Record<'positive' | 'negative' | 'neutral', string> = {
    positive: 'text-orionTeal',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
};

const wait = (ms: number): Promise<void> => new Promise((resolve) => {
    window.setTimeout(resolve, ms);
});

const slug = (value: string): string => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getBarTag = (industry: IndustryKey, label: string, index: number): string => {
    if (industry === 'shipping') return `vessel-${index + 1}`;
    if (industry === 'finance') return label.toLowerCase() === 'sme' ? 'sme-bar' : `${slug(label)}-bar`;
    return `${slug(label)}-bar`;
};

interface SignalTag {
    tag: string;
    label: string;
}

const getSignalTags = (industry: IndustryKey): SignalTag[] => {
    if (industry === 'shipping') {
        return [
            { tag: 'weather-rough', label: 'Rough Sea: 7 Days' },
            { tag: 'port-tanjung-priok', label: 'Tanjung Priok Wait: 14h Avg' },
        ];
    }
    if (industry === 'finance') {
        return [
            { tag: 'surabaya-branch', label: 'Surabaya Delinquency: 41%' },
            { tag: 'q4-cohort', label: 'Q4 2025 High-DSR Cohort' },
        ];
    }
    return [
        { tag: 'surabaya-dc', label: 'Surabaya DC Fill Rate: 61%' },
        { tag: 'east-java-region', label: 'East Java Demand: +22%' },
    ];
};

interface ChatMessage {
    role: 'user' | 'ai';
    text: string;
}

const Scene5Chat: React.FC<SceneComponentProps> = ({ mode }) => {
    const { data } = useIndustry();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const runTokenRef = useRef(0);

    const interactive = mode === 'explore';
    const signalTags = useMemo(() => getSignalTags(data.key), [data.key]);

    const primaryData = useMemo<ChartData<'bar'>>(() => ({
        labels: data.primaryChart.xLabels,
        datasets: data.primaryChart.series.map((series, seriesIndex) => ({
            label: series.label,
            data: series.data,
            backgroundColor: series.data.map((_, pointIndex) => {
                if (series.highlight?.includes(pointIndex)) return ORION_TEAL;
                return seriesIndex === 0 ? ORION_BLUE : 'rgba(24,95,165,0.35)';
            }),
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 56,
        })),
    }), [data.primaryChart]);

    const primaryOptions = useMemo<ChartOptions<'bar'>>(() => ({
        responsive: true,
        maintainAspectRatio: false,
        events: interactive ? ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'] : [],
        animation: {
            duration: 1200,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: ORION_DARK,
                    font: {
                        size: 14,
                        weight: 600,
                    },
                },
            },
            tooltip: {
                enabled: interactive,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: ORION_DARK,
                    font: { size: 14, weight: 600 },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: ORION_DARK,
                    font: { size: 14, weight: 500 },
                },
                grid: {
                    color: 'rgba(44,44,42,0.09)',
                },
            },
        },
    }), [interactive]);

    const clearHighlights = useCallback(() => {
        document.querySelectorAll<HTMLElement>('[data-tag].animate-soft-pulse').forEach((element) => {
            element.classList.remove('animate-soft-pulse');
        });
    }, []);

    const applyHighlights = useCallback((targets?: string[]) => {
        if (!targets || targets.length === 0) return;
        targets.forEach((target) => {
            document.querySelectorAll<HTMLElement>(`[data-tag="${target}"]`).forEach((element) => {
                element.classList.add('animate-soft-pulse');
            });
        });
    }, []);

    const runScript = useCallback(async (script: ChatScript) => {
        const token = runTokenRef.current + 1;
        runTokenRef.current = token;

        const isCurrent = (): boolean => runTokenRef.current === token;

        clearHighlights();
        setIsAnalyzing(false);
        setIsStreaming(true);
        setMessages([{ role: 'user', text: '' }]);

        try {
            for (let index = 1; index <= script.userQuery.length; index += 1) {
                if (!isCurrent()) return;
                setMessages([{ role: 'user', text: script.userQuery.slice(0, index) }]);
                await wait(30);
            }

            if (!isCurrent()) return;
            setIsStreaming(false);
            setIsAnalyzing(true);
            await wait(1200);

            if (!isCurrent()) return;
            setIsAnalyzing(false);
            setIsStreaming(true);

            const words = script.aiResponse.split(' ');
            for (let index = 0; index < words.length; index += 1) {
                if (!isCurrent()) return;
                const aiText = words.slice(0, index + 1).join(' ');
                setMessages([
                    { role: 'user', text: script.userQuery },
                    { role: 'ai', text: aiText },
                ]);
                applyHighlights(script.highlightTargets);
                await wait(80);
            }
        } finally {
            if (isCurrent()) {
                setIsAnalyzing(false);
                setIsStreaming(false);
            }
        }
    }, [applyHighlights, clearHighlights]);

    useEffect(() => {
        const initialScript = data.chatScripts[0];
        if (initialScript) {
            void runScript(initialScript);
        }

        return () => {
            runTokenRef.current += 1;
            clearHighlights();
        };
    }, [clearHighlights, data.key, data.chatScripts, mode, runScript]);

    const followUps = data.chatScripts[0]?.followUps ?? [];

    const handleFollowUpClick = useCallback((chipIndex: number) => {
        const mappedIndex = chipIndex === 0 ? 1 : chipIndex === 1 ? 2 : 0;
        const script = data.chatScripts[mappedIndex] ?? data.chatScripts[0];
        if (!script) return;
        void runScript(script);
    }, [data.chatScripts, runScript]);

    return (
        <SceneFrame label="Chat with Data">
            <div className="relative flex-1 bg-gradient-to-br from-orionSurface via-white to-orionSurface p-8 md:p-10 overflow-hidden">
                <div className="mx-auto h-full max-w-[1500px] grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(380px,2fr)] gap-5">
                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`bg-white rounded-2xl shadow-booth-card p-5 flex flex-col ${interactive ? '' : 'pointer-events-none'}`}
                    >
                        <div className="flex items-end justify-between gap-3 mb-4">
                            <div>
                                <h2 className="text-[32px] font-bold text-orionDark">Live Operations Snapshot</h2>
                                <p className="text-[18px] text-orionDark/70 mt-1">{data.context}</p>
                            </div>
                            <span className="rounded-full bg-orionBlue/10 px-4 py-1.5 text-[18px] font-semibold text-orionBlue">{data.displayName}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {data.kpis.map((kpi) => (
                                <div key={kpi.label} className="rounded-xl bg-orionSurface px-4 py-3 border border-orionDark/5">
                                    <div className="text-[18px] text-orionDark/70">{kpi.label}</div>
                                    <div className="text-[28px] font-semibold text-orionDark mt-1">{kpi.value}</div>
                                    <div className={`text-[18px] font-semibold mt-1 ${toneClass[kpi.tone]}`}>{kpi.delta}</div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-orionDark/10 p-4 flex-1 flex flex-col">
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <h3 className="text-[28px] font-semibold text-orionDark">{data.primaryChart.title}</h3>
                                {data.primaryChart.unit && (
                                    <span className="text-[18px] text-orionDark/60">Unit: {data.primaryChart.unit}</span>
                                )}
                            </div>

                            <div className="h-[240px] md:h-[260px]">
                                <Bar data={primaryData} options={primaryOptions} />
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {data.primaryChart.xLabels.map((label, index) => {
                                    const tag = getBarTag(data.key, label, index);
                                    return (
                                        <div
                                            key={tag}
                                            data-tag={tag}
                                            className="rounded-full border border-orionBlue/25 bg-orionSurface px-3 py-1.5 text-[18px] text-orionDark"
                                        >
                                            {label}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {signalTags.map((signal) => (
                                    <div
                                        key={signal.tag}
                                        data-tag={signal.tag}
                                        className="rounded-full border border-orionTeal/30 bg-orionTeal/10 px-3 py-1.5 text-[18px] text-orionDark"
                                    >
                                        {signal.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <motion.aside
                        initial={{ opacity: 0, x: 120 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="bg-white rounded-2xl shadow-booth-card p-5 flex flex-col min-h-[640px] xl:min-h-0 w-full xl:max-w-[420px] xl:justify-self-end"
                    >
                        <div className="mb-4">
                            <h3 className="text-[32px] font-bold text-orionDark">Chat with Data</h3>
                            <p className="text-[18px] text-orionDark/65 mt-1">Ask questions, get grounded answers.</p>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={`${message.role}-${index}-${message.text.length}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`max-w-[95%] rounded-2xl px-4 py-3 text-[18px] leading-relaxed ${message.role === 'user' ? 'ml-auto bg-orionBlue text-white' : 'mr-auto bg-orionSurface border border-orionDark/10 text-orionDark'}`}
                                >
                                    {message.text}
                                </motion.div>
                            ))}

                            <AnimatePresence>
                                {isAnalyzing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        className="mr-auto rounded-2xl px-4 py-3 text-[18px] bg-orionSurface border border-orionDark/10 text-orionDark inline-flex items-center gap-2"
                                    >
                                        <span>AutoInsight is analyzing</span>
                                        <span className="inline-flex items-center gap-1">
                                            {[0, 1, 2].map((dot) => (
                                                <motion.span
                                                    key={dot}
                                                    className="w-2 h-2 rounded-full bg-orionTeal"
                                                    animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                                                    transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.15 }}
                                                />
                                            ))}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {mode === 'explore' && (
                            <div className="pt-4 border-t border-orionDark/10 mt-4">
                                <div className="text-[18px] font-semibold text-orionDark mb-2">Follow-up questions</div>
                                <div className="flex flex-wrap gap-2">
                                    {followUps.map((followUp, chipIndex) => (
                                        <button
                                            key={followUp}
                                            type="button"
                                            onClick={() => handleFollowUpClick(chipIndex)}
                                            disabled={isAnalyzing || isStreaming}
                                            className="rounded-full border border-orionBlue px-4 py-2 text-[18px] text-orionBlue font-semibold hover:bg-orionBlue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {followUp}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.aside>
                </div>
            </div>
        </SceneFrame>
    );
};

export default Scene5Chat;
