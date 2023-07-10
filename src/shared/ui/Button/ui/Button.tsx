import {
    FC,
    ButtonHTMLAttributes,
    memo,
    ReactNode,
} 							from 'react';
import { Mods, classNames } 		from 'shared/lib/classNames/classNames';
import cls 					from './Button.module.scss';

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clearInverted',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'sizeM',
    L = 'sizeL',
    XL = 'sizeXL',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    // В react 18 надо будет указывать это свойство отдельно, т.к его нет в типе "FC"
    children?: ReactNode;
}

// Предполагаю, что в подавляющем большинстве случает у этого компонента - children
// будет строкой, поэтому здесь тоже использовал мемоизацию с помощью HOC memo().
// !!! Уточнить, может ли в качестве children передаваться примитив или это всегда ссылочный
// тип и будет ли работать memo(), если в качестве children передается ссылочный тип !!!
export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[size]]: true,
        [cls.square]: square,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            { children }
        </button>
    );
});
