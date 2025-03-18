import { Permission, UserRights } from '@/modules/core/@core-types/permissions';

export type EntityManagementModule = 'entity-management';
export type EntityManagementFeatures = 'people';

export type EntityManagementPermission = Permission<EntityManagementModule, EntityManagementFeatures>;
export type EntityManagementUserRights = UserRights<EntityManagementModule, EntityManagementFeatures>;