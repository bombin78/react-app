import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        const {
            rejectWithValue,
            extra,
        } = thunkAPI;

        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`);

            if (!response.data) {
                throw new Error();
            }

            // По умолчанию, возвращаемые данные оборачиваются в thunkAPI.fulfillWithValue()
            return response.data;
        } catch (e) {
            console.log(e);
            // Используйте "e.response.data" в качестве "action.payload" для "rejected"
            // действия, явно возвращая его с помощью утилиты "rejectWithValue()":
            // thunkAPI.rejectWithValue(e.response.data);
            return rejectWithValue('error');
        }
    },
);
