import { useEffect, useRef } from 'react';

export const useInactivityTimeout = (
    active: boolean,
    timeoutMs: number,
    onTimeout: () => void,
): (() => void) => {
    const timerRef = useRef<number | null>(null);
    const onTimeoutRef = useRef(onTimeout);
    onTimeoutRef.current = onTimeout;

    const clear = () => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const reset = () => {
        clear();
        if (!active) return;
        timerRef.current = window.setTimeout(() => {
            onTimeoutRef.current();
        }, timeoutMs);
    };

    useEffect(() => {
        if (!active) {
            clear();
            return;
        }
        reset();
        return clear;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, timeoutMs]);

    return reset;
};
