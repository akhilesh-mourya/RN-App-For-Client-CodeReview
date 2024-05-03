/***
RNCodeForClientReview - MAIN BOTTOM TAB NAVIGATION STACK CLASS
***/

import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREEN_NAME} from '../enums';
import AMBottomTabBar from '../components/bottomTabBar';
import ProfileScreen from '../screens/main/profile/profileScreen';
import HomeStackNavigator from './homeNavigation';
import MatchMakingStackNavigator from './matchMakingNavigation';
import {useAnalytics} from '../services/analytics';

const Tab = createBottomTabNavigator();

const BottomTabsNavigation: FC<{}> = () => {
  const analytics = useAnalytics();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <AMBottomTabBar analytics={analytics} {...props} />}>
      <Tab.Screen
        name={SCREEN_NAME.HomeNavigator}
        component={HomeStackNavigator}
        options={{
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.MatchMakingScreen}
        component={MatchMakingStackNavigator}
        initialParams={{secoundTab: true}}
      />
      <Tab.Screen name={SCREEN_NAME.ProfileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
