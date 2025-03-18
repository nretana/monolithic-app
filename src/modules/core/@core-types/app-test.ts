import { HttpHandler } from 'msw';
import { AppFeatures, AppModules } from './app-modules';
import { ProductTestCases } from '@/modules/product/@product-types/product-test';
import { AuthTestCases } from '@/modules/auth/@auth-types/auth-test';

export type AppTestCases = ProductTestCases | AuthTestCases;

export type AppTestState = 'success' | 'failed';

export type AppTestCase<T extends AppTestCases> = {
    testCase: T,
    state: AppTestState,
    handlers: {
        success: HttpHandler[],
        failed: HttpHandler[]
    }
}

export type AppMockTestConfig<Module extends AppModules, Feature extends AppFeatures, TestCases extends AppTestCases> = Partial<{
    [key in Module]: Partial<{ 
        [key in Feature]: AppTestCase<TestCases>[]
     }>
}>;