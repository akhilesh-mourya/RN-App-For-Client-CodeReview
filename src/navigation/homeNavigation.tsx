/***
Amori - NAVIGATION STACK CLASS
***/

import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAME} from '../enums';
import theme from '../theme';
import {HomeStackParamList} from '../types';
import HomeScreen from '../screens/main/home/homeScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: FC<{}> = () => {
  const onBoardingScreenOptions = {
    headerShown: false,
    headerTitle: '',
    headerStyle: {
      borderBottomColor: theme.colors.base,
      shadowColor: theme.colors.base,
    },
  };

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREEN_NAME.HomeScreen}
        component={HomeScreen}
        options={{...onBoardingScreenOptions, animationEnabled: false}}
      />
      {/* <Stack.Screen
        name={SCREEN_NAME.WhatsAppTutorialScreen}
        component={WhatsAppTutorialScreen}
        options={onBoardingScreenOptions}
      /> */}
      {/* <Stack.Screen
        name={SCREEN_NAME.IMessageTutorialScreen}
        component={IMessageTutorialScreen}
        options={onBoardingScreenOptions}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
