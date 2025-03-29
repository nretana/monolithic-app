import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { MAX_PRICE, MIN_PRICE, PAGE_SIZE_LIST } from '@/modules/product/constants/product.constant';
import { useProductFilterContext, 
         FilterOptions, 
         GetProductsQueryHookResult } from '../context/ProductFilterContext';
import { useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { PriceRange } from '@/modules/core/components/template/price-range/PriceRange';

import styles from './Filter.module.css';


export const Filter: React.FC = () => {
    const { queryResult, filterOptions, setFilterOptions } = useProductFilterContext();
    const { isLoading, isFetching } = queryResult as GetProductsQueryHookResult;

    const productFilterForm = useForm<FilterOptions>({
        initialValues: { ...filterOptions }
    });

    const onSubmitProductFilterForm = useCallback(() => queryResult?.refetch() , []);

    const onKeyDownName = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        setFilterOptions('name', productFilterForm.values.name);
        onSubmitProductFilterForm();
    },  [productFilterForm.values.name]);

    const onKeyDownProductNumber = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        setFilterOptions('productNumber', productFilterForm.values.productNumber);
        onSubmitProductFilterForm();
    }, [productFilterForm.values.productNumber]);

    const onKeyDownProductModel = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        setFilterOptions('productModel', productFilterForm.values.productModel);
        onSubmitProductFilterForm();
    }, [productFilterForm.values.productModel]);

    const onSetPriceRange = useCallback((values: [number, number]) => {
        const [startprice, endPrice] = values;
        setFilterOptions('startPrice', startprice);
        setFilterOptions('endPrice', endPrice);
    }, []);

    const onResetPriceRange = useCallback(() => onSetPriceRange([MIN_PRICE, MAX_PRICE]), []);

    useEffect(() => { //runs when removing tags
        productFilterForm.setFieldValue('name', filterOptions.name);
        productFilterForm.setFieldValue('productNumber', filterOptions.productNumber);
        productFilterForm.setFieldValue('productModel', filterOptions.productModel);
        //productFilterForm.setFieldValue('startPrice', MIN_PRICE);
        //productFilterForm.setFieldValue('endPrice', MAX_PRICE);

    }, [filterOptions.name,
        filterOptions.productModel,
        filterOptions.productNumber,
        filterOptions.startPrice,
        filterOptions.endPrice]);

    return(<>
                <form className={clsx(styles['filter-options'], 'w-full', '2xl:w-9/12', 'mb-3')}>
                    <fieldset className='flex flex-wrap' disabled={(isFetching || isLoading)}>
                        <div className='mr-3'>
                            <TextInput label='Name'
                                    key={productFilterForm.key('name')} 
                                    {...productFilterForm.getInputProps('name')}
                                    onKeyDown={onKeyDownName}
                                    width={185} />
                        </div>
                        <div className='mr-3'>
                            <TextInput label='Product Number'
                                    key={productFilterForm.key('productNumber')} 
                                    {...productFilterForm.getInputProps('productNumber')}
                                    onKeyDown={onKeyDownProductNumber}
                                    width={185} />
                        </div>
                        <div className='mr-3'>
                            <TextInput label='Product Model'
                                    key={productFilterForm.key('productModel')} 
                                    {...productFilterForm.getInputProps('productModel')}
                                    onKeyDown={onKeyDownProductModel}
                                    width={185} />
                        </div>
                        <div className='mr-3'>
                            <PriceRange minRange={MIN_PRICE}
                                        min={MIN_PRICE}
                                        max={MAX_PRICE}
                                        value={[filterOptions.startPrice, filterOptions.endPrice]}
                                        width={185} 
                                        onReset={onResetPriceRange}
                                        onClose={onSetPriceRange} />
                        </div>
                    </fieldset>
                </form>
        </>)
}