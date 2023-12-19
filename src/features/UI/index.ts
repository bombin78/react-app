// TODO: Поменять название на Scroll Restoration или
// вынести на уровень виджета страницы и прям там изолировать
export { UISchema } from './model/types/uiSchema';

export { getUIScrollByPath } from './model/selectors/ui';

// Отдаем редьюсер (uiReducer), чтобы затем отдать его в корневой редьюсер
// uiActions понадобиться, чтобы на более высоких уровнях реализовать логику
// по сохранению стэйта
export { uiReducer, uiActions } from './model/slices/uiSlice';
