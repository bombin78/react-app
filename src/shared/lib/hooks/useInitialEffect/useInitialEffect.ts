import { useEffect } from 'react';

export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            callback();
        }
        // Отключаем линтер, чтобы он не требовал добавить зависимость в [],
        // так как этот хук отрабатывает единожды при монтировании компонента
        // eslint-disable-next-line
    }, []);
}
