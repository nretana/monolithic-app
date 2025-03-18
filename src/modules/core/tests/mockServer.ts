import { setupWorker } from 'msw/browser';
import { allHandlers } from './handlers/handlers';


export const mockServer = () => {
    const worker = setupWorker(...allHandlers);

    /*beforeAll( () => server.listen({ onUnhandledRequest: 'warn' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());*/
    
    return worker;
}