import { profileReducer } from 'entities/Profile';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage: FC<ProfilePageProps> = memo((props: ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={reducers}
        >
            <div className={classNames('', {}, [className])}>
                {t('profilePage')}
            </div>
        </DynamicModuleLoader>

    );
});

export default ProfilePage;
