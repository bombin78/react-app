import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// !!! Импортируемый внутри lazy() компонент должен экспортироваться по дефолту
// export const LoginFormAsync = lazy(() => import('./LoginForm'));

export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => new Promise((resolve) => {
    // Эмуляция задержки ответа с сервера
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
