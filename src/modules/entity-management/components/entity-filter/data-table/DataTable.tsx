import React from 'react';
import { useProfileFilterContext, 
         GetPeopleQueryHookResult } from '../context/EntityFilterContext';
import { Person } from '@/modules/entity-management/@entity-types/person';
import { ERROR_MESSAGE_GENERAL_ERROR } from '@/modules/core/constants/errormessages.constant';
import { Card, Button, Table } from '@mantine/core';
import { Alert } from '@/modules/core/components/shared/alert/Alert';
import { LoadingOverlay } from '@/modules/core/components/shared/loading-overlay/LoadingOverlay';
import { UserPermissionBox } from '@/modules/core/components/shared/permission-box/UserPermissionBox';

import styles from './DataTable.module.css';


export const DataTable: React.FC = () => {

    const { queryResult } = useProfileFilterContext();
    const { data, isLoading, isFetching, isError } = queryResult as GetPeopleQueryHookResult;
    const personList = data && data.personList ? data.personList : [];

    const tableRows = <>
                        { personList.map((person: Person) =>
                            (<Table.Tr key={`row_${person.businessEntityId}`}>
                                <Table.Td>{ `${person.firstName} ${person.middleName} ${person.lastName}` }</Table.Td>
                                <Table.Td>{ person.emailAddresses && 
                                            person.emailAddresses?.length > 0 ? 
                                            person.emailAddresses[0].emailAddress1 : 'Not specified' }
                                </Table.Td>
                                <Table.Td>{person.personType}</Table.Td>
                                <Table.Td>*****4567</Table.Td>
                                <Table.Td><UserPermissionBox permission='entity-management:people:view' 
                                                            render={() => <Button type='button'>View</Button>} />
                                </Table.Td>
                            </Table.Tr>)) }
                      </>

    const noRecordsRow = <Table.Tr>
                           <Table.Td>There are no records available.</Table.Td>
                         </Table.Tr>

    return(<div className='w-full 2xl:w-9/12'>
        { isError && <Alert severity='error' className='mb-3'>{ERROR_MESSAGE_GENERAL_ERROR}</Alert>}
        <Card>
            <LoadingOverlay visible={(isFetching || isLoading) } className={styles.loading} />
            <Table.ScrollContainer minWidth={600}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Full Name</Table.Th>
                            <Table.Th>Email Address</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Principal Credit Card</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {(personList.length > 0) ? tableRows : noRecordsRow }
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Card>
    </div>)
}