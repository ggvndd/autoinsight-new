import React, { useState, useEffect } from 'react';
import { mockMetadata } from '../../../mocks/bappenasData';
import { CheckCircle2, AlertTriangle, Search, Save, FileText } from 'lucide-react';

const MetadataPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [metadata, setMetadata] = useState(mockMetadata);

    useEffect(() => {
        // Simulate network/extraction delay
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleSave = () => {
        alert("Metadata corrected and saved to Central Database.");
    };

    if (isLoading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-16 h-16 border-4 border-orionBlue/20 border-t-orionBlue rounded-full animate-spin mb-4"></div>
                <p className="animate-pulse">Extracting entities via AI Engine...</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col p-6">
            <header className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">Metadata Review & Harmonization</h1>
                    <p className="text-slate-400 mt-1">Review AI-extracted metadata from Satu Data Indonesia before finalizing.</p>
                </div>
                <button onClick={handleSave} className="bg-orionBlue hover:bg-orionBlueDeep text-white px-6 py-2 rounded-xl font-medium shadow-[0_0_20px_rgba(0,48,255,0.3)] transition-all flex items-center gap-2">
                    <Save size={18} /> Approve & Save
                </button>
            </header>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left Pane: Document Viewer (Mocked) */}
                <div className="w-1/2 glass-panel rounded-2xl flex flex-col overflow-hidden border-slate-700 relative group">
                    <div className="bg-slate-900/80 border-b border-white/5 p-3 flex justify-between items-center backdrop-blur-md z-10">
                        <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <FileText size={16} className="text-orionBlue" /> Source Document Viewer
                        </span>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-white/10 rounded"><Search size={16} className="text-slate-400"/></button>
                        </div>
                    </div>
                    {/* Simulated Document content */}
                    <div className="flex-1 bg-white/5 p-8 overflow-y-auto no-scrollbar relative">
                        {/* Fake Skeleton Text to simulate PDF/Report */}
                        <div className="space-y-4 opacity-30 pointer-events-none">
                            <div className="h-8 bg-slate-400 rounded w-3/4 mb-8"></div>
                            <div className="h-4 bg-slate-400 rounded w-full"></div>
                            <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-400 rounded w-full"></div>
                            <div className="h-4 bg-slate-400 rounded w-4/6"></div>
                            
                            <div className="mt-12 h-40 bg-slate-400 rounded w-full border border-dashed border-slate-500"></div>
                            
                            <div className="h-4 bg-slate-400 rounded w-full mt-8"></div>
                            <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                        </div>

                        {/* Extracted Highlight Bounding Boxes */}
                        <div className="absolute top-[80px] left-[30px] border-2 border-emerald-500/50 bg-emerald-500/10 w-[60%] h-[30px] rounded animate-pulse cursor-pointer hover:bg-emerald-500/30 transition-all flex items-center justify-end pr-2">
                            <span className="text-[10px] bg-emerald-500 text-white px-1 rounded">Nama Data</span>
                        </div>
                        <div className="absolute top-[280px] left-[30px] border-2 border-orionYellow/50 bg-orionYellow/10 w-[40%] h-[20px] rounded cursor-pointer hover:bg-orionYellow/30 transition-all flex items-center justify-end pr-2">
                            <span className="text-[10px] bg-orionYellow text-slate-900 font-bold px-1 rounded">Instansi</span>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Extracted Metadata Form */}
                <div className="w-1/2 glass-panel rounded-2xl flex flex-col overflow-hidden border-slate-700">
                    <div className="bg-slate-900/80 border-b border-white/5 p-3 flex justify-between items-center backdrop-blur-md">
                        <span className="text-sm font-medium text-slate-300">Extracted Metadata</span>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">98% Auto-Harmonized</span>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                        
                        <FieldRow label="Nama Data" value={metadata.namaData} confidence="high" />
                        <FieldRow label="Nama Instansi" value={metadata.namaInstansi} confidence="medium" warning="Harmonized from 'BPN'" />
                        <FieldRow label="Kode Instansi" value={metadata.kodeInstansi} confidence="high" />
                        
                        <div className="border-t border-white/5 my-4"></div>
                        
                        <FieldRow label="Nama DDP" value={metadata.namaDdp} confidence="high" />
                        <FieldRow label="Tahun Tersedia" value={metadata.tahunTersedia} confidence="high" />
                        
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                Definisi
                                <ConfidenceBadge level="high" />
                            </label>
                            <textarea 
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:border-orionBlue focus:ring-1 focus:ring-orionBlue transition-all outline-none"
                                rows={3}
                                defaultValue={metadata.definisi}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FieldRow label="Ukuran" value={metadata.ukuran} confidence="high" />
                            <FieldRow label="Satuan" value={metadata.satuan} confidence="high" />
                        </div>
                        <FieldRow label="Klasifikasi Penyajian" value={metadata.klasifikasiPenyajian} confidence="high" />
                        
                        <div className="border-t border-white/5 my-4"></div>
                        
                        <div className="p-4 bg-orionBlue/5 border border-orionBlue/20 rounded-xl">
                            <p className="text-xs text-slate-400 mb-2">Original Source Reference:</p>
                            <a href={metadata.source} target="_blank" className="text-sm text-orionBlue hover:underline break-all">
                                {metadata.source}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FieldRow = ({ label, value, confidence, warning }: any) => {
    return (
        <div className="space-y-1 group">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                {label}
                <div className="flex items-center gap-2">
                    {warning && <span className="text-[10px] text-orionYellow bg-orionYellow/10 px-1.5 py-0.5 rounded border border-orionYellow/20">{warning}</span>}
                    <ConfidenceBadge level={confidence} />
                </div>
            </label>
            <input 
                type="text" 
                defaultValue={value}
                className={`w-full bg-slate-900/50 border ${warning ? 'border-orionYellow/50 focus:border-orionYellow' : 'border-slate-700 focus:border-orionBlue'} rounded-xl p-2.5 text-sm text-slate-200 focus:ring-1 ${warning ? 'focus:ring-orionYellow' : 'focus:ring-orionBlue'} transition-all outline-none`}
            />
        </div>
    );
};

const ConfidenceBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
    if (level === 'high') {
        return <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400"><CheckCircle2 size={12} /> 99%</span>;
    }
    if (level === 'medium') {
        return <span className="flex items-center gap-1 text-[10px] font-medium text-orionYellow"><AlertTriangle size={12} /> 75%</span>;
    }
    return <span className="flex items-center gap-1 text-[10px] font-medium text-red-400"><AlertTriangle size={12} /> 40%</span>;
};

export default MetadataPage;
