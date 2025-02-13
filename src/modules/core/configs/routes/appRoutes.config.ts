import { RouteTree } from '@/modules/core/@core-types/routes';
import { featureRoutes } from '@/modules/features/config/featureRoutes.config';
import { profileRoutes } from '@/modules/profile/config/profileRoutes.config';

export const appRoutes: RouteTree[] = [
   ...featureRoutes,
   ...profileRoutes
];