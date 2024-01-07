import { lazy } from 'react';

// !!! Импортируемый внутри lazy() компонент должен экспортироваться по дефолту
export const AddCommentFormAsync = lazy(() => import('./AddCommentForm'));
