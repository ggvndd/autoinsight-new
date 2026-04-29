import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Sparkles, LayoutGrid, GitBranch } from 'lucide-react';

interface SceneProps {
    mode: 'explore' | 'loop';
}

const Scene3Pipeline: React.FC<SceneProps> = () => {
    const stages = [
        {
            id: 1,
            title: "OCR & Extraction",
            icon: <Scan size={32} className="text-emerald-500" />,
            status: "4 files → 127 rows extracted"
        },
        {
            id: 2,
            title: "Data Sanitation",
            icon: <Sparkles size={32} className="text-emerald-500" />,
            status: "0 errors, 3 warnings handled"
        },
        {
            id: 3,
            title: "Structuring",
            icon: <LayoutGrid size={32} className="text-emerald-500" />,
            status: "Vendor, Date, Amount, Tax ID"
        },
        {
            id: 4,
            title: "Processing Pipeline",
            icon: <GitBranch size={32} className="text-emerald-500" />,
            status: "User-configured transforms applied"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full p-12 max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-16 pb-32"
        >
            <div className="text-center">
                <span className="text-orionBlue font-bold tracking-widest uppercase text-xs mb-4 flex items-center justify-center gap-2">
                    <Sparkles size={14} /> TRANSPARENT PIPELINE
                </span>
                <h1 className="text-5xl font-display font-bold text-slate-900 tracking-tight">Every step, visible.</h1>
            </div>

            <div className="relative w-full flex items-start justify-between px-8 mt-10">
                {/* Connecting Line */}
                <div className="absolute top-[70px] left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-orionBlue w-1/2 animate-pipeline-flow opacity-50"></div>
                </div>

                {stages.map((stage, i) => (
                    <motion.div 
                        key={stage.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.3, duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-[180px] h-[140px] bg-white rounded-3xl shadow-xl shadow-emerald-500/10 border-2 border-emerald-500/20 flex flex-col items-center justify-center gap-3 relative bg-clip-padding">
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                {stage.icon}
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Stage {stage.id}</p>
                                <h3 className="text-sm font-bold text-slate-800">{stage.title}</h3>
                            </div>
                        </div>
                        <div className="mt-6 w-[180px] text-center">
                            <span className="text-xs font-bold text-orionBlue bg-orionBlue/5 px-3 py-1.5 rounded-lg border border-orionBlue/10 inline-block">
                                {stage.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-medium text-lg flex items-center gap-3 shadow-xl"
            >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Every step is visible. No black box.
            </motion.div>
        </motion.div>
    );
};

export default Scene3Pipeline;
