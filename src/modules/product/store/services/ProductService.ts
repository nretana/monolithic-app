import { createApi } from '@reduxjs/toolkit/query/react';
import type { Product, ProductWithPagination } from '@/modules/product/@product-types/product';
import type {ProductQueryParams } from '@/modules/product/@product-types/product.api';
import { queryStringParams } from '@/modules/core/utils/queryStringParams';
import { axiosBaseQuery } from '@/modules/core/store/services/RtkQueryService';
import { productEndpoints } from '@/modules/product/configs/product.endpoints.config';


export const ProductService = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery({ 
        baseURL: productEndpoints.baseUrl, 
        timeout: 60000,
        headers: productEndpoints.headers
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductWithPagination, ProductQueryParams>({
            query: (params) => {
                const queryParams = queryStringParams(params);
                return ({ url: productEndpoints.endpoints.getProducts, method: 'GET', params: queryParams });
            },
            transformResponse: (response: any, meta: any) => {
                const paginationHeader = meta?.headers['x-pagination'] ?? '{}';
                return { productList: response, pagination: JSON.parse(paginationHeader) } as ProductWithPagination;
            },
            providesTags: ['Product']
        }),
        getProduct: builder.query<Product, string>({
            query: (productId) => {
                return { url: productEndpoints.endpoints.getProduct(productId), method: 'GET' }
            }
        }),
        addProduct: builder.mutation<any, any>({
            query: (body) => ({
                url: productEndpoints.endpoints.addProduct,
                method: 'POST',
                body: JSON.stringify(body)
            })
        }),
        deleteProduct: builder.mutation<unknown, string>({
            query: (productId) => ({
                url: productEndpoints.endpoints.getProduct(productId),
                method: 'DELETE'
            })
        })
    }),
    keepUnusedDataFor: 0
});

export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation, useDeleteProductMutation } = ProductService;