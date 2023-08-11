import {
    ChangeEvent, FC, memo, useCallback, useMemo,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	value?: string;
	options?: SelectOption[];
	onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        value,
        options,
        onChange,
    } = props;

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            key={opt.value}
            value={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {};

    return (
        <div className={classNames(cls.wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionList}
            </select>
        </div>
    );
});
