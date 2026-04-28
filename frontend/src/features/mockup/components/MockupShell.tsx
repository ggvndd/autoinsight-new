import React, { Suspense, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import config from '../data/config.json';
import { useSceneLoop } from '../hooks/useSceneLoop';
import { useInactivityTimeout } from '../hooks/useInactivityTimeout';
import Watermark from './Watermark';
import ExploreNavBar from './ExploreNavBar';
import type { SceneMode } from '../types';

const Scene1Problem = React.lazy(() => import('../scenes/Scene1Problem'));
const Scene2Upload = React.lazy(() => import('../scenes/Scene2Upload'));
const Scene3Pipeline = React.lazy(() => import('../scenes/Scene3Pipeline'));
const Scene4Dashboard = React.lazy(() => import('../scenes/Scene4Dashboard'));
const Scene5Chat = React.lazy(() => import('../scenes/Scene5Chat'));
const Scene6Recommendations = React.lazy(() => import('../scenes/Scene6Recommendations'));
const Scene7Closing = React.lazy(() => import('../scenes/Scene7Closing'));

const SCENE_COMPONENTS = [
    Scene1Problem,
    Scene2Upload,
    Scene3Pipeline,
    Scene4Dashboard,
    Scene5Chat,
    Scene6Recommendations,
    Scene7Closing,
];

const SceneFallback: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-orionSurface">
        <div className="w-10 h-10 rounded-full border-4 border-orionBlue border-t-transparent animate-spin" />
    </div>
);

const MockupShell: React.FC = () => {
    const durations = useMemo(() => config.scenes.map((s) => s.duration), []);
    const sceneNames = useMemo(() => config.scenes.map((s) => s.name), []);
    const { index, isPaused, pause, resume, jumpTo } = useSceneLoop({ durations });

    const resetInactivity = useInactivityTimeout(
        isPaused,
        config.explore.inactivityTimeoutMs,
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

    const mode: SceneMode = isPaused ? 'explore' : 'loop';
    const CurrentScene = SCENE_COMPONENTS[index];

    return (
        <div
            onClick={handleShellClick}
            className="fixed inset-0 overflow-hidden bg-orionSurface text-orionDark cursor-pointer select-none"
            role="application"
            aria-label="AutoInsight Interactive Mockup"
        >
            <Watermark label={config.watermark} />

            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <Suspense key={index} fallback={<SceneFallback />}>
                        <CurrentScene mode={mode} />
                    </Suspense>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isPaused && (
                    <ExploreNavBar
                        key="nav"
                        sceneCount={config.scenes.length}
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

export default MockupShell;
