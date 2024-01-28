import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox/ListBox';
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
        <ListBox
            className={classNames('', {}, [className])}
            items={options}
            value={value}
            defaultValue={t('Choose a country')}
            label={t('Choose a country')}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top right"
        />
    );
});
