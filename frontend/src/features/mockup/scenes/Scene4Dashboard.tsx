import React, { useEffect, useMemo, useState } from 'react';
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
import config from '../data/config.json';
import { useIndustry } from '../hooks/useIndustry';
import type { IndustryKey, MapPoint, SceneComponentProps } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ORION_BLUE = '#185FA5';
const ORION_TEAL = '#1D9E75';
const ORION_DARK = '#2C2C2A';
const ORION_SURFACE = '#F7F8FA';

const LAT_MIN = -11;
const LAT_MAX = 6;
const LNG_MIN = 95;
const LNG_MAX = 141;

const toneClass: Record<'positive' | 'negative' | 'neutral', string> = {
    positive: 'text-orionTeal',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
};

const slug = (value: string): string => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getBarTag = (industry: IndustryKey, label: string, index: number): string => {
    if (industry === 'shipping') return `vessel-${index + 1}`;
    if (industry === 'finance') return label.toLowerCase() === 'sme' ? 'sme-bar' : `${slug(label)}-bar`;
    return `${slug(label)}-bar`;
};

const getMapTag = (industry: IndustryKey, point: MapPoint): string => {
    if (industry === 'shipping' && point.name === 'Tanjung Priok') return 'port-tanjung-priok';
    if (industry === 'finance' && point.name === 'Surabaya') return 'surabaya-branch';
    if (industry === 'fmcg' && point.name === 'Surabaya DC') return 'surabaya-dc';
    return slug(point.name);
};

const getSecondaryTag = (industry: IndustryKey): string => {
    if (industry === 'shipping') return 'weather-rough';
    if (industry === 'finance') return 'q4-cohort';
    return 'surabaya-dc';
};

const normalizeLng = (lng: number): number => ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 1000;
const normalizeLat = (lat: number): number => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 420;

const Scene4Dashboard: React.FC<SceneComponentProps> = ({ mode }) => {
    const { data } = useIndustry();
    const [showBuilder, setShowBuilder] = useState(true);
    const [showAnnotation, setShowAnnotation] = useState(false);

    // Fallback used only if config key is missing.
    const dashboardAnnotation =
        typeof config.copy.dashboardAnnotation === 'string' && config.copy.dashboardAnnotation.trim().length > 0
            ? config.copy.dashboardAnnotation
            : 'From manual reporting to this dashboard in seconds.';

    useEffect(() => {
        setShowBuilder(true);
        setShowAnnotation(false);

        const buildTimer = window.setTimeout(() => setShowBuilder(false), 1500);
        const annotationTimer = window.setTimeout(() => setShowAnnotation(true), 12000);

        return () => {
            window.clearTimeout(buildTimer);
            window.clearTimeout(annotationTimer);
        };
    }, [data.key]);

    const interactive = mode === 'explore';

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
            maxBarThickness: 52,
            stack: undefined,
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
                        size: 18,
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
                stacked: false,
                ticks: {
                    color: ORION_DARK,
                    font: { size: 18, weight: 600 },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: false,
                beginAtZero: true,
                ticks: {
                    color: ORION_DARK,
                    font: { size: 18, weight: 500 },
                },
                grid: {
                    color: 'rgba(44,44,42,0.09)',
                },
            },
        },
    }), [interactive]);

    const secondaryData = useMemo<ChartData<'bar'>>(() => ({
        labels: data.secondaryChart.xLabels,
        datasets: data.secondaryChart.series.map((series, seriesIndex) => ({
            label: series.label,
            data: series.data,
            backgroundColor: series.data.map((_, pointIndex) => {
                if (series.highlight?.includes(pointIndex)) return ORION_TEAL;
                if (seriesIndex === 0) return 'rgba(24,95,165,0.85)';
                if (seriesIndex === 1) return 'rgba(24,95,165,0.55)';
                return 'rgba(24,95,165,0.35)';
            }),
            borderRadius: 7,
            borderSkipped: false,
            maxBarThickness: 44,
            stack: 'stack-1',
        })),
    }), [data.secondaryChart]);

    const secondaryOptions = useMemo<ChartOptions<'bar'>>(() => ({
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
                        size: 18,
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
                stacked: true,
                ticks: {
                    color: ORION_DARK,
                    font: { size: 18, weight: 600 },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    color: ORION_DARK,
                    font: { size: 18, weight: 500 },
                },
                grid: {
                    color: 'rgba(44,44,42,0.09)',
                },
            },
        },
    }), [interactive]);

    const mappedPoints = useMemo(
        () => data.mapPoints.map((point) => ({
            ...point,
            x: normalizeLng(point.lng),
            y: normalizeLat(point.lat),
            tag: getMapTag(data.key, point),
        })),
        [data.key, data.mapPoints],
    );

    return (
        <SceneFrame label="Dashboard Generation">
            <div className="relative flex-1 bg-gradient-to-br from-orionSurface via-white to-orionSurface p-8 md:p-10 overflow-hidden">
                <AnimatePresence>
                    {showBuilder && (
                        <motion.div
                            key="builder"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55, ease: 'easeInOut' }}
                            className="absolute inset-0 z-30 flex items-center justify-center bg-white/92"
                        >
                            <div className="text-[34px] font-bold text-orionDark tracking-tight">Building your dashboard…</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={false}
                    animate={{ opacity: showBuilder ? 0 : 1 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className={`mx-auto h-full max-w-[1500px] flex flex-col gap-6 ${showBuilder ? 'pointer-events-none' : ''}`}
                >
                    <motion.header
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.45 }}
                        className="flex items-end justify-between gap-4"
                    >
                        <div>
                            <h2 className="text-[34px] font-bold text-orionDark">AI-Generated Operations Dashboard</h2>
                            <p className="text-[18px] text-orionDark/70 mt-1">{data.context}</p>
                        </div>
                        <div className="rounded-full bg-orionBlue/10 px-5 py-2 text-[18px] font-semibold text-orionBlue">{data.displayName}</div>
                    </motion.header>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.45 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
                    >
                        {data.kpis.map((kpi, index) => (
                            <motion.article
                                key={kpi.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + index * 0.12, duration: 0.4 }}
                                className="bg-white rounded-2xl shadow-booth-card p-5"
                            >
                                <div className="text-[18px] text-orionDark/70">{kpi.label}</div>
                                <div className="mt-2 text-[32px] font-bold text-orionDark leading-tight">{kpi.value}</div>
                                <div className={`mt-2 text-[18px] font-semibold ${toneClass[kpi.tone]}`}>{kpi.delta}</div>
                            </motion.article>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-12 gap-5 min-h-0 flex-1">
                        <motion.section
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className={`col-span-12 xl:col-span-7 bg-white rounded-2xl shadow-booth-card p-5 flex flex-col ${interactive ? '' : 'pointer-events-none'}`}
                        >
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="text-[28px] font-semibold text-orionDark">{data.primaryChart.title}</h3>
                                {data.primaryChart.unit && (
                                    <span className="text-[18px] text-orionDark/60">Unit: {data.primaryChart.unit}</span>
                                )}
                            </div>
                            <div className="h-[250px] md:h-[270px]">
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
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.15, duration: 0.5 }}
                            className={`col-span-12 xl:col-span-5 bg-white rounded-2xl shadow-booth-card p-5 flex flex-col ${interactive ? '' : 'pointer-events-none'}`}
                        >
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <h3 className="text-[28px] font-semibold text-orionDark">{data.secondaryChart.title}</h3>
                                <span data-tag={getSecondaryTag(data.key)} className="rounded-full bg-orionTeal/10 px-3 py-1 text-[18px] text-orionTeal font-semibold">
                                    Focus Signal
                                </span>
                            </div>
                            <div className="h-[250px] md:h-[270px]">
                                <Bar data={secondaryData} options={secondaryOptions} />
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.35, duration: 0.5 }}
                            className="col-span-12 xl:col-span-5 bg-white rounded-2xl shadow-booth-card p-5 flex flex-col"
                        >
                            <h3 className="text-[28px] font-semibold text-orionDark mb-4">{data.mapTitle}</h3>
                            <div className="relative flex-1 min-h-[240px] rounded-2xl" style={{ background: ORION_SURFACE }}>
                                <svg viewBox="0 0 1000 420" className="w-full h-full">
                                    <path
                                        d="M86 234 L174 205 L272 216 L351 207 L431 219 L510 213 L610 226 L708 218 L804 232 L921 236 L952 259 L900 278 L788 287 L691 280 L596 291 L489 285 L390 295 L286 287 L178 292 L112 272 Z"
                                        fill="rgba(24,95,165,0.12)"
                                        stroke="rgba(24,95,165,0.35)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M420 320 L500 314 L578 322 L641 332 L570 346 L486 342 Z"
                                        fill="rgba(24,95,165,0.12)"
                                        stroke="rgba(24,95,165,0.35)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M744 330 L810 327 L890 342 L846 360 L770 352 Z"
                                        fill="rgba(24,95,165,0.12)"
                                        stroke="rgba(24,95,165,0.35)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M284 153 L352 146 L402 162 L329 174 Z"
                                        fill="rgba(24,95,165,0.12)"
                                        stroke="rgba(24,95,165,0.35)"
                                        strokeWidth="2"
                                    />

                                    {mappedPoints.map((point) => {
                                        const radius = 6 + (point.weight ?? 0.5) * 5;
                                        return (
                                            <g key={point.name} data-tag={point.tag}>
                                                <circle
                                                    cx={point.x}
                                                    cy={point.y}
                                                    r={radius}
                                                    fill={point.highlight ? ORION_TEAL : ORION_BLUE}
                                                    opacity={point.highlight ? 0.95 : 0.8}
                                                />
                                                <text
                                                    x={point.x + 10}
                                                    y={point.y - 10}
                                                    fill={ORION_DARK}
                                                    fontSize="18"
                                                    fontWeight="600"
                                                >
                                                    {point.name}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.55, duration: 0.5 }}
                            className="col-span-12 xl:col-span-7 bg-white rounded-2xl shadow-booth-card p-5 overflow-hidden"
                        >
                            <h3 className="text-[28px] font-semibold text-orionDark mb-4">Recent Operational Logs</h3>
                            <div className="overflow-hidden rounded-xl border border-orionDark/10">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-orionBlue/8">
                                            {data.table.columns.map((column) => (
                                                <th
                                                    key={column}
                                                    className="text-left px-4 py-3 text-[18px] font-semibold text-orionDark border-b border-orionDark/10"
                                                >
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.table.rows.map((row, rowIndex) => (
                                            <motion.tr
                                                key={`${String(row[0])}-${rowIndex}`}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.9 + rowIndex * 0.12, duration: 0.35 }}
                                                className="odd:bg-white even:bg-orionSurface"
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={`${rowIndex}-${cellIndex}`}
                                                        className="px-4 py-3 text-[18px] text-orionDark border-b border-orionDark/8"
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.section>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showAnnotation && !showBuilder && (
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.45 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                        >
                            <div className="rounded-full border border-orionBlue/20 bg-white/95 shadow-booth-card px-6 py-3 text-[20px] font-semibold text-orionDark">
                                {dashboardAnnotation}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneFrame>
    );
};

export default Scene4Dashboard;
