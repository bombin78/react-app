import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
	className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.loginForm, {}, [className])}>
            <Input
                autofocus
                className={cls.input}
                type="text"
                placeholder={t('enterUsername')}
            />
            <Input
                className={cls.input}
                type="text"
                placeholder={t('enterPassword')}
            />
            <Button
                className={cls.loginBtn}
            >
                {t('login')}
            </Button>
        </div>
    );
};
