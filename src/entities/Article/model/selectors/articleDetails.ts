// Второй вариант организации кода селекторов, упрощенный в отличии от
// от селекторов профиля в entities/Profile/model/selectors. В дальнейшем,
// при необходимости привести к тому же виду, что и селекторы в профиле.
import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data;

export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading || false;

export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error;
