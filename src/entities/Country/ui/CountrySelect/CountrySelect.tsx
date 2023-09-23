import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
	className?: string;
	value?: Country;
	readonly?: boolean;
	onChange?: (value: Country) => void;
}

const options = [
    { value: Country.China, content: Country.China },
    { value: Country.Germany, content: Country.Germany },
    { value: Country.India, content: Country.India },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.USA, content: Country.USA },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        readonly,
        onChange,
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => onChange?.(value as Country), [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Choose a country')}
            options={options}
            value={value}
            readonly={readonly}
            onChange={onChangeHandler}
        />
    );
});
