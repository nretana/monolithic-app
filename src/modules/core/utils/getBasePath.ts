import { BASE_PATH } from '../constants/app.constant';

export const getBasePath  = (route: string) => `${BASE_PATH === '/' ? '' : BASE_PATH}${route}`;