import { createContext, useContext } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { PersonWithPagination } from '@/modules/entity-management/@entity-types/person';


export type GetPeopleQueryHookResult = {
    data: PersonWithPagination | undefined;
    error: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUninitialized: boolean;
    isFetching: boolean;
    refetch: () => void;
};

export type FilterOptions = {
    firstName: string,
    lastName: string,
    personType: string,
    pageSize: number,
    pageNumber: number
}

export type ProfileFilterProviderState = {
    queryResult?: GetPeopleQueryHookResult,
    filterOptions: FilterOptions,
    setFilterOptions: (key: keyof FilterOptions, value: unknown) => void
}

export const entityfilterInit: ProfileFilterProviderState = {
    filterOptions: {
        firstName: '',
        lastName: '',
        personType: '',
        pageSize: 10,
        pageNumber: 1
    },
    setFilterOptions: () => {}
}

export const EntityFilterContext = createContext<ProfileFilterProviderState>(entityfilterInit);
export const useProfileFilterContext = () => useContext(EntityFilterContext);