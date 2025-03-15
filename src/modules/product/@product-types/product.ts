import { Pagination } from './product.api'

export type ProductModel = {
    productModelId: number,
    name: string,
    catalogDescription: null,
    instructions: null,
    modifiedDate: Date,
}

export type Product = {
    productId: number,
    name: string,
    productNumber: string | null,
    makeFlag: boolean,
    finishedGoodsFlag: boolean,
    color: string | null,
    safetyStockLevel: number,
    reorderPoint: number,
    standardCost: number,
    listPrice: number,
    size: string | null,
    sizeUnitMeasureCode: string | null,
    weightUnitMeasureCode: string | null,
    weight: number,
    daysToManufacture: number
    productLine: string | null,
    class: string | null,
    style: string | null,
    productSubcategoryId: number,
    productModelId: number,
    sellStartDate: Date | null,
    sellEndDate: Date | null,
    discontinuedDate: Date | null,
    modifiedDate: Date,
    productModel: ProductModel
}

export type ProductWithPagination = {
    productList: Product[],
    pagination: Pagination
}