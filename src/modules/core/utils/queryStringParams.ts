export const queryStringParams = (params: Record<string, string | number>) => {
    const validParams: Record<string, string> = {};
    Object.entries(params).filter(([key, value]) => {
        if(value.toString().length > 0){
            validParams[key] = value.toString();
        }
    });
    return validParams;
}