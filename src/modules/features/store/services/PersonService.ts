import { useQuery, UseQueryResult, DefaultError } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/modules/core/constants/api.constant';
import type { Person } from '@/modules/features/@feature-types/person';
import AxiosBaseQuery from '@/modules/core/store/services/AxiosBaseQuery';
import { queryStringParams } from '@/modules/core/utils/queryStringParams';

type PersonQueryParams = {
    firstName?: string
    lastName?: string
}

type PersonApiService = {
    initRequestConfig: AxiosRequestConfig,
    useGetPeopleQuery: (params: PersonQueryParams) => UseQueryResult<any[], DefaultError>
}

const personApi: PersonApiService = {
    initRequestConfig: {
         baseURL: API_BASE_URL
    },
    useGetPeopleQuery: function (params: PersonQueryParams) : UseQueryResult<Person[], DefaultError> {
            const queryFn = async () : Promise<any[]> => {
                const queryParams = queryStringParams(params);
                const { data } = await AxiosBaseQuery({ ...personApi.initRequestConfig,
                                                        url: `/getpersonwithfilter2`, 
                                                        method: 'GET',
                                                        params: queryParams }) as AxiosResponse<Person[], AxiosRequestConfig>;
                return data as Person[]; 
            }

            return useQuery({ queryKey: ['people'], 
                              queryFn,
                              retry: false,
                              refetchInterval: 0, 
                              refetchOnWindowFocus: false });
    }
}

export const { useGetPeopleQuery } = personApi;
