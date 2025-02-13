import { DefaultError, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/modules/core/constants/api.constant';
import AxiosBaseQuery from './AxiosBaseQuery';
import { Notification } from '@/modules/core/@core-types/notification';

type UserNotificationParams = {
    userId: string
}

type CoreApiService = {
    initRequestConfig: AxiosRequestConfig,
    useGetUserNotificationQuery: (params: UserNotificationParams) => UseQueryResult<Notification[], DefaultError>
}

const coreApi : CoreApiService = {
    initRequestConfig: {
        baseURL: `${API_BASE_URL}/notifications`
    },
    useGetUserNotificationQuery: function(params: UserNotificationParams) : UseQueryResult<any[], DefaultError> {

        const queryFn = async (): Promise<any[]> => {
            const { data } = await AxiosBaseQuery({ ...coreApi.initRequestConfig,
                                                    url: `/getnotification`,
                                                    params,
                                                    method: 'GET' }) as AxiosResponse<Notification[], AxiosRequestConfig>;
            return data as Notification[];
        }

        return useQuery({ queryKey: ['notification'],
                          queryFn, 
                          retry: false,
                          refetchInterval: 0,
                          refetchOnWindowFocus: false });
    }
}