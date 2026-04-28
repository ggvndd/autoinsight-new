import React from 'react';
import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, ScanLine, StickyNote, Mail, FileImage, Database, File } from 'lucide-react';
import SceneFrame from '../components/SceneFrame';
import config from '../data/config.json';
import type { SceneComponentProps } from '../types';

const ICONS = [FileText, FileSpreadsheet, ScanLine, StickyNote, Mail, FileImage, Database, File];

interface Artifact {
    Icon: typeof FileText;
    from: { x: string; y: string; rotate: number };
    to: { x: string; y: string; rotate: number };
    color: string;
    delay: number;
}

const buildArtifacts = (): Artifact[] => {
    const edges = [
        { x: '-20vw', y: '-10vh' },
        { x: '110vw', y: '-15vh' },
        { x: '-15vw', y: '60vh' },
        { x: '115vw', y: '55vh' },
        { x: '40vw', y: '-20vh' },
        { x: '60vw', y: '110vh' },
        { x: '-10vw', y: '30vh' },
        { x: '120vw', y: '20vh' },
    ];
    const targets = [
        { x: '-18vw', y: '-8vh' }, { x: '15vw', y: '10vh' }, { x: '-5vw', y: '20vh' },
        { x: '20vw', y: '-5vh' }, { x: '5vw', y: '25vh' }, { x: '-10vw', y: '8vh' },
        { x: '18vw', y: '22vh' }, { x: '-8vw', y: '-2vh' },
    ];
    const palette = ['#185FA5', '#1D9E75', '#2C2C2A', '#185FA5', '#1D9E75', '#2C2C2A', '#185FA5', '#1D9E75'];
    return ICONS.map((Icon, i) => ({
        Icon,
        from: { ...edges[i % edges.length], rotate: -30 + (i * 13) % 60 },
        to: { ...targets[i], rotate: -18 + (i * 9) % 36 },
        color: palette[i],
        delay: 0.15 + i * 0.18,
    }));
};

const Scene1Problem: React.FC<SceneComponentProps> = () => {
    const artifacts = React.useMemo(buildArtifacts, []);

    return (
        <SceneFrame label="The Problem">
            <div className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-orionSurface via-white to-orionSurface">
                {artifacts.map(({ Icon, from, to, color, delay }, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: from.x, y: from.y, rotate: from.rotate, opacity: 0, scale: 0.6 }}
                        animate={{ x: to.x, y: to.y, rotate: to.rotate, opacity: 1, scale: 1 }}
                        exit={{ x: '50%', y: '50%', opacity: 0, scale: 0.2 }}
                        transition={{ delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute"
                        style={{ color }}
                    >
                        <div className="w-[84px] h-[104px] rounded-xl bg-white shadow-booth-card flex items-center justify-center border border-orionDark/5">
                            <Icon size={40} strokeWidth={1.6} />
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 1.0 }}
                    className="relative z-10 text-center px-10"
                >
                    <div className="text-[16px] font-semibold tracking-[0.2em] text-orionBlue/80 uppercase mb-4">
                        AutoInsight
                    </div>
                    <h1 className="text-[56px] md:text-[72px] font-display font-extrabold text-orionDark leading-[1.05] max-w-[24ch] mx-auto">
                        {config.copy.problemTagline}
                    </h1>
                </motion.div>
            </div>
        </SceneFrame>
    );
};

export default Scene1Problem;
