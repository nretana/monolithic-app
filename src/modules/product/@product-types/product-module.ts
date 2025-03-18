import { Permission, UserRights } from '@/modules/core/@core-types/permissions';

export type ProductModule = 'product';
export type ProductFeatures = 'product' | 'inventory';

export type ProductPermission = Permission<ProductModule, ProductFeatures>;
export type ProductUserRights = UserRights<ProductModule, ProductFeatures>;