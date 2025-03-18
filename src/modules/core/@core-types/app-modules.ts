import { AuthModule, AuthFeatures } from '@/modules/auth/@auth-types/auth-module';
import { EntityManagementFeatures, EntityManagementModule } from '@/modules/entity-management/@entity-types/entity-management-module';
import { ProductModule, ProductFeatures } from '@/modules/product/@product-types/product-module';


export type AppModules = EntityManagementModule | AuthModule | ProductModule;
export type AppFeatures = EntityManagementFeatures | AuthFeatures | ProductFeatures;