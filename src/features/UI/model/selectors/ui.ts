import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getUIScroll = (state:StateSchema) => state.ui.scroll;

export const getUIScrollByPath = createSelector(
    // С начала получаем весь объект
    getUIScroll,
    // Передаем путь
    (state: StateSchema, path: string) => path,
    // ...
    (scroll, path) => scroll[path] || 0,
);
