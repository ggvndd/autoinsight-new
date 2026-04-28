import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useIndustry } from '../hooks/useIndustry';
import type { IndustryKey } from '../types';

interface ExploreNavBarProps {
    sceneCount: number;
    currentIndex: number;
    onJump: (i: number) => void;
    onResume: () => void;
    sceneNames: string[];
}

const ExploreNavBar: React.FC<ExploreNavBarProps> = ({
    sceneCount,
    currentIndex,
    onJump,
    onResume,
    sceneNames,
}) => {
    const { industry, setIndustry, options } = useIndustry();

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-3 bg-white/95 backdrop-blur-md border-t border-orionDark/10 px-6 py-4 shadow-booth-soft"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {Array.from({ length: sceneCount }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onJump(i)}
                        className={`h-10 min-w-[44px] px-3 rounded-full text-[14px] font-semibold transition-all ${
                            currentIndex === i
                                ? 'bg-orionBlue text-white shadow-booth-card'
                                : 'bg-orionSurface text-orionDark hover:bg-orionBlue/10'
                        }`}
                        aria-label={`Jump to scene ${i + 1}: ${sceneNames[i]}`}
                    >
                        {i + 1}. {sceneNames[i]}
                    </button>
                ))}
                <button
                    onClick={onResume}
                    className="h-10 px-4 rounded-full bg-orionTeal text-white text-[14px] font-semibold flex items-center gap-2 shadow-booth-card hover:bg-orionTeal/90 transition"
                >
                    <Play size={16} />
                    Resume Loop
                </button>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[12px] uppercase tracking-wider text-orionDark/60 font-semibold">
                    Industry
                </span>
                {options.map((opt) => (
                    <button
                        key={opt.key}
                        onClick={() => setIndustry(opt.key as IndustryKey)}
                        className={`h-8 px-3 rounded-full text-[13px] font-semibold border transition ${
                            industry === opt.key
                                ? 'bg-orionBlue text-white border-orionBlue'
                                : 'bg-white text-orionDark border-orionDark/15 hover:border-orionBlue'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default ExploreNavBar;
