import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

// Этот AsyncThunk ни чего не получает снаружи и не отдает вовне
// Вся работа ведется внутри, для чего используется методы dispatch,
// getState и другой AsyncThunk (fetchArticlesList)
export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (_, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;
        // Внутри AsyncThunk для получения данных из state используем не useSelector, а getState
        // inited сокращение от initiated
        const inited = getArticlesPageInited(getState());

        // Если state еще не проинициализирован
        if (!inited) {
            // Порядок dispatch такой, чтобы сначала инициализировать
            // limit, а уже за тем подгружать данные
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
