import { useRef } from "react";

export function useAntiSpam(delay = 500) {
    const isLocked = useRef(false);

    const runWithLock = (callback: Function) => {
        if (isLocked.current) return; 

        isLocked.current = true;
        callback(); 

        setTimeout(() => {
            isLocked.current = false;
        }, delay);
    };

    return { runWithLock };
}