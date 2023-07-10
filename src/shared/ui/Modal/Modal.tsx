import React, {
    ReactNode,
    useEffect,
    useRef,
    useState,
    useCallback,
    MutableRefObject,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    // Первый вариант решения - добавление | null, чтобы задать изменяемый тип для
    // результата useRef, в противном случае свойство timerRef.current будет readonly.
    // const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Второй вариант решения - это указание изменяемости через утверждение типа.
    // Это позволяет не указывать значение null по умолчанию и избежать дополнительных
    // проверок на null в дальнейшем (смотри ниже по коду).
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const { theme } = useTheme();

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
        return () => {
            setIsMounted(false);
        };
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // Здесь необходимо использовать KeyboardEvent из ts
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            // Для варианта с null необходимо сделать проверку на null
            // (const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null))
            // if (timerRef.current !== null) {
            //     clearTimeout(timerRef.current);
            //     window.removeEventListener('keydown', onKeyDown);
            // }
            // но мы сделали явное преобразование через as (смотри выше по коду)
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className])}>
                <div
                    className={cls.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={cls.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
