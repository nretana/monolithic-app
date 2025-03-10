import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { ProfileFilterContext, 
         profilefilterInit, 
         useProfileFilterContext, 
         FilterOptions, 
         GetPeopleQueryHookResult } from './context/ProfileFilterContext';
import { useGetPeopleQuery } from '@/modules/features/store/services/PersonService2';
import { Person, PersonWithPagination } from '@/modules/features/@feature-types/person';
import { ERROR_MESSAGE_GENERAL_ERROR } from '@/modules/core/constants/errormessages.constant';
import { PAGE_SIZE_LIST, PERSON_TYPE_LIST } from '@/modules/features/constants/features.constant';
import { useForm } from '@mantine/form';
import { Card, Chip, Button, Pagination as MantinePagination, Select, Table, TextInput } from '@mantine/core';
import LoadingContent from '@/modules/core/components/shared/LoadingContent';
import Alert from '@/modules/core/components/shared/alert/Alert';
import LoadingOverlay from '@/modules/core/components/shared/loading-overlay/LoadingOverlay';
import { IconX } from '@tabler/icons-react';

import './ProfileFilterProvider.scss';


type ProfileFilterProviderProps = {
    children?: React.ReactNode
}

type ProfileFilterComposition = {
    Filters: React.FC,
    Tags: React.FC,
    DataTable: React.FC,
    Pagination: React.FC
}

const ProfileFilterProvider: React.FC<ProfileFilterProviderProps> & ProfileFilterComposition = (props) => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(profilefilterInit.filterOptions);
    const queryResult = useGetPeopleQuery(filterOptions) as GetPeopleQueryHookResult;

    const onUpdateFilterOptions = (key: keyof FilterOptions, value: unknown) => {
        setFilterOptions(prevState => ({ ...prevState, [key]: value }));
    }

    return(<ProfileFilterContext.Provider value={{ queryResult,
                                                   filterOptions,
                                                   setFilterOptions: onUpdateFilterOptions }}>
                {props.children}
           </ProfileFilterContext.Provider>)
}

export default ProfileFilterProvider;


const Filters = () => {
    const { queryResult, filterOptions, setFilterOptions } = useProfileFilterContext();
    const { isLoading, isFetching } = queryResult as GetPeopleQueryHookResult;

    const profileFilterForm = useForm<FilterOptions>({
        initialValues: { ...filterOptions }
    });

    const onSubmitProfileFilterForm = () => {
        setFilterOptions('firstName', profileFilterForm.values.firstName);
        setFilterOptions('lastName', profileFilterForm.values.lastName);
        setFilterOptions('personType', profileFilterForm.values.personType);
        queryResult?.refetch();
    }

    useEffect(() => {
        profileFilterForm.setFieldValue('firstName', filterOptions.firstName);
        profileFilterForm.setFieldValue('lastName', filterOptions.lastName);
        profileFilterForm.setFieldValue('personType', filterOptions.personType);
    }, [filterOptions.firstName, filterOptions.lastName, filterOptions.personType]);

    return(<>
            <div>
                <form className={clsx('w-6/12', 'my-3')} onSubmit={profileFilterForm.onSubmit(onSubmitProfileFilterForm)}>
                    {/* <LoadingOverlay visible={(isFetching && !isLoading) } className='loading' /> */}
                    <fieldset className={clsx('filter-options')} disabled={(isFetching || isLoading)}>
                        <div className='filter-item'>
                            <TextInput label='Name' 
                                    key={profileFilterForm.key('firstName')} 
                                    {...profileFilterForm.getInputProps('firstName')} />
                        </div>
                        <div className='filter-item'>
                            <TextInput label='Last Name'
                                    key={profileFilterForm.key('lastName')} 
                                    {...profileFilterForm.getInputProps('lastName')} />
                        </div>
                        <div className='filter-item'>
                        <Select label='Type'
                                placeholder='Person type'
                                key={profileFilterForm.key('personType')} 
                                data={PERSON_TYPE_LIST}
                                {...profileFilterForm.getInputProps('personType')} />
                                
                        </div>
                        <Button type='submit'>Search</Button>
                    </fieldset>
                </form>
           </div>
        </>)
}

type KeyTag = keyof Omit<FilterOptions, 'pageSize|pageNumber'>

type Tag = {
    label: string,
    value: KeyTag
}

const Tags = () => {
    const { filterOptions, setFilterOptions } = useProfileFilterContext();
    const tagList:Tag[] = [{ label: filterOptions.firstName, value: 'firstName' },
                           { label: filterOptions.lastName, value: 'lastName' }];
   
    if(filterOptions.personType.length > 0){
        const personTypeLabel = PERSON_TYPE_LIST.find(item => item.value === filterOptions.personType && filterOptions.personType.length > 0)?.label;
        personTypeLabel && tagList.push({ label: personTypeLabel, value:'personType' })
    }

    const resetTag = (key: KeyTag) => setFilterOptions(key, '');
                           
    const onResetTag = (e: React.MouseEvent<HTMLInputElement>) => {
        const curentTagKey = e.currentTarget.value as KeyTag;
        resetTag(curentTagKey);
    }

    const onKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            const curentTagKey = e.currentTarget.value as KeyTag;
            resetTag(curentTagKey);
        }
    }

    return(<>
            <div className='flex mb-3'>
                { tagList.map((tag) => tag.label && 
                                       tag.label.toString().length > 0 && 
                                       <Chip icon={<IconX />} 
                                             variant='light' 
                                             defaultChecked={true}
                                             className='mr-2'
                                             value={tag.value}
                                             onClick={onResetTag} 
                                             onKeyDown={onKeyDownTag}>{tag.label}</Chip>) }
            </div>
           </>)
}


const DataTable = () => {

    const { queryResult } = useProfileFilterContext();
    const { data, isLoading, isFetching, isError } = queryResult as GetPeopleQueryHookResult;
    const personList = data && data.personList ? data.personList : [];

    const tableRows = <>
        {personList.map((person: Person) => 
            (<Table.Tr key={`row_${person.businessEntityId}`}>
                <Table.Td>{ `${person.firstName} ${person.middleName} ${person.lastName}` }</Table.Td>
                <Table.Td>{ person.emailAddresses && 
                            person.emailAddresses?.length > 0 ? 
                            person.emailAddresses[0].emailAddress1 : 'Not specified' }
                </Table.Td>
                <Table.Td>{person.personType}</Table.Td>
                <Table.Td>*****4567</Table.Td>
            </Table.Tr>)) }
    </>

    return(<div className='w-6/12'>
        {/* { (isLoading) && <LoadingContent /> } */}
        { isError && <Alert severity='error' className='mb-3'>{ERROR_MESSAGE_GENERAL_ERROR}</Alert>}
        <Card>
            <LoadingOverlay visible={(isFetching || isLoading) } className='loading' />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Full Name</Table.Th>
                        <Table.Th>Email Address</Table.Th>
                        <Table.Th>Type</Table.Th>
                    <Table.Th> Principal Credit Card</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {(personList.length > 0) ? tableRows : <span>There are no records available.</span> }
                </Table.Tbody>
            </Table>
        </Card>
    </div>)
}

const Pagination = () => {
    const { filterOptions, setFilterOptions } = useProfileFilterContext();
    const { queryResult } = useProfileFilterContext();
    const { data, isFetching } = queryResult as GetPeopleQueryHookResult;
    const totalCount = data && data?.pagination ? data.pagination.totalCount : 1;
    const totalPages = data && data?.pagination ? data.pagination.totalPages : 1;
    const currentPage = data && data?.pagination ? data.pagination.currentPage : 1;

    const onChangePageSize = (value: string | null) => {
        if(value === null) return;
        setFilterOptions('pageSize', value);
    };
    
    return(<div>
            <div className='w-6/12 flex justify-between relative mt-3'>
                <div className='self-center'>
                    <span className='font-semibold mr-1'>{totalCount}</span>
                    <span>{`${totalCount === 1 ? 'record' : 'records' } found`}</span>
                </div>
                <MantinePagination total={totalPages} 
                                value={currentPage} 
                                onChange={(value) => setFilterOptions('pageNumber', value)} disabled={isFetching} />
                
                <Select placeholder='List page'
                        data={PAGE_SIZE_LIST}
                        onChange={onChangePageSize}
                        value={filterOptions.pageSize.toString()}
                        disabled={isFetching} />
            </div>
          </div>)
}

ProfileFilterProvider.Filters = Filters;
ProfileFilterProvider.Tags = Tags;
ProfileFilterProvider.DataTable = DataTable;
ProfileFilterProvider.Pagination = Pagination;