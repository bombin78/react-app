import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

// Этот AsyncThunk ни чего не получает снаружи и не отдает вовне
// Вся работа ведется внутри, для чего используется методы dispatch,
// getState и другой AsyncThunk (fetchArticlesList)
export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;
        // Внутри AsyncThunk для получения данных из state используем не useSelector, а getState
        // + флаг hasMore по правильному должен возвращаться с бэкенда, а не формироваться в слайсе
        const hasMore = getArticlesPageHasMore(getState());
        const pageNum = getArticlesPageNum(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            // Меняем номер страница на следующий по порядку и
            dispatch(articlesPageActions.setPage(pageNum + 1));
            // подгружаем данные для этой страницы
            dispatch(fetchArticlesList({}));
        }
    },
);
