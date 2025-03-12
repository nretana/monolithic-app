import React from 'react';
import { Permission, AppModules, ModuleRights } from '@/modules/core/@core-types/permissions';
import { USER_PERMISSIONS } from '@/modules/core/constants/app.constant';

//PATTERN
//[module]:[feature]:[user-right]
//courses:assignments:read

type UserPermissionBoxProps = {
    permission: Permission<AppModules>,
    render: () => JSX.Element,
    permissionDeniedRender?: () => JSX.Element
}

const UserPermissionBox: React.FC<UserPermissionBoxProps> = (props) => {
    const permission = props.permission as Permission<AppModules>;
    const [feature, right] = permission.split(':');
    const currentPermission = USER_PERMISSIONS[feature as AppModules];
    //TODO: refactor to get permission as obj and remove the usage of looping an array
    const isUserAllowed = currentPermission.includes(right as ModuleRights);

    return(<>
            { isUserAllowed ? props.render() : 
                             (props.permissionDeniedRender && 
                              props.permissionDeniedRender()) }
           </>)
}

export default UserPermissionBox;