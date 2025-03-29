import { delay, http, HttpResponse } from 'msw';
import jsonResponse from '../mocks/product-responses/product-success-response.json';
import { productEndpoints } from '@/modules/product/configs/productEndpoints.config';
import { PRODUCT_PAGINATION_HEADER } from '@/modules/product/tests/constants/product.test.constant';


export const productHandlers: any = {
    success: [http.get(`${productEndpoints.baseUrl}${productEndpoints.endpoints.getProducts}`, 
                        async({ request }) => { 
                            await delay(5000);
                            return HttpResponse.json( jsonResponse, { headers: PRODUCT_PAGINATION_HEADER });
                        })],
    failed: [http.get(`${productEndpoints.baseUrl}${productEndpoints.endpoints.getProducts}`, 
                       ({ request }) => new HttpResponse(null, { status: 500 }))]
}

