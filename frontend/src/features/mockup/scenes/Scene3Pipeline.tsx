import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Sparkles, LayoutGrid, Workflow, Eye } from 'lucide-react';
import SceneFrame from '../components/SceneFrame';
import config from '../data/config.json';
import type { SceneComponentProps } from '../types';

const STAGE_ICONS = [ScanLine, Sparkles, LayoutGrid, Workflow];

const Scene3Pipeline: React.FC<SceneComponentProps> = ({ mode }) => {
    const [activeStage, setActiveStage] = useState(-1);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [showCallout, setShowCallout] = useState(false);

    useEffect(() => {
        if (mode !== 'loop') {
            setActiveStage(3);
            setShowCallout(true);
            return;
        }
        let cancelled = false;
        const run = async () => {
            for (let i = 0; i < config.pipelineStages.length; i++) {
                if (cancelled) return;
                setActiveStage(i);
                await wait(2600);
            }
            if (!cancelled) setShowCallout(true);
        };
        const calloutTimer = window.setTimeout(() => setShowCallout(true), 9000);
        run();
        return () => { cancelled = true; window.clearTimeout(calloutTimer); };
    }, [mode]);

    return (
        <SceneFrame label="Data Pipeline">
            <div className="relative flex-1 flex flex-col items-center justify-center p-10 bg-gradient-to-br from-orionSurface to-white">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-orionBlue font-semibold mb-3">
                        <Eye size={14} /> Transparent pipeline
                    </div>
                    <h2 className="text-booth-h1 font-display font-bold text-orionDark">Every step, visible.</h2>
                </div>

                <div className="relative w-full max-w-[1400px] grid grid-cols-4 gap-6">
                    {/* connecting line */}
                    <div className="absolute top-[88px] left-[10%] right-[10%] h-[3px] bg-orionBlue/15 rounded-full overflow-hidden z-0">
                        <motion.div
                            className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-orionTeal to-transparent"
                            animate={{ x: ['0%', '400%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>

                    {config.pipelineStages.map((stage, i) => {
                        const Icon = STAGE_ICONS[i];
                        const isActive = activeStage >= i;
                        const isCurrent = activeStage === i;
                        const isExpanded = expanded === i;

                        return (
                            <motion.button
                                key={stage.key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (mode === 'explore') setExpanded(isExpanded ? null : i);
                                }}
                                className="relative flex flex-col items-center text-center z-10"
                            >
                                <motion.div
                                    className={`w-[176px] h-[176px] rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-colors ${
                                        isActive
                                            ? 'bg-white border-orionTeal shadow-booth-card'
                                            : 'bg-white/60 border-orionDark/10'
                                    }`}
                                    animate={isCurrent ? {
                                        boxShadow: [
                                            '0 0 0 0 rgba(29,158,117,0)',
                                            '0 0 48px 4px rgba(29,158,117,0.35)',
                                            '0 0 0 0 rgba(29,158,117,0)',
                                        ],
                                    } : {}}
                                    transition={{ duration: 2.5, repeat: isCurrent ? Infinity : 0 }}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isActive ? 'bg-orionTeal/10 text-orionTeal' : 'bg-orionDark/5 text-orionDark/40'}`}>
                                        <Icon size={28} strokeWidth={1.8} />
                                    </div>
                                    <div className="text-[13px] font-semibold text-orionDark/50">Stage {i + 1}</div>
                                    <div className="text-[18px] font-bold text-orionDark leading-tight px-2">{stage.label}</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -5 }}
                                    className="mt-4 px-4 py-2 rounded-lg bg-orionBlue/5 text-[14px] text-orionBlue font-semibold max-w-[220px]"
                                >
                                    {stage.status}
                                </motion.div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 px-4 py-3 bg-white rounded-xl shadow-booth-soft text-[13px] text-orionDark/80 max-w-[240px] text-left"
                                        >
                                            {stage.detail}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {showCallout && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-12 inline-flex items-center gap-3 px-6 py-4 bg-orionDark text-white rounded-2xl shadow-booth-card"
                        >
                            <div className="w-2 h-2 rounded-full bg-orionTeal animate-soft-pulse" />
                            <span className="text-[20px] font-semibold">{config.copy.pipelineCallout}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneFrame>
    );
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default Scene3Pipeline;
