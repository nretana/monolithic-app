import { delay, http, HttpResponse } from 'msw';
import { AppMockTestConfig } from '@/modules/core/@core-types/app-test';
import { ProductFeatures, ProductModule } from '../../@product-types/product-module';
import { ProductTestCases } from '@/modules/product/@product-types/product-test';
import { PRODUCT_PAGINATION_HEADER } from '../constants/product.test.constant';
import { getJsonResponse } from '@/modules/core/tests/utils/getJsonResponse';
import { productEndpoints } from '@/modules/product/configs/product.endpoints.config';


//module => feature -> use-case
 export const productTestConfig: AppMockTestConfig<ProductModule, ProductFeatures, ProductTestCases> = {
    product: { //module
        product: [ //feature
            { //use-case
                testCase: 'allProducts',
                state: 'success',
                handlers: {
                    success: [http.get(`${productEndpoints.baseUrl}${productEndpoints.endpoints.getProducts}`, 
                                        async({ request }) => {
                                            await delay(3000);
                                            const jsonResponse = await getJsonResponse('product', 'product');
                                            return HttpResponse.json(jsonResponse, { headers: PRODUCT_PAGINATION_HEADER });
                                        })],
                    failed: [http.get(`${productEndpoints.baseUrl}${productEndpoints.endpoints.getProducts}`, 
                                        ({ request }) => new HttpResponse(null, { status: 500 }))]
                }
            },
            {
                testCase: 'createProduct',
                state: 'failed',
                handlers: {
                    success: [],
                    failed: []
                }
            }
        ]
    }
 }
