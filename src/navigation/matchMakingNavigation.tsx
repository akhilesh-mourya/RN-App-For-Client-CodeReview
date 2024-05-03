/***
RNCodeForClientReview - NAVIGATION STACK CLASS
***/

import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAME} from '../enums';
import theme from '../theme';
import {MatchMakingStackParamList} from '../types';
import MatchMakingScreen from '../screens/main/matchMaking/matchMakingScreen';
import MatchMakingSuccessScreen from '../screens/main/matchMaking/matchMakingSuccessScreen';
import MatchMakingLiveScreen from '../screens/main/matchMaking/matchMakingLiveScreen';
import MatchMakingMatchesScreen from '../screens/main/matchMaking/matchMakingMatchesScreen';
import useAuth from '../hooks/context/useAuth';

const Stack = createStackNavigator<MatchMakingStackParamList>();

const MatchMakingStackNavigator: FC<{}> = () => {
  const {authContextData} = useAuth();

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
      initialRouteName={
        authContextData?.aiMatchmakingData?.data?.id
          ? SCREEN_NAME.MatchMakingSuccessScreen
          : SCREEN_NAME.MatchMakingScreen
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREEN_NAME.MatchMakingScreen}
        component={MatchMakingScreen}
        options={{...onBoardingScreenOptions}}
      />
      <Stack.Screen
        name={SCREEN_NAME.MatchMakingSuccessScreen}
        component={MatchMakingSuccessScreen}
        options={onBoardingScreenOptions}
      />
      <Stack.Screen
        name={SCREEN_NAME.MatchMakingLiveScreen}
        component={MatchMakingLiveScreen}
        options={onBoardingScreenOptions}
      />
      <Stack.Screen
        name={SCREEN_NAME.MatchMakingMatchesScreen}
        component={MatchMakingMatchesScreen}
        options={onBoardingScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default MatchMakingStackNavigator;
