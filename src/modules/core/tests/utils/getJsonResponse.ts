export const getJsonResponse = async(module: string, feature: string) => {
    try {
        const response = await import(`@/modules/${module}/tests/mocks/${feature}-responses/${feature}-success-response.json`);
        return response.default;
    }
    catch(error){
        console.error(error);
    }
    return null;
}