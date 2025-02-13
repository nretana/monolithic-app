import { useQuery, UseQueryResult, DefaultError } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/modules/core/constants/api.constant';
import type { Person } from '@/modules/features/@feature-types/person';
import AxiosBaseQuery from '@/modules/core/store/services/AxiosBaseQuery';


type PersonQueryParams = {
    personId?: number
}

type PersonApiService = {
    initRequestConfig: AxiosRequestConfig,
    useGetPersonQuery: (params: PersonQueryParams) => UseQueryResult<any[], DefaultError>
}

const personApi: PersonApiService = {
    initRequestConfig: {
         baseURL: API_BASE_URL
    },
    useGetPersonQuery: function (params: PersonQueryParams) : UseQueryResult<Person[], DefaultError> {
            const queryFn = async () : Promise<any[]> => {
                const { data } = await AxiosBaseQuery({ ...personApi.initRequestConfig,
                                                        url: `/getperson`, 
                                                        method: 'GET' }) as AxiosResponse<Person[], AxiosRequestConfig>;
                return data as Person[]; 
            }

            return useQuery({ queryKey: ['people'], 
                              queryFn,
                              retry: false,
                              refetchInterval: 0, 
                              refetchOnWindowFocus: false });
    }
}

export const { useGetPersonQuery } = personApi;
