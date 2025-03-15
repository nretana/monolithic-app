import { ENTITY_MANAGEMENT_PATH } from '@/modules/entity-management/constants/entityManagement.routes.constant';
import { SIGNIN_PATH } from '@/modules/auth/constants/auth.routes.constant';
import { BASE_PATH } from '@/modules/core/constants/app.constant';
import { Currency } from '../@core-types/currency';


export type AppConfig = {
    apiPrefix: string
    appBase: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string,
    currency: Currency,
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/',
    appBase: BASE_PATH,
    authenticatedEntryPath: ENTITY_MANAGEMENT_PATH,
    unAuthenticatedEntryPath: SIGNIN_PATH,
    locale: 'en',
    currency: { currency: 'USD', symbol: '$' },
    enableMock: true
}

export default appConfig;
