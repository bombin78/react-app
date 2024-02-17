// TODO: добавить в тесты все поля ввода (сейчас добавлены только поля для имени и фамилии)
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
import { HStack, VStack } from 'shared/ui/Stack';
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
    const { t } = useTranslation();

    const onOnlyNumberKeyPress = useCallback((e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }, []);

    if (isLoading) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.profileCard, {}, [className, cls.loading])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.profileCard, {}, [className, cls.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('An error occurred while loading the data')}
                    text={t('Try refreshing the page')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            max
            gap="8"
            className={classNames(cls.profileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    max
                    justify="center"
                    className={cls.avatarWrap}
                >
                    <Avatar
                        src={data?.avatar}
                        alt={t('Profile picture')}
                    />
                </HStack>
            )}

            <Input
                className={cls.input}
                value={data?.first}
                readonly={readonly}
                placeholder={t('Your name')}
                onChange={onChangeFirstname}
                data-testid="ProfileCard.firstname"
            />

            <Input
                className={cls.input}
                value={data?.lastname}
                readonly={readonly}
                placeholder={t('Your last name')}
                onChange={onChangeLastname}
                data-testid="ProfileCard.lastname"
            />

            <Input
                className={cls.input}
                value={data?.age}
                readonly={readonly}
                placeholder={t('Your age')}
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
                placeholder={t('Enter user name')}
                onChange={onChangeUsername}
            />

            <Input
                className={cls.input}
                value={data?.avatar}
                readonly={readonly}
                placeholder={t('Enter link to the avatar')}
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
        </VStack>
    );
};
