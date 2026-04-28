import { useCallback, useEffect, useRef, useState } from 'react';

export interface SceneLoopConfig {
    durations: number[];
}

export interface SceneLoopApi {
    index: number;
    isPaused: boolean;
    pause: () => void;
    resume: (fromIndex?: number) => void;
    jumpTo: (i: number) => void;
    next: () => void;
}

export const useSceneLoop = ({ durations }: SceneLoopConfig): SceneLoopApi => {
    const [index, setIndex] = useState(0);
    const [isPaused, setPaused] = useState(false);
    const timerRef = useRef<number | null>(null);
    const indexRef = useRef(0);
    indexRef.current = index;

    const clearTimer = () => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const scheduleAdvance = useCallback(() => {
        clearTimer();
        const duration = durations[indexRef.current] ?? 10000;
        timerRef.current = window.setTimeout(() => {
            setIndex((i) => (i + 1) % durations.length);
        }, duration);
    }, [durations]);

    useEffect(() => {
        if (isPaused) {
            clearTimer();
            return;
        }
        scheduleAdvance();
        return clearTimer;
    }, [index, isPaused, scheduleAdvance]);

    const pause = useCallback(() => setPaused(true), []);
    const resume = useCallback((fromIndex?: number) => {
        if (typeof fromIndex === 'number') setIndex(fromIndex);
        setPaused(false);
    }, []);
    const jumpTo = useCallback((i: number) => {
        setIndex(Math.max(0, Math.min(durations.length - 1, i)));
    }, [durations.length]);
    const next = useCallback(() => {
        setIndex((i) => (i + 1) % durations.length);
    }, [durations.length]);

    return { index, isPaused, pause, resume, jumpTo, next };
};
