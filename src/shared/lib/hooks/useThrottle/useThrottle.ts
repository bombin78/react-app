import { useCallback, useRef } from 'react';

export function useThrottle(
    callback: (...args: any[]) => void,
    delay: number,
) {
    const throttleRef = useRef(false);

    // Здесь собираем массив из аргументов: ...args
    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            // Здесь разворачиваем аргументы из созданного выше массива: ...args
            callback(...args);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);
}
