
export type Pagination = {
    totalCount: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    hasPrevious: boolean,
    hasNext: boolean
}

export type PersonQueryParams = {
    firstName?: string,
    lastName?: string,
    personType?: string,
    pageSize?: number,
    pageNumber?: number
}