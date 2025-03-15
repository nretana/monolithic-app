import React, { useState } from 'react';
import { ProductFilterContext, 
         productfilterInit, 
         FilterOptions, 
         GetProductsQueryHookResult } from './context/ProductFilterContext';
import { useGetProductsQuery } from '@/modules/product/store/services/ProductService';
import { Filter } from './filter/Filter';
import { Tag } from './tag/Tag';
import { DataTable } from './data-table/DataTable';
import { Pagination } from './pagination/Pagination';


type ProductFilterProps = {
    children?: React.ReactNode
}

type ProductFilterComposition = {
    Filter: React.FC,
    Tag: React.FC,
    DataTable: React.FC,
    Pagination: React.FC
}

const ProductFilter: React.FC<ProductFilterProps> & ProductFilterComposition = (props) => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(productfilterInit.filterOptions);
    const queryResult = useGetProductsQuery(filterOptions) as GetProductsQueryHookResult;

    const onUpdateFilterOptions = (key: keyof FilterOptions, value: unknown) => {
        setFilterOptions(prevState => ({ ...prevState, [key]: value }));
    }

    return(<ProductFilterContext.Provider value={{ queryResult,
                                                   filterOptions,
                                                   setFilterOptions: onUpdateFilterOptions }}>
                {props.children}
           </ProductFilterContext.Provider>)
}

export default ProductFilter;

ProductFilter.Filter = Filter;
ProductFilter.Tag = Tag;
ProductFilter.DataTable = DataTable;
ProductFilter.Pagination = Pagination;