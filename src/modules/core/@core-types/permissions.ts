//PATTERN
//[module]:[feature]:[user-right] i.e features:people:view
//[role]:[module]:[feature]:[action] i.e admin:product:product:add

import { ProductPermission, ProductUserRights } from '@/modules/product/@product-types/product-module';
import { AppFeatures, AppModules } from './app-modules';
import { EntityManagementPermission, EntityManagementUserRights } from '@/modules/entity-management/@entity-types/entity-management-module';

export type ModuleRights = 'view' | 'add' | 'update' | 'delete'
export type ModulePermission =  EntityManagementPermission | ProductPermission;
export type ModuleUserRights =  EntityManagementUserRights | ProductUserRights;

export type Permission<Module extends AppModules, Feature extends AppFeatures> = `${Module}:${Feature}:${ModuleRights}`;

export type UserRights<Module extends AppModules, Feature extends AppFeatures> = Partial<{
    [key: string]: Partial<{ // in Module
        [key: string]: ModuleRights[] // in Feature
     }>
}>;