import { appRoutes } from './appRoutes.config';
import { authRoutes } from '@/modules/auth/config/authRoutes.config';
import { otherRoutes, errorRoutes as errRoutes } from './otherRoutes.config';

export const protectedRoutes = [ ...appRoutes ];
export const publicRoutes = [ ...authRoutes ];
export const miscRoutes = [ ...otherRoutes ];
export const errorRoutes = [ ...errRoutes ];