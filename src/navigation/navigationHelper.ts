/***
LOOTSWAP - HELPER CLASS FOR NAVIGATION
***/

import * as React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {SCREEN_NAME} from '../enums';

export let isReadyRef = React.createRef();

type WaitlistScreenProps = {
  isFromHomeScreen?: boolean;
};

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

interface CustomerRouteProp {
  name: string;
  params?: any;
}

export const resetRoute = (routes: Array<CustomerRouteProp>, index = 0) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
};

export const resetHomeRoute = () => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_NAME.MainScreen,
        },
      ],
    }),
  );
};

export const resetWaitlistScreen = (params: WaitlistScreenProps) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_NAME.WaitlistScreen,
          params,
        },
      ],
    }),
  );
};

export const resetToWaitlistRoute = () => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 2,
      routes: [
        {name: SCREEN_NAME.MainScreen},
        {name: SCREEN_NAME.ChatScreen},
        {name: SCREEN_NAME.WaitlistScreen},
      ],
    }),
  );
};

export const resetToNotificationRoute = params => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: SCREEN_NAME.EnableNotificationScreen, params}],
    }),
  );
};

export const resetToChatFromAnalysis = params => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        {name: SCREEN_NAME.MainScreen},
        {name: SCREEN_NAME.ChatScreen, params: {...params}},
      ],
    }),
  );
};

export const resetToHomeFromAnalysis = () => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: SCREEN_NAME.MainScreen}],
    }),
  );
};

export const resetToPhoneNumberRoute = () => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_NAME.InputPhoneNumberScreen,
          params: {isFromLogout: true},
        },
      ],
    }),
  );
};

export const resetRouteAfterDeleteAccount = (screen: any) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: screen,
          params: {isFromLogout: true},
        },
      ],
    }),
  );
};

export const resetRouteAfterReferalCode = (screen: any) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: screen,
          params: {isFromLogout: false},
        },
      ],
    }),
  );
};

export const goBackMultipleScreens = (totalScreens: number = 2) => {
  navigationRef.current?.dispatch(StackActions.pop(totalScreens));
};

export const goToChatFromNotification = (params: any = {}) => {
  navigationRef.current?.navigate('ChatScreen', params);
};

export const getCurrentRouteName = () => {
  return navigationRef?.current?.getCurrentRoute()?.name || '';
};
