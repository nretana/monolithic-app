import { Title } from '@mantine/core';
import { ProductTable } from '../components/ProductTable';

const ProductView = () => {
  return (
    <>
      <title> Mono App | Products</title>
      <section>
        <Title order={2} className='mb-3'>
          Products
        </Title>
        <ProductTable />
      </section>
    </>
  );
};

export default ProductView;
