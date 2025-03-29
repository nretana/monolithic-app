import { AcceptType, ContentType } from '@/modules/core/@core-types/core-api';

export type ProductEndpoint = {
    baseUrl: string,
    headers?: {
        'Accept': AcceptType,
        'Content-Type': ContentType
    },
    endpoints: {
        getProducts: string,
        getProduct: (productId: string) => string,
        addProduct: string,
        deleteProduct: (productId: string) => string
    }
}