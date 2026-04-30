import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockMetadata } from '../../../mocks/bappenasData';
import { CheckCircle2, AlertTriangle, Search, Save, FileText } from 'lucide-react';
import mockupImg from '../../../img/metadata_mockup.png';

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

const OcrHighlight = ({ top, left, width, height, label, color, delay }: any) => {
    const colorClasses: Record<string, string> = {
        emerald: 'border-emerald-500 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500',
        amber: 'border-amber-500 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500',
        orionBlue: 'border-orionBlue bg-orionBlue/20 hover:bg-orionBlue/30 text-orionBlue',
        purple: 'border-purple-500 bg-purple-500/20 hover:bg-purple-500/30 text-purple-500',
        pink: 'border-pink-500 bg-pink-500/20 hover:bg-pink-500/30 text-pink-500',
        cyan: 'border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-500',
    };
    const bgClasses: Record<string, string> = {
        emerald: 'bg-emerald-500',
        amber: 'bg-amber-500',
        orionBlue: 'bg-orionBlue',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
        cyan: 'bg-cyan-500',
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className={`absolute border-2 rounded animate-pulse cursor-pointer transition-all shadow-sm ${colorClasses[color] || colorClasses.emerald}`}
            style={{ top, left, width, height }}
        >
            <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow absolute -top-4 right-0 ${bgClasses[color] || bgClasses.emerald}`}>{label}</span>
        </motion.div>
    );
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
                    <div className="flex-1 bg-slate-100 p-8 overflow-y-auto no-scrollbar relative flex justify-center">
                        <div className="relative w-full max-w-[600px] shadow-sm border border-slate-200 rounded overflow-hidden bg-white">
                            <img src={mockupImg} alt="Metadata Document" className="w-full h-auto block" />

                            {/* Extracted Highlight Bounding Boxes */}
                            <OcrHighlight top="31%" left="41%" width="40%" height="3%" color="emerald" label="Nama Data" delay={1.5} />
                            <OcrHighlight top="35%" left="41%" width="5%" height="2%" color="purple" label="Kode" delay={1.7} />
                            <OcrHighlight top="38%" left="41%" width="23%" height="2%" color="amber" label="Instansi" delay={1.9} />
                            <OcrHighlight top="44%" left="41%" width="35%" height="3%" color="cyan" label="Nama DDP" delay={2.1} />
                            <OcrHighlight top="55%" left="41%" width="6%" height="2%" color="pink" label="Tahun" delay={2.3} />
                            <OcrHighlight top="74%" left="41%" width="50%" height="15%" color="orionBlue" label="Definisi" delay={2.5} />
                            <OcrHighlight top="88%" left="41%" width="5%" height="2%" color="emerald" label="Ukuran" delay={2.7} />
                            <OcrHighlight top="99%" left="41%" width="25%" height="2%" color="amber" label="Klasifikasi" delay={3.1} />
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
