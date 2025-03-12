import React from 'react';
import EntityFilter from './entity-filter/EntityFilter';

const EntityManagement: React.FC = () => {

    return(<>
        <EntityFilter>
            <EntityFilter.Filter />
            <EntityFilter.Tag />
            <EntityFilter.DataTable />
            <EntityFilter.Pagination />
        </EntityFilter>
    </>)
}

export default EntityManagement;