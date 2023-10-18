import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        const {
            rejectWithValue,
            extra,
        } = thunkAPI;

        if (!articleId) {
            return rejectWithValue('error');
        }

        try {
            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            // По умолчанию, возвращаемые данные оборачиваются в thunkAPI.fulfillWithValue()
            return response.data;
        } catch (e) {
            // Используйте "e.response.data" в качестве "action.payload" для "rejected"
            // действия, явно возвращая его с помощью утилиты "rejectWithValue()":
            // thunkAPI.rejectWithValue(e.response.data);
            return rejectWithValue('error');
        }
    },
);
