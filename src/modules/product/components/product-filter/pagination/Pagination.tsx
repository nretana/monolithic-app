import React, { useCallback, useEffect } from 'react';
import { useProductFilterContext, 
         GetProductsQueryHookResult } from '../context/ProductFilterContext';
import { PAGE_SIZE_LIST } from '@/modules/product/constants/product.constant';
import { Pagination as MantinePagination, Select } from '@mantine/core';


export const Pagination: React.FC = () => {
    const { filterOptions, queryResult, setFilterOptions } = useProductFilterContext();
    const { data, isFetching } = queryResult as GetProductsQueryHookResult;

    const totalCount = data && data?.pagination ? data.pagination.totalCount : 0;
    const totalPages = data && data?.pagination ? data.pagination.totalPages : 1;
    const currentPage = data && data?.pagination ? data.pagination.currentPage : 1;

    const onChangePageSize = useCallback((value: string | null) => {
        if(value === null) return;
        setFilterOptions('pageSize', value);
        setFilterOptions('pageNumber', 1);
    }, []);

    const resetPagination = useCallback(() => {
        setFilterOptions('pageNumber', 1);
        setFilterOptions('pageSize', PAGE_SIZE_LIST[0]);
    }, []);

    useEffect(() => { 
        resetPagination();
    }, [filterOptions.name, 
        filterOptions.productNumber, 
        filterOptions.productModel, 
        filterOptions.startPrice, 
        filterOptions.endPrice]);
    
    return(<>
            <div className='flex flex-wrap justify-between w-full xl:w-9/12 relative mt-3'>
                <div className='self-center'>
                    <span className='font-semibold mr-1'>{totalCount}</span>
                    <span>{`${totalCount === 1 ? 'record' : 'records' } found`}</span>
                </div>
                <MantinePagination total={totalPages}
                                   value={currentPage}
                                   className='sm:mb-0 md:mb-0'
                                   onChange={(value) => setFilterOptions('pageNumber', value)} disabled={isFetching} />
                
                <Select placeholder='List page'
                        data={PAGE_SIZE_LIST}
                        className='ml-0 md:ml-3'
                        onChange={onChangePageSize}
                        value={filterOptions.pageSize.toString()}
                        disabled={isFetching} />
            </div>
           </>)
}