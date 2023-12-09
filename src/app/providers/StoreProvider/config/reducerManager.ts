import {
    AnyAction,
    Reducer,
    ReducersMapObject,
    combineReducers,
} from '@reduxjs/toolkit';
import {
    MountedReducers,
    ReducerManger,
    StateSchema,
    StateSchemaKey,
} from './StateSchema';

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManger {
    const reducers = { ...initialReducers };
    let combinedReducer = combineReducers(reducers);
    let keysToRemove: StateSchemaKey[] = [];
    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        // TODO: метод getMountedReducers дублирует
        // метод getReducerMap в плане получения редьюсеров.
        getMountedReducers: () => mountedReducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => delete state[key]);
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combinedReducer = combineReducers(reducers);
        },
    };
}
