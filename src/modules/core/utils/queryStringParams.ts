export const queryStringParams = (params: Record<string, string | number | null>) => {
    const validParams: Record<string, string> = {};
    Object.entries(params).filter(([key, value]) => {
        if(value && value.toString().length > 0){
            validParams[key] = value.toString();
        }
    });
    return validParams;
}