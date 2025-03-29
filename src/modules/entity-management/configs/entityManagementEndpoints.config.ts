import { PersonEndpoint } from '@/modules/entity-management/@entity-types/person-endpoint';
import { API_BASE_URL, CONTENT_TYPE_JSON } from '@/modules/core/constants/api.constant';


export const personEndpoints: PersonEndpoint = {
    baseUrl: API_BASE_URL,
    headers: {
         'Accept': CONTENT_TYPE_JSON,
         'Content-Type': CONTENT_TYPE_JSON
    },
    endpoints: {
        getPeople: '/person',
        getPerson: (personId: string) => `/person/${personId}`,
        addPerson: '/person',
        deletePerson: (personId: string) => `/person/${personId}`,
    }
}