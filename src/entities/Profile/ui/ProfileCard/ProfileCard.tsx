import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { TextAlign, TextTheme } from 'shared/ui/Text/ui/Text';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
	className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname: (value?: string) => void;
    onChangeLastname: (value?: string) => void;
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
    } = props;
    const { t } = useTranslation('profile');

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

    return (
        <div className={classNames(cls.profileCard, {}, [className])}>
            <div className={cls.data}>
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
            </div>
        </div>
    );
};
