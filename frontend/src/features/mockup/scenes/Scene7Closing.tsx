import React from 'react';
import { motion } from 'framer-motion';
import SceneFrame from '../components/SceneFrame';
import config from '../data/config.json';
import type { SceneComponentProps } from '../types';

const Scene7Closing: React.FC<SceneComponentProps> = () => (
    <SceneFrame label="Closing">
        <div className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-orionDark via-orionBlueDeep to-orionBlue overflow-hidden">
            {/* decorative orbs */}
            <motion.div
                className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-orionTeal/20 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-orionBlue/30 blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative text-center text-white px-10"
            >
                <div className="inline-flex items-center gap-3 mb-6">
                    <img
                        src="https://storage.orionex.id/orionex-storage/orionex_tiny_white.png"
                        alt="Orionex"
                        className="h-14 w-auto"
                    />
                </div>

                <h1 className="text-[80px] md:text-[96px] font-display font-extrabold leading-[1.02] tracking-tight">
                    {config.brand.productName}
                </h1>
                <div className="mt-6 text-[32px] md:text-[40px] font-display font-semibold text-orionTeal">
                    {config.copy.closingTagline}
                </div>
                <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-[18px] font-semibold">
                    {config.brand.cta}
                </div>
            </motion.div>
        </div>
    </SceneFrame>
);

export default Scene7Closing;
