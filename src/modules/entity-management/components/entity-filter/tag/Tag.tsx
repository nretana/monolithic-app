import React from 'react';
import { useProfileFilterContext, 
         FilterOptions } from '../context/EntityFilterContext';
import { PERSON_TYPE_LIST } from '@/modules/entity-management/constants/entityManagement.constant';
import { Chip } from '@mantine/core';
import { IconX } from '@tabler/icons-react';


type KeyTag = keyof Omit<FilterOptions, 'pageSize|pageNumber'>

type Tag = {
    label: string,
    value: KeyTag
}

export const Tag: React.FC = () => {
    const { filterOptions, setFilterOptions } = useProfileFilterContext();
    const tagList:Tag[] = [];
    if(filterOptions.firstName.length > 0) tagList.push({ label: filterOptions.firstName, value: 'firstName' });
    if(filterOptions.lastName.length > 0) tagList.push({ label: filterOptions.lastName, value: 'lastName' });
    if(filterOptions.personType.length > 0){
        const personTypeLabel = PERSON_TYPE_LIST.find(item => 
                                item.value === filterOptions.personType && 
                                filterOptions.personType.length > 0)?.label;
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
            { tagList.length > 0 &&
            <div className='w-full 2xl:w-9/12 flex mb-3'>
                { tagList.map((tag, index) => tag.label && 
                                              tag.label.toString().length > 0 && 
                                              <Chip key={`tag_${tag.value}_${index}`}
                                                    icon={<IconX />} 
                                                    variant='light' 
                                                    defaultChecked={true}
                                                    className='mr-3'
                                                    value={tag.value}
                                                    onClick={onResetTag} 
                                                    onKeyDown={onKeyDownTag}>{tag.label}</Chip>) }
            </div> }
           </>)
}