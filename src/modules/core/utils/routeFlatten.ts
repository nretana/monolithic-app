import type { RouteTree } from '@/modules/core/@core-types/routes';

const routeFlatten = (routes: RouteTree[]) => {
    let flattenArr: RouteTree[] = [];

    routes.forEach((route: RouteTree) => {
        route.subRoute.length > 0 && flattenArr.push(...routeFlatten(route.subRoute));
        flattenArr.push({ ...route, subRoute: [] });

    });
    
    return flattenArr;
}
 
export default routeFlatten;