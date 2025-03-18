import React, { useCallback, useMemo } from 'react';
import { useProductFilterContext, 
         FilterOptions } from '../context/ProductFilterContext';
import { Chip } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { MAX_PRICE, MIN_PRICE } from '@/modules/product/constants/product.constant';
import { priceRangeFormat } from '@/modules/core/utils/priceRangeFormat';


type KeyTag = keyof Omit<FilterOptions, 'pageSize|pageNumber'>

type Tag = {
    label: string,
    value: KeyTag | KeyTag[]
}

const getTagList = ({ name, productNumber, productModel, startPrice, endPrice }: FilterOptions) => {
    const tagList:Tag[] = [];
    if(name.length > 0) tagList.push({ label: name, value: 'name' });
    if(productNumber.length > 0) tagList.push({ label: productNumber, value: 'productNumber' });
    if(productModel.length > 0) tagList.push({ label: productModel, value: 'productModel' });
    if((startPrice > endPrice) || (startPrice === MIN_PRICE && endPrice === MAX_PRICE)) return tagList;
    tagList.push({ label: priceRangeFormat(startPrice, endPrice), value: ['startPrice', 'endPrice'] });
    return tagList;
};

export const Tag: React.FC = () => {
    const { filterOptions, setFilterOptions } = useProductFilterContext();
    const tagList = getTagList(filterOptions);

    const resetTag = useCallback((key: KeyTag) => { 
        switch(key){
            case 'startPrice':
                setFilterOptions(key, MIN_PRICE);
            break;
            case 'endPrice':
                setFilterOptions(key, MAX_PRICE);
            break;
            default:
                setFilterOptions(key, '')
            break;
        }
    }, []);

    const onResetTag = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        const values = e.currentTarget.value;
        values.length > 0 && values.split(',').forEach((keyTag) => resetTag(keyTag as KeyTag));
    }, []);

    const onKeyDownTag = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        const curentTagKeys = e.currentTarget.value as KeyTag;
        curentTagKeys.length > 0 && curentTagKeys.split(',').forEach((keyTag) => resetTag(keyTag as KeyTag));
    }, []);

    return(<>
            { tagList.length > 0 &&
            <div className='w-full lg:w-9/12 flex mb-3'>
                { tagList.map((tag, index) => tag.label && 
                                              tag.label.toString().length > 0 && 
                                              <Chip key={`tag_${tag.value}_${index}`}
                                                    icon={<IconX />} 
                                                    variant='light' 
                                                    checked
                                                    className='mr-3'
                                                    value={tag.value}
                                                    onClick={onResetTag} 
                                                    onKeyDown={onKeyDownTag}>{tag.label}</Chip>) }
            </div> }
           </>)
}