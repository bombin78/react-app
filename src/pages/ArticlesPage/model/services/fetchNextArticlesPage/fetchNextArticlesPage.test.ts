import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// Мокаем модуль fetchArticlesList
jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('Success', async () => {
        const thunk = new TestAsyncThunk(
            // actionCreator
            fetchNextArticlesPage,
            // state: задаем начальные данные для тестирования
            {
                articlesPage: {
                    page: 2,
                    limit: 5,
                    ids: [],
                    entities: {},
                    hasMore: true,
                    isLoading: false,
                },
            },
        );

        await thunk.callThunk();

        // Проверка что dispatch вызвался 4 раза, т.е. это panging,
        // fulfilled и два dispatch внутри самого action
        expect(thunk.dispatch).toBeCalledTimes(4);
        // Проверка, что функция fetchArticlesList вызывается
        expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('fetchArticlesList is not called because hasMore = false', async () => {
        const thunk = new TestAsyncThunk(
            // actionCreator
            fetchNextArticlesPage,
            // state: задаем начальные данные для тестирования
            {
                articlesPage: {
                    page: 2,
                    limit: 5,
                    ids: [],
                    entities: {},
                    hasMore: false,
                    isLoading: false,
                },
            },
        );

        await thunk.callThunk();

        // Проверка что dispatch вызвался 2 раза, т.е. это panging,
        // fulfilled. Т.е. два dispatch внутри самого action не вызовутся
        expect(thunk.dispatch).toBeCalledTimes(2);
        // Проверка, что функция fetchArticlesList не вызвалась
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test('fetchArticlesList is not called because isLoading = true', async () => {
        const thunk = new TestAsyncThunk(
            // actionCreator
            fetchNextArticlesPage,
            // state: задаем начальные данные для тестирования
            {
                articlesPage: {
                    page: 2,
                    limit: 5,
                    ids: [],
                    entities: {},
                    hasMore: true,
                    isLoading: true,
                },
            },
        );

        await thunk.callThunk();

        // Проверка что dispatch вызвался 2 раза, т.е. это panging,
        // fulfilled. Т.е. два dispatch внутри самого action не вызовутся
        expect(thunk.dispatch).toBeCalledTimes(2);
        // Проверка, что функция fetchArticlesList не вызвалась
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
