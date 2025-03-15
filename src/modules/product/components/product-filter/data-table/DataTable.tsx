import React from 'react';
import dayjs from 'dayjs';
import appConfig from '@/modules/core/configs/app.config';
import { ERROR_MESSAGE_GENERAL_ERROR } from '@/modules/core/constants/errormessages.constant';
import type { Product } from '@/modules/product/@product-types/product';
import { useProductFilterContext, GetProductsQueryHookResult } from '../context/ProductFilterContext';
import { Card, Button, Table } from '@mantine/core';
import Alert from '@/modules/core/components/shared/alert/Alert';
import LoadingOverlay from '@/modules/core/components/shared/loading-overlay/LoadingOverlay';
import UserPermissionBox from '@/modules/core/components/shared/permission-box/UserPermissionBox';

import styles from './DataTable.module.scss';


export const DataTable: React.FC = () => {

    const { queryResult } = useProductFilterContext();
    const { data, isLoading, isFetching, isError } = queryResult as GetProductsQueryHookResult;
    const productList = data && data.productList ? data.productList : [];

    const tableRows = <>
                        { productList.map((product: Product) =>
                            (<Table.Tr key={`row_${product.productId}`}>
                                <Table.Td>{product.name}</Table.Td>
                                <Table.Td>{product.productNumber}</Table.Td>
                                <Table.Td>{product.productModel ? product.productModel?.name : 'Not specified'}</Table.Td>
                                <Table.Td>{`${appConfig.currency.symbol}${product.listPrice}`}</Table.Td>
                                <Table.Td><UserPermissionBox permission='people:view' 
                                                            render={() => <Button type='button'>View</Button>} />
                                </Table.Td>
                            </Table.Tr>)) }
                      </>

    const noRecordsRow = <Table.Tr>
                           <Table.Td>There are no records available.</Table.Td>
                         </Table.Tr>

    return(<div className='w-full lg:w-9/12'>
        { isError && <Alert severity='error' className='mb-3'>{ERROR_MESSAGE_GENERAL_ERROR}</Alert>}
        <Card>
            <LoadingOverlay visible={(isFetching || isLoading) } className={styles.loading} />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Number</Table.Th>
                        <Table.Th>Model</Table.Th>
                        <Table.Th>List Price</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {(productList.length > 0) ? tableRows : noRecordsRow }
                </Table.Tbody>
            </Table>
        </Card>
    </div>)
}