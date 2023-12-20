// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
	callback?: () => void;
	// Wrapper или root - элемент, внутри которого будет действовать скролл
	wrapperRef: MutableRefObject<HTMLElement>;
	// Элемент, за пересечением с областью видимости которого будем наблюдать
	triggerRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
}: UseInfiniteScrollOptions) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        // Чтобы wrapperRef.current и triggerRef.current были доступны после того,
        // как компонент демонтировался и можно было отписаться от triggerRef.current
        // создаем переменные wrapperElement и triggerElement
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                // TODO: выбрать какой вариант будет лучше
                // C rootMargin = '0px' и отсутствием отступов у блока (triggerElement)
                // observer.observe(triggerElement) не фиксирует появление блока (triggerElement)
                // в области блока wrapperElement. Для решения этой проблемы нужно либо установить
                // здесь rootMargin: '1px', либо добавить класс cls.trigger устанавливающий высоту
                // и отступы, как это сейчас реализовано в компоненте "src/widgets/Page/Page.tsx"
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
            // Чтобы callback срабатывал только при появлении triggerElement в области wrapperElement
            // Без этого условия он срабатывает также при исчезновении из области wrapperElement
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerElement);
        }

        // Для избежания утечек памяти при размонтировании компонента, нужно удалить наблюдатель
        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
