import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

// Параметры дженерика:
// первый - тип для того что возвращается,
// второй - тип для аргументов,
// третий - тип для конфигурации API.
export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            dispatch,
            rejectWithValue,
            extra,
            getState,
        } = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });
            // Если с сервера вернулся пустой ответ, то будем считать, что это ошибка
            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(article.id));

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
