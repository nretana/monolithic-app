import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { SINGLE_MENU_ITEM, COLLAPSE_MENU_ITEM } from '@/modules/core/constants/app.constants';
import { ADMIN, USER } from '@/modules/core/constants/roles.constants';
import { IconUser } from '@tabler/icons-react';
import { PROFILE_KEY, PROFILE_PATH } from '../constants/profileRoutes.constants';

export const profileNavigationRoutes: NavigationTree[] = [
    {
        key: PROFILE_KEY,
        path: PROFILE_PATH,
        title: 'Profile',
        icon: IconUser,
        type: SINGLE_MENU_ITEM,
        authority: [ADMIN, USER],
        subMenu: []
    }
]  