import { createApi } from '@reduxjs/toolkit/query/react';
import type { Person, PersonWithPagination } from '@/modules/entity-management/@entity-types/person';
import type { PersonQueryParams } from '@/modules/entity-management/@entity-types/person.api';
import { queryStringParams } from '@/modules/core/utils/queryStringParams';
import { axiosBaseQuery } from '@/modules/core/store/services/RtkQueryService';
import { personEndpoints } from '@/modules/entity-management/configs/entityManagement.endpoints.config';


export const PersonService2 = createApi({
    reducerPath: 'personApi',
    baseQuery: axiosBaseQuery({
        baseURL: personEndpoints.baseUrl, 
        timeout: 60000,
        headers: personEndpoints.headers
    }),
    tagTypes: ['People'],
    endpoints: (builder) => ({
        getPeople: builder.query<PersonWithPagination, PersonQueryParams>({
            query: (params) => {
                const queryParams = queryStringParams(params);
                return ({ url: personEndpoints.endpoints.getPeople, method: 'GET', params: queryParams })
            },
            transformResponse: (response: any, meta: any) => {
                const paginationHeader = meta?.headers['x-pagination'] ?? '{}';
                return { personList: response, pagination: JSON.parse(paginationHeader) } as PersonWithPagination
            },
            providesTags: ['People']
        }),
        getPerson: builder.query<Person, string>({
            query: (personId) => {
                return { url: personEndpoints.endpoints.getPerson(personId), method: 'GET' }
            }
        }),
        addPerson: builder.mutation<any, any>({
            query: (body) => ({
                url: personEndpoints.endpoints.addPerson,
                method: 'POST',
                body: JSON.stringify(body)
            })
        }),
        deletePerson: builder.mutation<unknown, string>({
            query: (personId) => ({
                url: personEndpoints.endpoints.getPerson(personId),
                method: 'DELETE'
            })
        })
    }),
    keepUnusedDataFor: 0
   
    //serializeQueryArgs: ({queryArgs}) => { /*console.log("CACHE KEY:", queryArgs);*/ return 'get-people' }
});

export const { useGetPeopleQuery, useAddPersonMutation, useDeletePersonMutation } = PersonService2;