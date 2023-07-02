import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { Text } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation('profile');

    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(cls.profileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Profile')} />
                <Button
                    className={cls.editBtn}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t('Edit')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    className={cls.input}
                    value={data?.first}
                    placeholder={t('Your name')}
                />
                <Input
                    className={cls.input}
                    value={data?.lastname}
                    placeholder={t('Your last name')}
                />
            </div>
        </div>
    );
};
