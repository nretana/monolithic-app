//PATTERN
//[module]:[feature]:[user-right]
//features:people:view

export type AppModules = 'people' | 'auth';
export type ModuleRights = 'view' | 'add' | 'update' | 'delete'
export type Permission<Feature extends AppModules> = `${Feature}:${ModuleRights}`;

export type UserRights = {
    [key in AppModules]: ModuleRights[]
}