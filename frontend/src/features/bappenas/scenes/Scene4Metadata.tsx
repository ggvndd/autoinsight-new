import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockMetadata } from '../../../mocks/bappenasData';
import { CheckCircle2, AlertTriangle, Search, Save, FileText } from 'lucide-react';

interface SceneProps {
    mode: 'explore' | 'loop';
}

function useTypingEffect(text: string, startDelay: number = 0, speed: number = 30) {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        let isMounted = true;
        let timeout: NodeJS.Timeout;
        
        const typeText = async () => {
            if (startDelay > 0) {
                await new Promise(r => setTimeout(r, startDelay));
            }
            if (!isMounted) return;
            
            for (let i = 0; i <= text.length; i++) {
                if (!isMounted) break;
                setDisplayedText(text.slice(0, i));
                await new Promise(r => setTimeout(r, speed + Math.random() * 20));
            }
        };
        
        typeText();
        
        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [text, startDelay, speed]);
    
    return displayedText;
}

const FieldRow = ({ label, value, confidence, warning, index }: any) => {
    // Stagger the typing effect based on index
    const delay = 1500 + (index * 400); // 1.5s initial load delay + stagger
    const typedValue = useTypingEffect(value, delay);

    return (
        <div className="space-y-1.5 group">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                {label}
                <div className="flex items-center gap-2">
                    {warning && <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">{warning}</span>}
                    <ConfidenceBadge level={confidence} />
                </div>
            </label>
            <input 
                type="text" 
                value={typedValue}
                readOnly
                className={`w-full bg-slate-50 border ${warning ? 'border-amber-300 focus:border-amber-500' : 'border-slate-200 focus:border-orionBlue'} rounded-xl p-3.5 text-sm font-medium text-slate-800 focus:ring-1 ${warning ? 'focus:ring-amber-500' : 'focus:ring-orionBlue'} transition-all outline-none`}
            />
        </div>
    );
};

const ConfidenceBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
    if (level === 'high') {
        return <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600"><CheckCircle2 size={14} /> 99%</span>;
    }
    if (level === 'medium') {
        return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600"><AlertTriangle size={14} /> 75%</span>;
    }
    return <span className="flex items-center gap-1 text-[11px] font-bold text-red-600"><AlertTriangle size={14} /> 40%</span>;
};

const Scene4Metadata: React.FC<SceneProps> = () => {
    const [isLoading, setIsLoading] = useState(true);
    const metadata = mockMetadata;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleSave = () => {
        alert("Metadata corrected and saved to Central Database.");
    };

    const typedDefinisi = useTypingEffect(metadata.definisi, 3500, 10);

    if (isLoading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center text-slate-500 bg-slate-50">
                <div className="w-16 h-16 border-4 border-orionBlue/20 border-t-orionBlue rounded-full animate-spin mb-6"></div>
                <p className="animate-pulse font-medium text-lg">Extracting entities via AI Engine...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full p-8 max-w-[1400px] mx-auto flex flex-col gap-6 pb-28"
        >
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Metadata Harmonization</h1>
                    <p className="text-slate-500 mt-1">Review AI-extracted metadata from Satu Data Indonesia before finalizing.</p>
                </div>
                <button onClick={handleSave} className="bg-orionBlue hover:bg-orionBlueDeep text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-orionBlue/30 transition-all flex items-center gap-2">
                    <Save size={18} /> Approve & Save
                </button>
            </header>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left Pane: Document Viewer */}
                <div className="w-1/2 bg-white rounded-3xl flex flex-col overflow-hidden border border-slate-200 shadow-xl relative group">
                    <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center z-10">
                        <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <FileText size={18} className="text-orionBlue" /> Source Document Viewer
                        </span>
                        <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-slate-200 rounded text-slate-500"><Search size={16} /></button>
                        </div>
                    </div>
                    {/* Simulated Document content */}
                    <div className="flex-1 bg-slate-100 p-8 overflow-y-auto no-scrollbar relative">
                        <div className="bg-white shadow-sm p-10 h-[800px] rounded border border-slate-200">
                            {/* Fake Skeleton Text */}
                            <div className="space-y-4 opacity-40 pointer-events-none">
                                <div className="h-10 bg-slate-300 rounded w-3/4 mb-10"></div>
                                <div className="h-4 bg-slate-300 rounded w-full"></div>
                                <div className="h-4 bg-slate-300 rounded w-5/6"></div>
                                <div className="h-4 bg-slate-300 rounded w-full"></div>
                                <div className="h-4 bg-slate-300 rounded w-4/6"></div>
                                
                                <div className="mt-12 h-48 bg-slate-200 rounded w-full border border-dashed border-slate-400"></div>
                                
                                <div className="h-4 bg-slate-300 rounded w-full mt-8"></div>
                                <div className="h-4 bg-slate-300 rounded w-5/6"></div>
                            </div>

                            {/* Extracted Highlight Bounding Boxes */}
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.5}} className="absolute top-[160px] left-[50px] border-2 border-emerald-500 bg-emerald-500/10 w-[50%] h-[40px] rounded animate-pulse cursor-pointer hover:bg-emerald-500/20 transition-all flex items-center justify-end pr-2 shadow-sm">
                                <span className="text-[11px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded shadow">Nama Data</span>
                            </motion.div>
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.9}} className="absolute top-[380px] left-[50px] border-2 border-amber-500 bg-amber-500/10 w-[40%] h-[30px] rounded cursor-pointer hover:bg-amber-500/20 transition-all flex items-center justify-end pr-2 shadow-sm">
                                <span className="text-[11px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded shadow">Instansi</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Extracted Metadata Form */}
                <div className="w-1/2 bg-white rounded-3xl flex flex-col overflow-hidden border border-slate-200 shadow-xl">
                    <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700">Extracted Metadata</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">98% Auto-Harmonized</span>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">
                        <FieldRow index={0} label="Nama Data" value={metadata.namaData} confidence="high" />
                        <FieldRow index={1} label="Nama Instansi" value={metadata.namaInstansi} confidence="medium" warning="Harmonized from 'BPN'" />
                        <FieldRow index={2} label="Kode Instansi" value={metadata.kodeInstansi} confidence="high" />
                        
                        <div className="border-t border-slate-100 my-6"></div>
                        
                        <FieldRow index={3} label="Nama DDP" value={metadata.namaDdp} confidence="high" />
                        <FieldRow index={4} label="Tahun Tersedia" value={metadata.tahunTersedia} confidence="high" />
                        
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                                Definisi
                                <ConfidenceBadge level="high" />
                            </label>
                            <textarea 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 focus:border-orionBlue focus:ring-1 focus:ring-orionBlue transition-all outline-none resize-none font-medium"
                                rows={3}
                                value={typedDefinisi}
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <FieldRow index={5} label="Ukuran" value={metadata.ukuran} confidence="high" />
                            <FieldRow index={6} label="Satuan" value={metadata.satuan} confidence="high" />
                        </div>
                        <FieldRow index={7} label="Klasifikasi Penyajian" value={metadata.klasifikasiPenyajian} confidence="high" />
                        
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Original Source Reference</p>
                            <a href={metadata.source} target="_blank" className="text-sm font-medium text-orionBlue hover:text-orionBlueDeep hover:underline break-all">
                                {metadata.source}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Scene4Metadata;
