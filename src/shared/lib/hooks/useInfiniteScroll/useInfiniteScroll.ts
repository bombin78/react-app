// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
	callback?: () => void;
	// Элемент, за пересечением с областью видимости которого будем наблюдать
	triggerRef: MutableRefObject<HTMLElement>;
	// Wrapper или root - элемент, внутри которого будет действовать скролл
	wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollOptions) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        if (callback) {
            const options = {
                root: wrapperRef.current,
                // C rootMargin = '0px' и отсутствием отступов у блока (triggerRef)
                // observer.observe(triggerRef.current) не фиксирует появление блока
                // (triggerRef) в области блока wrapperRef
                rootMargin: '1px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
            // Чтобы callback срабатывал только при появлении triggerRef в области wrapperRef
            // Без этого условия он срабатывает также при исчезновении из области wrapperRef
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerRef.current);
        }

        // Для избежания утечек памяти при размонтировании компонента, нужно удалить наблюдатель
        return () => {
            if (observer) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
