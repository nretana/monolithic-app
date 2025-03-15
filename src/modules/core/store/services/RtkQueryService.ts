import { createApi } from '@reduxjs/toolkit/query/react'
import BaseService from './BaseService'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

export const axiosBaseQuery =
    (requestConfig?: AxiosRequestConfig): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
    async (request) => {
        try {
            const currentRequest: AxiosRequestConfig = { baseURL: (requestConfig && requestConfig.baseURL), 
                                                         ...request };
           
            const response = await BaseService(currentRequest);
            return { data: response?.data, meta: { headers: {...(response && response.headers) && response?.headers } } };
        } catch (axiosError) {
            const err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

const RtkQueryService = createApi({
    reducerPath: 'rtkApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
})

export default RtkQueryService
