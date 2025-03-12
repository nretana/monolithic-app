import React, { useState } from 'react';
import { EntityFilterContext, 
         entityfilterInit, 
         FilterOptions, 
         GetPeopleQueryHookResult } from './context/EntityFilterContext';
import { useGetPeopleQuery } from '@/modules/entity-management/store/services/PersonService2';
import { Filter } from './filter/Filter';
import { Tag } from './tag/Tag';
import { DataTable } from './data-table/DataTable';
import { Pagination } from './pagination/Pagination';


type EntityFilterProps = {
    children?: React.ReactNode
}

type EntityFilterComposition = {
    Filter: React.FC,
    Tag: React.FC,
    DataTable: React.FC,
    Pagination: React.FC
}

const EntityFilter: React.FC<EntityFilterProps> & EntityFilterComposition = (props) => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(entityfilterInit.filterOptions);
    const queryResult = useGetPeopleQuery(filterOptions) as GetPeopleQueryHookResult;

    const onUpdateFilterOptions = (key: keyof FilterOptions, value: unknown) => {
        setFilterOptions(prevState => ({ ...prevState, [key]: value }));
    }

    return(<EntityFilterContext.Provider value={{ queryResult,
                                                  filterOptions,
                                                  setFilterOptions: onUpdateFilterOptions }}>
                {props.children}
           </EntityFilterContext.Provider>)
}

export default EntityFilter;

EntityFilter.Filter = Filter;
EntityFilter.Tag = Tag;
EntityFilter.DataTable = DataTable;
EntityFilter.Pagination = Pagination;