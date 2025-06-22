import React, { useCallback, useEffect } from 'react';
import {
  useProductFilterContext,
  GetProductsQueryHookResult,
} from '../context/ProductFilterContext';
import { PAGE_SIZE_LIST } from '@/modules/product/constants/product.constant';
import { Pagination as MantinePagination, Select, Group } from '@mantine/core';

export const Pagination: React.FC = () => {
  const { filterOptions, queryResult, setFilterOptions } =
    useProductFilterContext();
  const { data, isFetching } = queryResult as GetProductsQueryHookResult;

  const totalCount = data && data?.pagination ? data.pagination.totalCount : 0;
  const totalPages = data && data?.pagination ? data.pagination.totalPages : 1;
  const currentPage =
    data && data?.pagination ? data.pagination.currentPage : 1;

  const onChangePageSize = useCallback((value: string | null) => {
    if (value === null) return;
    setFilterOptions('pageSize', value);
    setFilterOptions('pageNumber', 1);
  }, []);

  const resetPagination = useCallback(() => {
    setFilterOptions('pageNumber', 1);
    setFilterOptions('pageSize', PAGE_SIZE_LIST[0]);
  }, []);

  useEffect(() => {
    resetPagination();
  }, [
    filterOptions.name,
    filterOptions.productNumber,
    filterOptions.productModel,
    filterOptions.startPrice,
    filterOptions.endPrice,
  ]);

  return (
    <>
      <div className='flex flex-wrap justify-between w-full 2xl:w-9/12 relative mt-3'>
        <div className='self-center hidden md:block'>
          <span className='font-semibold mr-1'>{totalCount}</span>
          <span>{`${totalCount === 1 ? 'record' : 'records'} found`}</span>
        </div>
        <MantinePagination.Root
          total={totalPages}
          value={currentPage}
          siblings={0}
          className='sm:mb-0 md:mb-0'
          onChange={(value) => setFilterOptions('pageNumber', value)}
          disabled={isFetching}
        >
          <Group gap={5} justify='center'>
            <MantinePagination.Previous aria-label='Go to previous page' />
            <MantinePagination.Items />
            <MantinePagination.Next aria-label='Go to next page' />
          </Group>
        </MantinePagination.Root>
        <Select
          placeholder='List page'
          data={PAGE_SIZE_LIST}
          className='ml-0 md:ml-3 w-[100px]'
          onChange={onChangePageSize}
          value={filterOptions.pageSize.toString()}
          disabled={isFetching}
        />
      </div>
    </>
  );
};
