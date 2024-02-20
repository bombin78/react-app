import { lazy } from 'react';

// !!! Импортируемый внутри lazy() компонент должен экспортироваться по дефолту
export const AdminPanelPageAsync = lazy(() => import('./AdminPanelPage'));
