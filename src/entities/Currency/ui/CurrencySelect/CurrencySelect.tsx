import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
	className?: string;
	value?: Currency;
	readonly?: boolean;
	onChange?: (value: Currency) => void;
}

const options = [
    { value: Currency.CNY, content: Currency.CNY },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.INR, content: Currency.INR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        readonly,
        onChange,
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => onChange?.(value as Currency), [onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={options}
            value={value}
            defaultValue={t('Choose a currency')}
            label={t('Choose a currency')}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top right"
        />
    );
});
