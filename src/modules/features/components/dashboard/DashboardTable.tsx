import type { Person } from '@/modules/features/@feature-types/person';
import { useGetPersonQuery } from '@/modules/features/store/services/PersonService';
import { Card, Table } from '@mantine/core';
import LoadingContent from '@/modules/core/components/shared/LoadingContent';
import Alert from '@/modules/core/components/shared/alert/Alert';
import { ERROR_MESSAGE_GENERAL_ERROR } from '@/modules/core/constants/errormessages.constant';

const DashboardTable = () => {

    const { data: personList, isSuccess, isError, isLoading } = useGetPersonQuery({});

    console.log('RESPONSE: ', personList);

    const tableRows = <>
        {personList && personList.map((person: Person) => 
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
        { isLoading && <LoadingContent /> }
        { isError && <Alert severity='error'>{ERROR_MESSAGE_GENERAL_ERROR}</Alert>}
        { isSuccess && <Card>
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
                                    {personList && personList.length > 0 ? tableRows : <span>There are no records available.</span> }
                                </Table.Tbody>
                            </Table>
                       </Card>
        }
    </div>)

}

export default DashboardTable;