import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileText, FileSpreadsheet, Image as ImageIcon, FileType2,
    Check, Database, Globe, Table, Mail, MousePointer2,
} from 'lucide-react';
import SceneFrame from '../components/SceneFrame';
import config from '../data/config.json';
import type { SceneComponentProps } from '../types';

const ICON_FOR: Record<string, typeof FileText> = {
    pdf: FileText,
    excel: FileSpreadsheet,
    image: ImageIcon,
    word: FileType2,
};

const SOURCE_ICONS: Record<string, typeof Database> = {
    'Database': Database,
    'Airtable': Table,
    'URL import': Globe,
    'Email ingestion': Mail,
};

interface DroppedFile {
    name: string;
    type: string;
    progress: number;
    done: boolean;
}

const Scene2Upload: React.FC<SceneComponentProps> = ({ mode }) => {
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 15, y: 15 });
    const [active, setActive] = useState<number>(-1);
    const [dropped, setDropped] = useState<DroppedFile[]>([]);
    const [selectedPreview, setSelectedPreview] = useState<number | null>(null);

    const files = config.uploadFiles;

    useEffect(() => {
        if (mode !== 'loop') return;
        let cancelled = false;
        const run = async () => {
            for (let i = 0; i < files.length; i++) {
                if (cancelled) return;
                setActive(i);
                // move cursor to source icon
                setCursorPos({ x: 12 + i * 2, y: 68 + (i % 2) * 4 });
                await wait(400);
                // drag toward drop zone
                setCursorPos({ x: 50, y: 45 });
                await wait(600);
                setDropped((d) => [...d, { name: files[i].name, type: files[i].type, progress: 0, done: false }]);
                // progress animation
                for (let p = 10; p <= 100; p += 10) {
                    if (cancelled) return;
                    await wait(120);
                    setDropped((d) => d.map((f, idx) => idx === i ? { ...f, progress: p } : f));
                }
                setDropped((d) => d.map((f, idx) => idx === i ? { ...f, done: true } : f));
                await wait(400);
            }
            setActive(-1);
        };
        run();
        return () => { cancelled = true; };
    }, [mode, files]);

    return (
        <SceneFrame label="Upload Any File">
            <div className="relative flex-1 flex items-center justify-center p-10 bg-orionSurface">
                <div className="grid grid-cols-[1fr_320px] gap-8 w-full max-w-[1400px]">
                    {/* Main drop zone */}
                    <div className="flex flex-col items-center">
                        <div className="mb-6 text-center">
                            <h2 className="text-booth-h2 font-display font-bold text-orionDark">Drop any file — or any data source.</h2>
                            <p className="text-[18px] text-orionDark/60 mt-2">AutoInsight handles PDFs, spreadsheets, scans, documents, and live sources.</p>
                        </div>

                        <motion.div
                            className="w-full aspect-[16/8] rounded-3xl border-[3px] border-dashed border-orionBlue/40 bg-white flex flex-col items-center justify-center gap-4 relative overflow-hidden"
                            animate={active >= 0 ? { borderColor: 'rgba(29, 158, 117, 0.7)' } : {}}
                        >
                            <Upload size={56} strokeWidth={1.5} className="text-orionBlue/60" />
                            <div className="text-[22px] font-semibold text-orionDark/70">Drop files here</div>

                            {/* dropped file stack */}
                            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                                <AnimatePresence>
                                    {dropped.map((f, i) => {
                                        const Icon = ICON_FOR[f.type] ?? FileText;
                                        return (
                                            <motion.button
                                                key={f.name}
                                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                onClick={(e) => { e.stopPropagation(); if (mode === 'explore') setSelectedPreview(i); }}
                                                className="flex items-center gap-3 bg-orionSurface rounded-xl px-4 py-3 shadow-booth-soft min-w-[240px] hover:ring-2 hover:ring-orionBlue/40 transition"
                                            >
                                                <Icon size={28} className="text-orionBlue" />
                                                <div className="flex-1 text-left">
                                                    <div className="text-[14px] font-semibold text-orionDark truncate max-w-[180px]">{f.name}</div>
                                                    <div className="h-1.5 bg-orionDark/10 rounded-full mt-1 overflow-hidden">
                                                        <motion.div
                                                            className={`h-full rounded-full ${f.done ? 'bg-orionTeal' : 'bg-orionBlue'}`}
                                                            style={{ width: `${f.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                {f.done && (
                                                    <div className="w-7 h-7 rounded-full bg-orionTeal flex items-center justify-center">
                                                        <Check size={16} className="text-white" strokeWidth={3} />
                                                    </div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>

                    {/* Side panel — other sources */}
                    <div className="bg-white rounded-2xl shadow-booth-soft p-6 self-start">
                        <div className="text-[13px] uppercase tracking-wider text-orionDark/50 font-semibold mb-4">Or connect a source</div>
                        <div className="space-y-3">
                            {config.dataSources.map((src) => {
                                const Icon = SOURCE_ICONS[src] ?? Database;
                                return (
                                    <div key={src} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orionSurface">
                                        <Icon size={22} className="text-orionBlue" />
                                        <span className="text-[16px] font-semibold text-orionDark">{src}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* animated cursor */}
                {mode === 'loop' && (
                    <motion.div
                        className="absolute z-30 pointer-events-none"
                        animate={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <MousePointer2 size={32} className="text-orionDark fill-white" strokeWidth={1.5} />
                    </motion.div>
                )}

                {/* Explore preview modal */}
                <AnimatePresence>
                    {selectedPreview !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => { e.stopPropagation(); setSelectedPreview(null); }}
                            className="absolute inset-0 bg-orionDark/40 backdrop-blur-sm flex items-center justify-center z-40"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white rounded-2xl p-8 max-w-[520px] shadow-booth-card"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-[13px] uppercase tracking-wider text-orionBlue font-semibold mb-2">File preview</div>
                                <div className="text-[22px] font-bold text-orionDark mb-4">{dropped[selectedPreview]?.name}</div>
                                <div className="bg-orionSurface rounded-xl p-6 h-[200px] flex items-center justify-center text-orionDark/50">
                                    Preview of extracted content
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneFrame>
    );
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default Scene2Upload;
