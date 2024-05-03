/***
RNCodeForClientReview - NAVIGATION STACK CLASS
***/

import React, {FC, useEffect, useState} from 'react';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {navigationRef} from './navigationHelper';
import {SCREEN_NAME} from '../enums';
import OnboardingScreen from '../screens/onboardingScreen/onboarding';
import InputPhoneNumberScreen from '../screens/registration/inputPhoneNumberScreen';
import VerifyOtpScreen from '../screens/registration/verifyOtpScreen';
import InputNameScreen from '../screens/registration/inputNameScreen';
import SelectPersonalityScreen from '../screens/registration/selectPersonalityScreen';
import theme from '../theme';
import FillQuestionnaireScreen from '../screens/chat/fillQuestionnaire/fillQuestionnaireScreen';
import {RootStackParamList} from '../types';
import BottomTabsNavigation from './mainBottomNavigation';
import EnableNotificationScreen from '../screens/registration/enableNotificationScreen';
import ChatScreen from '../screens/chat';
import {LogBox} from 'react-native';
import useAuth from '../hooks/context/useAuth';
import WaitlistFormScreen from '../screens/main/matchMaking/waitlistFormScreen';
import SettingScreen from '../screens/settings';
import PushNotificationScreen from '../screens/settings/PushNotifications';
import DeleteAccountConfirmScreen from '../screens/deleteAccount/deleteAccountConfirmScreen';
import WhatsAppTutorialScreen from '../screens/chat/uploadConversation/whatsappTutorialScreen';
import UserSelectorScreen from '../screens/chat/uploadConversation/fillWhatsappQuestionnaire/subComponents/userSelectorScreen';
import FillWhatappQuestionnaireScreen from '../screens/chat/uploadConversation/fillWhatsappQuestionnaire';
import ChooseAnalysisScreen from '../screens/chat/uploadConversation/fillWhatsappQuestionnaire/chooseAnalysis';
import DeleteAccountReasonScreen from '../screens/deleteAccount';
import DeleteAccountSuccessScreen from '../screens/deleteAccount/deleteAccountSuccessScreen';
import WelcomeScreen from '../screens/settings/WelcomeScreen';
import IMessageTutorialScreen from '../screens/chat/uploadConversation/iMessageTutorialScreen';
import SwitchCoachScreen from '../screens/settings/SwitchCoachScreen';
import IMessageNotSyncedModalScreen from '../screens/chat/uploadConversation/iMessageNotSyncedModalScreen';
import IMessageSyncedModalScreen from '../screens/chat/uploadConversation/iMessageSyncedModalScreen';
import FillIMessageQuestionnaireScreen from '../screens/chat/uploadConversation/fillIMessageQuestionnaire';
import MyRelationshipProfileScreen from '../screens/myRelationshipProfile';
import MyBasicsScreen from '../screens/myRelationshipProfile/myBasics';
import RelationshipProfileScreen from '../screens/relationship/relationshipProfile';
import EditRelationshipNameScreen from '../screens/relationship/editRelationshipName';
import FillWhatsAppQuitionnarireForAnalysisScreen from '../screens/chat/uploadConversation/fillWhatsappQuestionnaire/fillWhatsAppQuitionnarireForAnalysis';
import IMessageSyncLoadingScreen from '../screens/chat/uploadConversation/iMessageSyncLoadingScreen';
import WhatsappSyncdSuccessScreen from '../screens/chat/uploadConversation/whatsappSyncdSuccessScreen';
import WaitlistScreen from '../screens/registration/waitlistScreen';
import IMessageSyncdSuccessScreen from '../screens/chat/uploadConversation/iMessageSyncdSuccessScreen';
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: FC<{}> = () => {
  const [enableScreenAnimation, setEnableScreenAnimation] = useState(false);
  const {authContextData} = useAuth();
  const [currentScreen, setCurrentScreen] = useState('');

  const onNavigationReady = () => {
    let routes = [{name: SCREEN_NAME.Onboarding}];
    let isReset = true;
    switch (authContextData.registrationProgress) {
      case 'DONE':
      case 'ONBOARDING':
        isReset = false;
        break;
      case 'OTP_VERIFICATION':
        routes = [
          {name: SCREEN_NAME.Onboarding},
          {name: SCREEN_NAME.InputPhoneNumberScreen},
        ];
        break;
      case 'FIRST_NAME':
        routes = [
          {name: SCREEN_NAME.Onboarding},
          {name: SCREEN_NAME.InputPhoneNumberScreen},
          {name: SCREEN_NAME.VerifyOtpScreen},
          {name: SCREEN_NAME.InputNameScreen},
        ];
        break;
      case 'CREATE_USER':
        routes = [
          {name: SCREEN_NAME.Onboarding},
          {name: SCREEN_NAME.InputPhoneNumberScreen},
          {name: SCREEN_NAME.VerifyOtpScreen},
          {name: SCREEN_NAME.InputNameScreen},
          {name: SCREEN_NAME.SelectPersonalityScreen},
        ];
        break;
      case 'ENABLE_NOTIFICATION':
        isReset = false;
        break;
      case 'WAITLIST_SCREEN':
        routes = [
          {name: SCREEN_NAME.MainScreen},
          {name: SCREEN_NAME.ChatScreen},
          {name: SCREEN_NAME.WaitlistScreen},
        ];
        break;
    }

    if (isReset) {
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: routes.length - 1,
          routes,
        }),
      );
    }
    setTimeout(() => {
      setEnableScreenAnimation(true);
      authContextData?.fetchAPIs(); // Fetch for the first time
    }, 500);
  };

  useEffect(() => {
    authContextData.registrationProgress &&
      setCurrentScreen(getScreenToRedirect());
  }, [authContextData.registrationProgress]);

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const onBoardingScreenOptions = {
    headerShown: false,
    headerTitle: '',
    headerStyle: {
      borderBottomColor: theme.colors.base,
      shadowColor: theme.colors.base,
    },
  };

  const getScreenToRedirect = () => {
    // Handle redirection to onboarding or home
    switch (authContextData.registrationProgress) {
      case 'DONE':
        return SCREEN_NAME.MainScreen;
      case 'ONBOARDING':
        return SCREEN_NAME.Onboarding;
      case 'OTP_VERIFICATION':
        return SCREEN_NAME.InputPhoneNumberScreen;
      case 'FIRST_NAME':
        return SCREEN_NAME.InputNameScreen;
      case 'CREATE_USER':
        return SCREEN_NAME.SelectPersonalityScreen;
      case 'ENABLE_NOTIFICATION':
        return SCREEN_NAME.EnableNotificationScreen;
      case 'WAITLIST_SCREEN':
        return SCREEN_NAME.WaitlistScreen;
      default:
        return '';
    }
  };

  if (currentScreen) {
    return (
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <Stack.Navigator
          initialRouteName={currentScreen}
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: false,
            animationEnabled: enableScreenAnimation,
          }}>
          <Stack.Screen
            name={SCREEN_NAME.Onboarding}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name={SCREEN_NAME.InputPhoneNumberScreen}
            component={InputPhoneNumberScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.VerifyOtpScreen}
            component={VerifyOtpScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.InputNameScreen}
            component={InputNameScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.SelectPersonalityScreen}
            component={SelectPersonalityScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.MainScreen}
            component={BottomTabsNavigation}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.ChatScreen}
            component={ChatScreen}
            options={{
              cardStyleInterpolator: ({current, layouts}) => {
                if (authContextData.registrationProgress !== 'DONE') {
                  return {
                    cardStyle: {
                      opacity: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  };
                } else {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                }
              },
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.EnableNotificationScreen}
            component={EnableNotificationScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.WaitlistScreen}
            component={WaitlistScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: ({current, layouts}) => {
                if (authContextData.registrationProgress !== 'DONE') {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                } else {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateY: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.height, 0],
                          }),
                        },
                      ],
                    },
                  };
                }
              },
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.FillQuestionnaireScreen}
            component={FillQuestionnaireScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.WaitlistFormScreen}
            component={WaitlistFormScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.SettingScreen}
            component={SettingScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.PushNotificationScreen}
            component={PushNotificationScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.SwitchCoachScreen}
            component={SwitchCoachScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.DeleteAccountConfirmScreen}
            component={DeleteAccountConfirmScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.WhatsAppTutorialScreen}
            component={WhatsAppTutorialScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.IMessageTutorialScreen}
            component={IMessageTutorialScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.iMessageNotSyncedModalScreen}
            component={IMessageNotSyncedModalScreen}
            options={{
              ...onBoardingScreenOptions,
              presentation: 'transparentModal',
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.IMessageSyncedModalScreen}
            component={IMessageSyncedModalScreen}
            options={{
              ...onBoardingScreenOptions,
              presentation: 'transparentModal',
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.IMessageSyncdSuccessScreen}
            component={IMessageSyncdSuccessScreen}
            options={{
              ...onBoardingScreenOptions,
              presentation: 'transparentModal',
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
          <Stack.Screen
            name={SCREEN_NAME.FillIMessageQuestionnaireScreen}
            component={FillIMessageQuestionnaireScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.MyRelationshipProfileScreen}
            component={MyRelationshipProfileScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.MyBasicsScreen}
            component={MyBasicsScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.UserSelectorScreen}
            component={UserSelectorScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.FillWhatappQuestionnaireScreen}
            component={FillWhatappQuestionnaireScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.ChooseAnalysisScreen}
            component={ChooseAnalysisScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.DeleteAccountReasonScreen}
            component={DeleteAccountReasonScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.DeleteAccountSuccessScreen}
            component={DeleteAccountSuccessScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.WelcomeScreen}
            component={WelcomeScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.RelationshipProfileScreen}
            component={RelationshipProfileScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.EditRelationshipNameScreen}
            component={EditRelationshipNameScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.FillWhatsAppQuitionnarireForAnalysisScreen}
            component={FillWhatsAppQuitionnarireForAnalysisScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.IMessageSyncLoadingScreen}
            component={IMessageSyncLoadingScreen}
            options={onBoardingScreenOptions}
          />
          <Stack.Screen
            name={SCREEN_NAME.WhatsappSyncdSuccessScreen}
            component={WhatsappSyncdSuccessScreen}
            options={onBoardingScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNavigator;
