import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, SearchX, AlertCircle } from 'lucide-react';

interface SceneProps {
    mode: 'explore' | 'loop';
}

const Scene1Problem: React.FC<SceneProps> = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col items-center justify-center relative bg-slate-50"
        >
            {/* Floating background elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[25%] p-4 bg-white shadow-xl rounded-2xl border border-slate-100 text-slate-400 rotate-[-12deg]"
            >
                <FileText size={48} />
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[25%] right-[20%] p-4 bg-white shadow-xl rounded-2xl border border-slate-100 text-orionBlue rotate-[8deg]"
            >
                <Database size={48} />
            </motion.div>
            
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[30%] right-[30%] p-4 bg-white shadow-xl rounded-2xl border border-slate-100 text-orionYellow rotate-[15deg]"
            >
                <SearchX size={40} />
            </motion.div>

            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[35%] left-[30%] p-3 bg-white shadow-xl rounded-2xl border border-slate-100 text-red-400 rotate-[-20deg]"
            >
                <AlertCircle size={32} />
            </motion.div>

            <div className="z-10 flex flex-col items-center text-center max-w-3xl px-6">
                <span className="text-orionBlue font-bold tracking-widest uppercase text-sm mb-6 bg-orionBlue/10 px-4 py-2 rounded-full border border-orionBlue/20">
                    Bappenas Use Case
                </span>
                <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    Policy intelligence is scattered. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orionBlue to-orionTeal">
                        We connect the dots.
                    </span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                    Millions of RPJMN, Renstra, and Satu Data Indonesia records are trapped in PDFs, Excel sheets, and disconnected silos. AutoInsight unifies them into actionable causal intelligence.
                </p>
            </div>
        </motion.div>
    );
};

export default Scene1Problem;
