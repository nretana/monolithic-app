
export type Pagination = {
    totalCount: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    hasPrevious: boolean,
    hasNext: boolean
}

export type ProductQueryParams = {
    Name?: string,
    productNumber?: string,
    startPrice?: number,
    endPrice?: number,
    productModel?: string,
    pageSize?: number,
    pageNumber?: number
}