import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(
    callback: (...args: any[]) => void,
    delay: number,
) {
    const time = useRef(false) as MutableRefObject<any>;

    // Здесь собираем массив из аргументов: ...args
    return useCallback((...args: any[]) => {
        // Каждый раз при вызове этой функции таймер,
        // в котором находиться колбэк, очищается
        if (time.current) {
            clearTimeout(time.current);
        }
        // А затем создается новый таймер с колбэком
        time.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}
