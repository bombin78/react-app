import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

// Этот AsyncThunk ни чего не получает снаружи и не отдает вовне
// Вся работа ведется внутри, для чего используется методы dispatch,
// getState и другой AsyncThunk (fetchArticlesList)
export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;
        // Внутри AsyncThunk для получения данных из state используем не useSelector, а getState
        // inited сокращение от initiated
        const inited = getArticlesPageInited(getState());

        // Если state еще не проинициализирован
        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type') as ArticleType;

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl));
            }

            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl));
            }

            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl));
            }

            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl));
            }

            // Порядок dispatch такой, чтобы сначала инициализировать
            // limit, а уже за тем подгружать данные
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
