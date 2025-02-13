import { DASHBOARD_PATH } from '@/modules/features/constants/featureRoutes.constants';
import { SIGNIN_PATH } from '@/modules/auth/constants/authRoutes.constants';

export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/',
    authenticatedEntryPath: DASHBOARD_PATH,
    unAuthenticatedEntryPath: SIGNIN_PATH,
    locale: 'en',
    enableMock: true,
}

export default appConfig;
