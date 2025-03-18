import { ModuleUserRights, UserRights } from '@/modules/core/@core-types/permissions';

export const APP_NAME = 'Admin App';
export const PERSIST_STORE_NAME = 'admin';
export const REDIRECT_URL_KEY = 'redirectUrl';

export const SIDE_LAYOUT = 'cover';
export const COVER_LAYOUT = 'side';

export const SINGLE_MENU_ITEM = 'single';
export const COLLAPSE_MENU_ITEM = 'collapse';

export const BASE_PATH = `${import.meta.env.VITE_APP_BASE_URL}`;


//TODO: remove when permissions have been added to JWT
export const USER_PERMISSIONS: ModuleUserRights = {
    'entity-management': {
        people: ['view'], //['view', 'add', 'update', 'delete'],
    },
    auth: {
        signin:['view'],
        signup:['view']
    },
    product: {
        product:['view', 'add', 'update', 'delete'],
        inventory: ['view', 'add', 'update', 'delete']
    }
}