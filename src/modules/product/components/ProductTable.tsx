import ProductFilter from './product-filter/ProductFilter';

export const ProductTable = () => {
  return (
    <>
      <ProductFilter>
        <ProductFilter.Filter />
        <ProductFilter.Tag />
        <ProductFilter.DataTable />
        <ProductFilter.Pagination />
      </ProductFilter>
    </>
  );
};
