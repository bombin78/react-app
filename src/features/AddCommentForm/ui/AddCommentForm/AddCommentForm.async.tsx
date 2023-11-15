import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// !!! Импортируемый внутри lazy() компонент должен экспортироваться по дефолту
// export const AddCommentFormAsync = lazy(() => import('./LoginForm'));

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // Эмуляция задержки ответа с сервера
    setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
