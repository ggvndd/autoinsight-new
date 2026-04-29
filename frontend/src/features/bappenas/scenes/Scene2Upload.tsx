import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Database, LayoutGrid, Link2, Mail } from 'lucide-react';

interface SceneProps {
    mode: 'explore' | 'loop';
}

const Scene2Upload: React.FC<SceneProps> = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full p-12 max-w-6xl mx-auto flex flex-col items-center gap-12 pb-32 pt-20"
        >
            <div className="text-center">
                <h1 className="text-4xl font-display font-bold text-slate-900 mb-3">Drop any file — or any data source.</h1>
                <p className="text-lg text-slate-500 font-medium">AutoInsight handles PDFs, spreadsheets, scans, documents, and live sources.</p>
            </div>

            <div className="flex w-full gap-10 flex-col md:flex-row h-[450px]">
                {/* Drag and drop area */}
                <div className="flex-1 border-2 border-dashed border-orionBlue/40 rounded-3xl bg-white flex flex-col items-center justify-center text-slate-500 shadow-sm relative overflow-hidden group">
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="p-4 bg-orionBlue/5 rounded-full mb-4 group-hover:bg-orionBlue/10 transition-colors"
                    >
                        <Upload size={40} className="text-orionBlue" />
                    </motion.div>
                    <span className="text-xl font-medium text-slate-600">Drop files here</span>
                </div>

                {/* Data Sources Menu */}
                <div className="w-[320px] bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Or Connect a Source</h3>
                    
                    <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors border border-transparent hover:border-slate-200">
                        <Database className="text-orionBlue w-5 h-5" />
                        Database
                    </button>
                    
                    <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors border border-transparent hover:border-slate-200">
                        <LayoutGrid className="text-orionBlue w-5 h-5" />
                        Airtable
                    </button>
                    
                    <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors border border-transparent hover:border-slate-200">
                        <Link2 className="text-orionBlue w-5 h-5" />
                        URL import
                    </button>
                    
                    <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors border border-transparent hover:border-slate-200">
                        <Mail className="text-orionBlue w-5 h-5" />
                        Email ingestion
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Scene2Upload;
