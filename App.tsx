import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from 'styled-components';
import theme from './src/theme';
import './src/translations/index';
import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from 'react-query';
import StackNavigationWithLoader from './src/context/loaderContext';
import AuthContextProvider from './src/context/authContext';
import useAuth from './src/hooks/context/useAuth';
import {Auth0Provider} from 'react-native-auth0';
import ChatContextProvider from './src/context/chatContext';
import useDB from './src/hooks/context/useDB';
import RelationshipContextProvider from './src/context/relationshipContext';
import './src/utility/globalVariables';
import {AnalyticsProvider} from './src/services/analytics';
import {PusherProvider} from './src/services/pusher/provider';
import {NotificationProvider} from './src/services/notification/provider';
import * as Sentry from '@sentry/react-native';
import {Config} from 'react-native-config';

Sentry.init({
  dsn: Config.SENTRY_DSN,
});

const App = () => {
  useAuth();
  const {openDB} = useDB();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : theme.colors.base_new,
    flex: 1,
  };
  const queryClient = new QueryClient();
  const {AUTH0_DOMAIN, AUTH0_CLIENT_ID} = Config || {};
  useEffect(() => {
    openDB();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <AnalyticsProvider>
            <PusherProvider>
              <NotificationProvider>
                <AuthContextProvider>
                  <RelationshipContextProvider>
                    <ChatContextProvider>
                      <StackNavigationWithLoader />
                    </ChatContextProvider>
                  </RelationshipContextProvider>
                </AuthContextProvider>
              </NotificationProvider>
            </PusherProvider>
          </AnalyticsProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default App;
