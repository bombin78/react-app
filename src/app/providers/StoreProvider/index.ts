import StoreProvider from './ui/StoreProvider';
import {
    StateSchema, ReduxStoreWithManager, ThunkExtraArg, ThunkConfig,
} from './config/StateSchema';
import { createReduxStore, AppDispatch } from './config/store';

export {
    StoreProvider,
    StateSchema,
    ReduxStoreWithManager,
    createReduxStore,
    AppDispatch,
    ThunkExtraArg,
    ThunkConfig,
};
