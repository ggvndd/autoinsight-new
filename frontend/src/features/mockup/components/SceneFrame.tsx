import React from 'react';
import { motion } from 'framer-motion';

interface SceneFrameProps {
    children: React.ReactNode;
    className?: string;
    label?: string;
}

const SceneFrame: React.FC<SceneFrameProps> = ({ children, className = '', label }) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            aria-label={label}
            className={`absolute inset-0 flex flex-col ${className}`}
        >
            {children}
        </motion.section>
    );
};

export default SceneFrame;
