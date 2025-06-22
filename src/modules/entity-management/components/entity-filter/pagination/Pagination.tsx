import React from 'react';
import {
  useProfileFilterContext,
  GetPeopleQueryHookResult,
} from '../context/EntityFilterContext';
import { PAGE_SIZE_LIST } from '@/modules/entity-management/constants/entityManagement.constant';
import { Pagination as MantinePagination, Select, Group } from '@mantine/core';

export const Pagination: React.FC = () => {
  const { filterOptions, setFilterOptions } = useProfileFilterContext();
  const { queryResult } = useProfileFilterContext();
  const { data, isFetching } = queryResult as GetPeopleQueryHookResult;
  const totalCount = data && data?.pagination ? data.pagination.totalCount : 0;
  const totalPages = data && data?.pagination ? data.pagination.totalPages : 1;
  const currentPage =
    data && data?.pagination ? data.pagination.currentPage : 1;

  const onChangePageSize = (value: string | null) => {
    if (value === null) return;
    setFilterOptions('pageSize', value);
  };

  return (
    <>
      <div className='flex justify-between w-full 2xl:w-9/12 relative mt-3'>
        <div className='self-center hidden md:block'>
          <span className='font-semibold mr-1'>{totalCount}</span>
          <span>{`${totalCount === 1 ? 'record' : 'records'} found`}</span>
        </div>
        <MantinePagination.Root
          total={totalPages}
          value={currentPage}
          siblings={-1}
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
          onChange={onChangePageSize}
          value={filterOptions.pageSize.toString()}
          disabled={isFetching}
        />
      </div>
    </>
  );
};
