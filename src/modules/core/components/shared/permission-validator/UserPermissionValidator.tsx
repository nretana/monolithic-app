import React from 'react';
import { ModulePermission, ModuleRights } from '@/modules/core/@core-types/permissions';
import { USER_PERMISSIONS } from '@/modules/core/constants/app.constant';


type UserPermissionValidatorProps = {
    permission: ModulePermission,
    render: () => JSX.Element,
    permissionDeniedRender?: () => JSX.Element
}


export const UserPermissionValidator: React.FC<UserPermissionValidatorProps> = (props) => {

    const permission = props.permission as ModulePermission;
    const [module, feature, userRight] = permission.split(':');
    const currentPermission = USER_PERMISSIONS[module]?.[feature];
    
    //TODO: refactor to get permission as obj and remove the usage of looping an array
    const isUserAllowed = currentPermission && currentPermission.includes(userRight as ModuleRights);

    return(<>
            { isUserAllowed ? props.render() : 
                             (props.permissionDeniedRender && 
                              props.permissionDeniedRender()) }
           </>)
}