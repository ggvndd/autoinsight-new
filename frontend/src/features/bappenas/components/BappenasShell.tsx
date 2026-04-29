import React, { Suspense, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSceneLoop } from '../../mockup/hooks/useSceneLoop';
import { useInactivityTimeout } from '../../mockup/hooks/useInactivityTimeout';
import Watermark from '../../mockup/components/Watermark';
import BappenasNavBar from './BappenasNavBar';

// We will lazy load the new Scenes
const Scene1Problem = React.lazy(() => import('../scenes/Scene1Problem'));
const Scene2Upload = React.lazy(() => import('../scenes/Scene2Upload'));
const Scene3Pipeline = React.lazy(() => import('../scenes/Scene3Pipeline'));
const Scene4Metadata = React.lazy(() => import('../scenes/Scene4Metadata'));
const Scene5Chat = React.lazy(() => import('../scenes/Scene5Chat'));
const Scene6Simulator = React.lazy(() => import('../scenes/Scene6Simulator'));

const SCENE_COMPONENTS = [
    Scene1Problem,
    Scene2Upload,
    Scene3Pipeline,
    Scene4Metadata,
    Scene5Chat,
    Scene6Simulator,
];

// Configuration for Bappenas Showcase
const bappenasConfig = {
    scenes: [
        { name: "The Problem", duration: 8000 },
        { name: "Upload Any File", duration: 10000 },
        { name: "Data Pipeline", duration: 12000 },
        { name: "Metadata Harmonization", duration: 18000 },
        { name: "Knowledge Base", duration: 15000 },
        { name: "Causal Simulator", duration: 18000 }
    ],
    inactivityTimeoutMs: 30000
};

const SceneFallback: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 rounded-full border-4 border-orionBlue border-t-transparent animate-spin" />
    </div>
);

const BappenasShell: React.FC = () => {
    const durations = useMemo(() => bappenasConfig.scenes.map((s) => s.duration), []);
    const sceneNames = useMemo(() => bappenasConfig.scenes.map((s) => s.name), []);
    const { index, isPaused, pause, resume, jumpTo } = useSceneLoop({ durations });

    const resetInactivity = useInactivityTimeout(
        isPaused,
        bappenasConfig.inactivityTimeoutMs,
        () => resume(0),
    );

    const handleShellClick = useCallback(() => {
        if (isPaused) {
            resetInactivity();
        } else {
            pause();
        }
    }, [isPaused, pause, resetInactivity]);

    const handleJump = useCallback(
        (i: number) => {
            jumpTo(i);
            resetInactivity();
        },
        [jumpTo, resetInactivity],
    );

    const handleResume = useCallback(() => {
        resume(0);
    }, [resume]);

    const mode = isPaused ? 'explore' : 'loop';
    const CurrentScene = SCENE_COMPONENTS[index];

    return (
        <div
            onClick={handleShellClick}
            className="fixed inset-0 overflow-hidden bg-slate-50 text-slate-800 cursor-pointer select-none font-sans"
            role="application"
            aria-label="Bappenas Showcase Mockup"
        >
            <Watermark label="Orionex Solutions" />

            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <Suspense key={index} fallback={<SceneFallback />}>
                        <CurrentScene mode={mode} />
                    </Suspense>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isPaused && (
                    <BappenasNavBar
                        key="nav"
                        sceneCount={bappenasConfig.scenes.length}
                        currentIndex={index}
                        onJump={handleJump}
                        onResume={handleResume}
                        sceneNames={sceneNames}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default BappenasShell;
