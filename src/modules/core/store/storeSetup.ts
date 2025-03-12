import {
    configureStore,
    Action,
    Reducer,
    AnyAction,
    Store,
} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PERSIST_STORE_NAME } from '@/modules/core/constants/app.constant'
import rootReducer, { RootState, AsyncReducers } from './rootReducer'
import RtkQueryService from './services/RtkQueryService'
import { PersonService2 } from '@/modules/entity-management/store/services/PersonService2'

/* eslint-disable @typescript-eslint/no-explicit-any */
const middlewares: any[] = [RtkQueryService.middleware, PersonService2.middleware]

const persistConfig = {
    key: PERSIST_STORE_NAME,
    keyPrefix: '',
    storage,
    whitelist: ['auth', 'locale'],
}

interface CustomStore extends Store<RootState, AnyAction> {
    asyncReducers?: AsyncReducers
}

const store: CustomStore = configureStore({
    reducer: persistReducer(persistConfig, rootReducer() as Reducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === 'development',
})

store.asyncReducers = {};

export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
    if (store.asyncReducers) {
        if (store.asyncReducers[key]) {
            return false
        }
        store.asyncReducers[key] = reducer
        store.replaceReducer(
            persistReducer(
                persistConfig,
                rootReducer(store.asyncReducers) as Reducer
            )
        )
    }
    persistor.persist()
    return store
}

const reducersRegistry: AsyncReducers = store.asyncReducers;
function getStateType<Key extends string>(key: Key): any {
    const reducer = reducersRegistry[key];
    if (!reducer) {
      throw new Error(`Reducer for ${key} not found`);
    }
    return reducer(undefined, { type: '@@INIT' }); // Calling the reducer with undefined to get its initial state
}

function getRootState() {
    const rootState: Partial<Record<string, any>> = {};
  
    for (const key in reducersRegistry) {
      rootState[key] = getStateType(key);
    }
  
    return rootState;
}

export const persistor = persistStore(store);
export type StoreState = RootState & ReturnType<typeof getRootState>;
export type AppDispatch = typeof store.dispatch;
export default store;