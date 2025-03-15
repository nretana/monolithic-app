import { createApi } from '@reduxjs/toolkit/query/react';
import type { Product, ProductWithPagination } from '@/modules/product/@product-types/product';
import type {ProductQueryParams } from '@/modules/product/@product-types/product.api';
import { API_BASE_URL } from '@/modules/core/constants/api.constant';
import { queryStringParams } from '@/modules/core/utils/queryStringParams';
import { axiosBaseQuery } from '@/modules/core/store/services/RtkQueryService';


export const ProductService = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery({ 
        baseURL: API_BASE_URL, 
        timeout: 60000,
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        }
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductWithPagination, ProductQueryParams>({
            query: (params) => {
                const queryParams = queryStringParams(params);
                return ({ url: '/product', method: 'GET', params: queryParams });
            },
            transformResponse: (response: any, meta: any) => {
                const paginationHeader = meta?.headers['x-pagination'] ?? '{}';
                return { productList: response, pagination: JSON.parse(paginationHeader) } as ProductWithPagination;
            },
            providesTags: ['Product']
        }),
        getProduct: builder.query<Product, string>({
            query: (productId) => {
                return { url: `/product/${productId}`, method: 'GET' }
            }
        }),
        addProduct: builder.mutation<any, any>({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body: JSON.stringify(body)
            })
        }),
        deleteProduct: builder.mutation<unknown, string>({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: 'DELETE'
            })
        })
    }),
    keepUnusedDataFor: 0
});

export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation, useDeleteProductMutation } = ProductService;