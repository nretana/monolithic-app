import { appRoutes } from './app.routes.config';
import { authRoutes } from '@/modules/auth/config/auth.routes.config';
import { otherRoutes, errorRoutes as errRoutes } from './other.routes.config';

export const protectedRoutes = [ ...appRoutes ];
export const publicRoutes = [ ...authRoutes ];
export const miscRoutes = [ ...otherRoutes ];
export const errorRoutes = [ ...errRoutes ];