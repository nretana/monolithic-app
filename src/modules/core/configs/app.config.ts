import { ENTITY_MANAGEMENT_PATH } from '@/modules/entity-management/constants/entityManagement.routes.constant';
import { SIGNIN_PATH } from '@/modules/auth/constants/auth.routes.constant';
import { BASE_PATH } from '@/modules/core/constants/app.constant';


export type AppConfig = {
    apiPrefix: string
    appBase: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/',
    appBase: BASE_PATH,
    authenticatedEntryPath: ENTITY_MANAGEMENT_PATH,
    unAuthenticatedEntryPath: SIGNIN_PATH,
    locale: 'en',
    enableMock: true
}

export default appConfig;
