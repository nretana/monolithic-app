import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Person, PersonWithPagination } from '@/modules/features/@feature-types/person';
import type { PersonQueryParams } from '@/modules/features/@feature-types/person.api';
import { API_BASE_URL } from '@/modules/core/constants/api.constant';
import { queryStringParams } from '@/modules/core/utils/queryStringParams';


export const PersonService2 = createApi({
    reducerPath: 'personApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['People'],
    endpoints: (builder) => ({
        getPeople: builder.query<PersonWithPagination, PersonQueryParams>({
            query: (params) => {
                const queryParams = queryStringParams(params);
                return ({ url: '/person', method: 'GET', params: queryParams })
            },
            transformResponse: (response, meta) => {
                const paginationHeader = meta?.response?.headers.get('X-Pagination') ?? '{}';
                return { personList: response, pagination: JSON.parse(paginationHeader) } as PersonWithPagination
            },
            providesTags: ['People']
        }),
        getPerson: builder.query<Person, string>({
            query: (personId) => {
                return { url: `/person/${personId}`, method: 'GET' }
            }
        }),
        addPerson: builder.mutation<any, any>({
            query: (body) => ({
                url: '/person',
                method: 'POST',
                body: JSON.stringify(body)
            })
        }),
        deletePerson: builder.mutation<unknown, string>({
            query: (personId) => ({
                url: `/person/${personId}`,
                method: 'DELETE'
            })
        })
    }),
   
    //serializeQueryArgs: ({queryArgs}) => { /*console.log("CACHE KEY:", queryArgs);*/ return 'get-people' }
});

export const { useGetPeopleQuery, useAddPersonMutation, useDeletePersonMutation } = PersonService2;