import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { featureNavigationRoutes } from '@/modules/features/config/featureNavigation.config';
import { profileNavigationRoutes } from '@/modules/profile/config/profileNavigation.config';


export const navigationRoutes: NavigationTree[] = [
    ...featureNavigationRoutes,
    ...profileNavigationRoutes
]  