import { AcceptType, ContentType } from '@/modules/core/@core-types/core-api';

export type PersonEndpoint = {
    baseUrl: string,
    headers?: {
        'Accept': AcceptType,
        'Content-Type': ContentType
    },
    endpoints: {
        getPeople: string,
        getPerson: (personId: string) => string,
        addPerson: string,
        deletePerson: (personId: string) => string
    }
}