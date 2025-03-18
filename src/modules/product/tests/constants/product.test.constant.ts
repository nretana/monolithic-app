import { API_BASE_URL } from '@/modules/core/constants/api.constant';

export const PRODUCT_PAGINATION_HEADER = { 'x-pagination': `{"totalCount":304,"totalPages":31,"pageSize":10,"currentPage":1,"hasPrevious":false,"hasNext":true}` };
export const PRODUCT_ENDPOINT = `${API_BASE_URL}/product`;