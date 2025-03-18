export const getJsonResponse = async(module: string, feature: string) => {
    try {
        const response = await import(`../mocks/${module}-responses/${feature}-success-response.json`);
        return response.default;
    }
    catch(error){
        console.log(error);
    }
    return null;
}