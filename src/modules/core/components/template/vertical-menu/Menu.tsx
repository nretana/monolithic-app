import { useState } from 'react';
import { SINGLE_MENU_ITEM, COLLAPSE_MENU_ITEM } from '@/modules/core/constants/app.constant';
import { NavigationTree } from '@/modules/core/@core-types/navigation';
import { navigationRoutes } from '@/modules/core/configs/navigation.config';
import SingleMenuItem from './single-menu-item/SingleMenuItem';
import CollapsibleMenuItem from './collapse-menu-item/CollapseMenuItem';
import useMenuActive from '@/modules/core/hooks/useMenuActive';
import { useAppSelector } from '@/modules/core/store';

const Menu = () => {

    const routeKey = useAppSelector(state => state.base.currentRouteKey);
    const userRoles = useAppSelector(state => state.auth.user.authority);

    //console.log(routeKey);
    //const {} = useMenuActive(NavigationRoutes, routeKey);

    const authorizedRoutes = navigationRoutes.filter(route => route.authority.some(role => userRoles?.includes(role)))
                                             .map(route => ({ ...route, 
                                                              subMenu: (route.subMenu.filter(subMenu => 
                                                                        subMenu.authority.some(role => userRoles?.includes(role) )))
                                              }));

    const menuItems = authorizedRoutes.map(route => route.type === COLLAPSE_MENU_ITEM ? 
                                                            <CollapsibleMenuItem key={route.key}
                                                                                 route={route}
                                                                                 routeKeyActive={routeKey}
                                                                                 initiallyOpened={false} /> :
                                                            <SingleMenuItem key={route.key}
                                                                            route={route}
                                                                            routeKeyActive={routeKey} />);
    return(<>{menuItems}</>)
}

export default Menu;

/*   && route.subMenu.length ? route.subMenu.filter(subRoute => 
                                                                    subRoute.authority.some((role) => userRoles?.includes(role))
                                                                ) : true */