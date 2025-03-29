import { ProductEndpoint } from '@/modules/product/@product-types/product-endpoint';
import { API_BASE_URL, CONTENT_TYPE_JSON } from '@/modules/core/constants/api.constant';


export const productEndpoints: ProductEndpoint = {
    baseUrl: API_BASE_URL,
    headers: {
         'Accept': CONTENT_TYPE_JSON,
         'Content-Type': CONTENT_TYPE_JSON
    },
    endpoints: {
        getProducts: '/product',
        getProduct: (productId: string) => `/product/${productId}`,
        addProduct: '/product',
        deleteProduct: (productId: string) => `/product/${productId}`,
    }
}