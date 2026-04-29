import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface BappenasNavBarProps {
    sceneCount: number;
    currentIndex: number;
    onJump: (i: number) => void;
    onResume: () => void;
    sceneNames: string[];
}

const BappenasNavBar: React.FC<BappenasNavBarProps> = ({
    sceneCount,
    currentIndex,
    onJump,
    onResume,
    sceneNames,
}) => {
    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-3 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Prev Button */}
                <button
                    onClick={() => onJump(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Previous scene"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Scene Steps */}
                {Array.from({ length: sceneCount }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onJump(i)}
                        className={`h-10 px-4 rounded-full text-sm font-semibold transition-all ${
                            currentIndex === i
                                ? 'bg-orionBlue text-white shadow-lg shadow-orionBlue/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-orionBlue/10'
                        }`}
                        aria-label={`Jump to scene ${i + 1}: ${sceneNames[i]}`}
                    >
                        {i + 1}. {sceneNames[i]}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => onJump(Math.min(sceneCount - 1, currentIndex + 1))}
                    disabled={currentIndex === sceneCount - 1}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition mr-2"
                    aria-label="Next scene"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Resume Loop */}
                <button
                    onClick={onResume}
                    className="h-10 px-5 rounded-full bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition"
                >
                    <Play size={16} />
                    Resume Loop
                </button>
            </div>
            <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">
                Satu Data Policy Intelligence Showcase
            </div>
        </motion.div>
    );
};

export default BappenasNavBar;
