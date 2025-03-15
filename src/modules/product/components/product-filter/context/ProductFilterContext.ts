import { createContext, useContext } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ProductWithPagination } from '@/modules/product/@product-types/product';
import { MAX_PRICE, MIN_PRICE, PAGE_SIZE_LIST } from '@/modules/product/constants/product.constant';


export type GetProductsQueryHookResult = {
    data: ProductWithPagination | undefined;
    error: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUninitialized: boolean;
    isFetching: boolean;
    refetch: () => void;
};

export type FilterOptions = {
    name: string,
    productNumber: string,
    productModel: string,
    startPrice: number,
    endPrice: number,
    pageSize: number,
    pageNumber: number
}

export type ProductFilterProviderState = {
    queryResult?: GetProductsQueryHookResult,
    filterOptions: FilterOptions,
    setFilterOptions: (key: keyof FilterOptions, value: unknown) => void
}

export const productfilterInit: ProductFilterProviderState = {
    filterOptions: {
        name: '',
        productModel: '',
        productNumber: '',
        startPrice: MIN_PRICE,
        endPrice: MAX_PRICE,
        pageSize: Number(PAGE_SIZE_LIST[0]),
        pageNumber: 1
    },
    setFilterOptions: () => {}
}

export const ProductFilterContext = createContext<ProductFilterProviderState>(productfilterInit);
export const useProductFilterContext = () => useContext(ProductFilterContext);