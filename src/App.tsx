import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from 'react-oidc-context';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { theme } from '@/modules/core/configs/theme.config';
import { ssoConfig } from './modules/auth/config/sso.config';
import { allRoutes } from '@/modules/core/components/route/AppRouter';
import store, { persistor } from '@/modules/core/store/index';
import { Notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Profiler } from 'react';

import './App.scss';


const queryClient = new QueryClient();
dayjs.extend(relativeTime);

const onRenderprofiler = (id:any, phase:any, actualDuration:any, baseDuration:any, startTime:any, commitTime:any) => {
  console.log(id, 'phase:', phase, 'actualDuration:', actualDuration, 'baseDuration: ',baseDuration);
}

{/* <Profiler id="App" onRender={onRenderprofiler}> */}
/* </Profiler> */
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider {...ssoConfig}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <MantineProvider theme={theme}>
              <Notifications />
              <RouterProvider
                router={allRoutes}
                future={{ v7_startTransition: true }}
              />
            </MantineProvider>
          </PersistGate>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
