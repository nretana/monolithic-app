import { appTestConfig } from '../app.test.config';

/*const flatHandlers = (config: any) => {
    const result: any = [];

    const flat = (obj2: any) => {
       
    }

    const arrConfig = Object.entries(config);
    //flat(config);
}

flatHandlers(appTestConfig);*/

const handlers =  Object.values(appTestConfig)
                        .map((values) => Object.values(values).flat())
                        .map(item => item.map(i => Object.values(i).flat()).flat()).flat()
                        .map((testCase: any) => testCase?.handlers[testCase.state]).flat();

console.log('current handlers', handlers);

export const allHandlers = [...handlers];