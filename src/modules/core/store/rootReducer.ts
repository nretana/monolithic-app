import { combineReducers, AnyAction, Reducer } from 'redux';
import auth, { AuthState } from '@/modules/auth/store/slices';
import base, { BaseState } from './slices/base/baseSlice';
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from './services/RtkQueryService'
import { PersonService2 } from '@/modules/features/store/services/PersonService2';

export type RootState = {
    auth: AuthState
    base: BaseState
    locale: LocaleState
    theme: ThemeState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
    [PersonService2.reducerPath]: any
}

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    auth,
    base,
    locale,
    theme,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
    [PersonService2.reducerPath]: PersonService2.reducer
}

const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        return combinedReducer(state, action)
    }

export default rootReducer
