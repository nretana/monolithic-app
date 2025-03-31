import { delay, http, HttpResponse } from 'msw';
import { AppMockTestConfig } from '@/modules/core/@core-types/app-test';
import { EntityManagementFeatures, EntityManagementModule } from '@/modules/entity-management/@entity-types/entity-management-module';
import { PersonTestCases } from '@/modules/entity-management/@entity-types/person-test';
import { getJsonResponse } from '@/modules/core/tests/utils/getJsonResponse';
import { personEndpoints } from '@/modules/entity-management/configs/entityManagement.endpoints.config';
import { PERSON_PAGINATION_HEADER } from '@/modules/entity-management/tests/constants/person.test.constant';


//module => feature -> use-case
 export const personTestConfig: AppMockTestConfig<EntityManagementModule, EntityManagementFeatures, PersonTestCases> = {
    'entity-management': { //module
        people: [ //feature
            { //use-case
                testCase: 'allPeople',
                state: 'success',
                handlers: {
                    success: [http.get(`${personEndpoints.baseUrl}${personEndpoints.endpoints.getPeople}`,
                                async({ request }) => {
                                    await delay(3000);
                                    const jsonResponse = await getJsonResponse('entity-management', 'person');
                                    return HttpResponse.json(jsonResponse, { headers: PERSON_PAGINATION_HEADER });
                                })],
                    failed: [http.get(personEndpoints.endpoints.getPeople, ({ request }) => new HttpResponse(null, { status: 500 }))]
                }
            },
            {
                testCase: 'createPerson',
                state: 'failed',
                handlers: {
                    success: [],
                    failed: []
                }
            }
        ]
    }
 }
