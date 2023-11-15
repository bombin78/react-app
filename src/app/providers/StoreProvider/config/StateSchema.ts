import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { NavigateOptions, To } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { ProfileSchema } from 'entities/Profile';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;

	// Asynchronous reducers
	loginForm?: LoginSchema;
    addCommentForm?: AddCommentFormSchema;
	profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManger {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce:(state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add:(key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManger;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    state: StateSchema;
    extra: ThunkExtraArg;
    rejectValue: T;
}
