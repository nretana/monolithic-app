import { delay, http, HttpResponse } from 'msw';
import jsonResponse from '../mocks/product-responses/product-success-response.json';
import { PRODUCT_ENDPOINT, PRODUCT_PAGINATION_HEADER } from '../constants/product.test.constant';


export const productHandlers: any = {
    success: [http.get(PRODUCT_ENDPOINT, async({ request }) => { 
                await delay(5000);
                return HttpResponse.json( jsonResponse,
                                          { headers: PRODUCT_PAGINATION_HEADER });
             })],

    failed: [http.get(PRODUCT_ENDPOINT, ({ request }) => new HttpResponse(null, { status: 500 }))]
}

