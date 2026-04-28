import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SceneFrame from '../components/SceneFrame';
import config from '../data/config.json';
import { useIndustry } from '../hooks/useIndustry';
import type { SceneComponentProps } from '../types';

const priorityPillClass: Record<'High' | 'Medium' | 'Low', string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-blue-100 text-blue-700 border-blue-200',
    Low: 'bg-gray-100 text-gray-600 border-gray-200',
};

const Scene6Recommendations: React.FC<SceneComponentProps> = () => {
    const { data } = useIndustry();
    const [showCallout, setShowCallout] = useState(false);

    // Fallback used only if config key is missing.
    const causalCallout =
        typeof config.copy.causalCallout === 'string' && config.copy.causalCallout.trim().length > 0
            ? config.copy.causalCallout
            : 'Not just correlation - causation.';

    const cards = useMemo(() => data.recommendations.slice(0, 3), [data.recommendations]);

    useEffect(() => {
        setShowCallout(false);
        const timer = window.setTimeout(() => setShowCallout(true), 9000);
        return () => window.clearTimeout(timer);
    }, [data.key]);

    return (
        <SceneFrame label="AI Business Recommendations">
            <div className="relative flex-1 bg-gradient-to-br from-orionSurface via-white to-orionSurface p-8 md:p-10 overflow-hidden">
                <div className="mx-auto h-full max-w-[1400px] flex flex-col">
                    <motion.header
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="mb-6"
                    >
                        <h2 className="text-[32px] font-bold text-orionDark">AI Business Recommendations</h2>
                        <p className="text-[18px] text-orionDark/70 mt-2">{data.context}</p>
                    </motion.header>

                    <div className="grid grid-cols-1 gap-5">
                        {cards.map((recommendation, index) => (
                            <motion.article
                                key={`${recommendation.priority}-${recommendation.headline}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.3, duration: 0.45 }}
                                className="bg-white shadow-booth-card rounded-2xl p-6"
                            >
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[18px] font-semibold ${priorityPillClass[recommendation.priority]}`}>
                                        {recommendation.priority} Priority
                                    </span>
                                </div>

                                <h3 className="text-[28px] font-semibold text-orionDark leading-tight">{recommendation.headline}</h3>

                                <div className="mt-4 flex items-center gap-3 text-[18px] font-semibold text-orionTeal">
                                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-orionTeal" />
                                    <span>Estimated impact: {recommendation.impact}</span>
                                </div>

                                <p className="mt-3 text-[16px] text-gray-600 italic">Why this matters: {recommendation.rationale}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {showCallout && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        >
                            <div className="bg-orionTeal/10 border border-orionTeal text-orionTeal text-[18px] px-6 py-3 rounded-full font-semibold shadow-booth-card">
                                {causalCallout}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneFrame>
    );
};

export default Scene6Recommendations;
