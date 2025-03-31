import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useProfileFilterContext, 
         FilterOptions, 
         GetPeopleQueryHookResult } from '../context/EntityFilterContext';
import { PERSON_TYPE_LIST } from '@/modules/entity-management/constants/entityManagement.constant';
import { useForm } from '@mantine/form';
import { Select, TextInput } from '@mantine/core';

import styles from './Filter.module.css';


export const Filter: React.FC = () => {
    const { queryResult, filterOptions, setFilterOptions } = useProfileFilterContext();
    const { isLoading, isFetching } = queryResult as GetPeopleQueryHookResult;

    const profileFilterForm = useForm<FilterOptions>({
        initialValues: { ...filterOptions }
    });

    const onSubmitProfileFilterForm = () => queryResult?.refetch();

    const onKeyDownFirstName = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        setFilterOptions('firstName', profileFilterForm.values.firstName);
        onSubmitProfileFilterForm();
    }

    const onKeyDownLastName = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        setFilterOptions('lastName', profileFilterForm.values.lastName);
        onSubmitProfileFilterForm();
    }

    const onChangePersonType = (value: string | null) => {
        if(value == null) return;
        setFilterOptions('personType', value);
    }

    useEffect(() => { //runs when removing tags
        profileFilterForm.setFieldValue('firstName', filterOptions.firstName);
        profileFilterForm.setFieldValue('lastName', filterOptions.lastName);
        profileFilterForm.setFieldValue('personType', filterOptions.personType);
    }, [filterOptions.firstName, filterOptions.lastName, filterOptions.personType]);

    return(<>
                <form className={clsx(styles['filter-options'], 'w-full', '2xl:w-9/12 mb-3')}>
                    <fieldset className='flex' disabled={(isFetching || isLoading)}>
                        <div className='mr-2'>
                            <TextInput label='Name' 
                                    key={profileFilterForm.key('firstName')} 
                                    {...profileFilterForm.getInputProps('firstName')}
                                    onKeyDown={onKeyDownFirstName} />
                        </div>
                        <div className='mr-2'>
                            <TextInput label='Last Name'
                                    key={profileFilterForm.key('lastName')} 
                                    {...profileFilterForm.getInputProps('lastName')}
                                    onKeyDown={onKeyDownLastName} />
                        </div>
                        <div className='mr-2'>
                            <Select label='Type'
                                    placeholder='Person type'
                                    key={profileFilterForm.key('personType')} 
                                    data={PERSON_TYPE_LIST}
                                    {...profileFilterForm.getInputProps('personType')}
                                    onChange={onChangePersonType} />
                        </div>
                    </fieldset>
                </form>
        </>)
}