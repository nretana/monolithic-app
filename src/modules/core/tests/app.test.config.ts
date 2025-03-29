import { authTestConfig } from '@/modules/auth/tests/config/auth.test.config';
import { personTestConfig } from '@/modules/entity-management/tests/config/person.test.config';
import { productTestConfig } from '@/modules/product/tests/config/product.test.config';

export const appTestConfig = [authTestConfig, productTestConfig, personTestConfig];