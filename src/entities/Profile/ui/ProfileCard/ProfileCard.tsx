import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { TextAlign, TextTheme } from 'shared/ui/Text/ui/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
	className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');

    const onOnlyNumberKeyPress = useCallback((e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }, []);

    if (isLoading) {
        return (
            <div className={classNames(cls.profileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.profileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('DataLoadingError')}
                    text={t('DataLoadingErrorTip')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.profileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrap}>
                        <Avatar
                            src={data?.avatar}
                            alt={t('ProfilePicture')}
                        />
                    </div>
                )}

                <Input
                    className={cls.input}
                    value={data?.first}
                    readonly={readonly}
                    placeholder={t('YourName')}
                    onChange={onChangeFirstname}
                />

                <Input
                    className={cls.input}
                    value={data?.lastname}
                    readonly={readonly}
                    placeholder={t('YourLastName')}
                    onChange={onChangeLastname}
                />

                <Input
                    className={cls.input}
                    value={data?.age}
                    readonly={readonly}
                    placeholder={t('YourAge')}
                    onChange={onChangeAge}
                    // Пробный вариант: разрешаем вводить только цифры
                    onKeyPress={onOnlyNumberKeyPress}
                />

                <Input
                    className={cls.input}
                    value={data?.city}
                    readonly={readonly}
                    placeholder={t('City')}
                    onChange={onChangeCity}
                />

                <Input
                    className={cls.input}
                    value={data?.username}
                    readonly={readonly}
                    placeholder={t('UserName')}
                    onChange={onChangeUsername}
                />

                <Input
                    className={cls.input}
                    value={data?.avatar}
                    readonly={readonly}
                    placeholder={t('AvatarLink')}
                    onChange={onChangeAvatar}
                />

                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    readonly={readonly}
                    onChange={onChangeCurrency}
                />

                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    readonly={readonly}
                    onChange={onChangeCountry}
                />
            </div>
        </div>
    );
};
