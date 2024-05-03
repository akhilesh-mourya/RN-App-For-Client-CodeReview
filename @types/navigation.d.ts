import {NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export type ApplicationStackParamList = {
  OnBoarding: undefined;
  InputPhoneNumberScreen: NavigatorScreenParams<any>;
  verifyOtpScreen: NavigatorScreenParams<any>;
  InputNameScreen: NavigatorScreenParams<any>;
  SelectPersonalityScreen: NavigatorScreenParams<any>;
  EnableNotificationScreen: NavigatorScreenParams<any>;
  HomeScreen: NavigatorScreenParams<any>;
  FillQuestionnaireScreen: NavigatorScreenParams<any>;
  MatchMakingScreen: NavigatorScreenParams<any>;
  WaitlistFormScreen: NavigatorScreenParams<any>;
  MatchMakingSuccessScreen: NavigatorScreenParams<any>;
  MatchMakingLiveScreen: NavigatorScreenParams<any>;
  MatchMakingMatchesScreen: NavigatorScreenParams<any>;
  WhatsAppTutorialScreen: NavigatorScreenParams<any>;
  ChooseAnalysisScreen: NavigatorScreenParams<any>;
  IMessageTutorialScreen: NavigatorScreenParams<any>;
  iMessageNotSyncedModalScreen: NavigatorScreenParams<any>;
  IMessageSyncedModalScreen: NavigatorScreenParams<any>;
  FillIMessageQuestionnaireScreen: NavigatorScreenParams<any>;
  RelationshipProfileScreen: NavigatorScreenParams<any>;
  EditRelationshipNameScreen: NavigatorScreenParams<any>;
  FillWhatsAppQuitionnarireForAnalysisScreen: NavigatorScreenParams<any>;
  iMessageSyncLoadingScreen: NavigatorScreenParams<any>;
  WhatsappSyncdSuccessScreen: NavigatorScreenParams<any>;
  WaitlistScreen: NavigatorScreenParams<any>;
};

export type NavigationScreenProps = StackScreenProps<ApplicationStackParamList>;
