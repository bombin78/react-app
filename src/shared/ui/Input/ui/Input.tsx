import {
    FC,
    ChangeEvent,
    InputHTMLAttributes,
    memo,
    useState,
    useEffect,
    useRef,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onKeyPress' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
	className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    onKeyPress?: (value: any) => void;
    autofocus?: boolean;
    readonly?: boolean;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        // Пробный вариант для возможности ограничения ввода данных
        onKeyPress,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const isCorrectVisible = isFocused && !readonly;

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.inputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    // Пробный вариант для возможности ограничения ввода данных
                    onKeyPress={onKeyPress}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCorrectVisible && (
                    <span
                        className={cls.caret}
                        // Такой способ перемещения каретки работает не очень хорошо.
                        // В дальнейшем необходимо это поправить.
                        style={{ left: `${caretPosition * 8}px` }}
                    />
                )}
            </div>
        </div>
    );
});
