import { appTestConfig } from '../app.test.config';


const handlers =  Object.values(appTestConfig)
                        .map((values) => Object.values(values).flat())
                        .map(item => item.map(i => Object.values(i).flat()).flat()).flat()
                        .map((testCase: any) => testCase?.handlers[testCase.state]).flat();

export const allHandlers = [...handlers];