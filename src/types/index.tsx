import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../enums';
import {RelationshipReqData} from '../../@types/common';

export type RootStackParamList = {
  Onboarding: undefined;
  InputPhoneNumberScreen: undefined;
  VerifyOtpScreen: {phoneNumber: string};
  InputNameScreen: undefined;
  SelectPersonalityScreen: {userFirstName: string; userLastName: string};
  EnableNotificationScreen: {phoneNumber: string};
  HomeScreen: undefined;
  ChatScreen: {
    receiverData: ChatReceiverDataType;
    channelData: ChannelDataType;
  };
  FillQuestionnaireScreen: {
    messageItem: any;
  };
  MatchMakingScreen: undefined;
  WaitlistFormScreen: undefined;
  MatchMakingSuccessScreen: undefined;
  SettingScreen: undefined;
  PushNotificationScreen: undefined;
  SwitchCoachScreen: undefined;
  DeleteAccountConfirmScreen: {
    reason: string;
    otherReason: string;
  };
  MatchMakingLiveScreen: undefined;
  MatchMakingMatchesScreen: undefined;
  WhatsAppTutorialScreen: undefined;
  IMessageTutorialScreen: undefined;
  UserSelectorScreen: undefined;
  FillWhatappQuestionnaireScreen: {
    isFromWhatsAppUpload: boolean;
  };
  ChooseAnalysisScreen: {
    createRelationReqData: RelationshipReqData;
    isUpdateRelationship: boolean;
    relationshipId?: string;
    relationShipData?: any;
  };
  DeleteAccountReasonScreen: undefined;
  DeleteAccountSuccessScreen: undefined;
  WelcomeScreen: undefined;
  iMessageNotSyncedModalScreen: undefined;
  IMessageSyncedModalScreen: undefined;
  IMessageSyncdSuccessScreen: undefined;
  FillIMessageQuestionnaireScreen: {
    otherUserName: string;
    myName: string;
    uploadId: string;
    isExistingFlow: boolean;
  };
  MyRelationshipProfileScreen: undefined;
  MyBasicsScreen: undefined;
  RelationshipProfileScreen: {
    relationshipData: any;
  };
  EditRelationshipNameScreen: {
    relationshipData: any;
  };
  FillWhatsAppQuitionnarireForAnalysisScreen: any;
  iMessageSyncLoadingScreen: any;
  WhatsappSyncdSuccessScreen: any;
  WaitlistScreen: any;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ChatScreen: {
    receiverData: ChatReceiverDataType;
    channelData: ChannelDataType;
  };
  EnableNotificationScreen: {phoneNumber: string};
  WhatsAppTutorialScreen: undefined;
  IMessageTutorialScreen: undefined;
  UserSelectorScreen: undefined;
  FillWhatappQuestionnaireScreen: undefined;
  ChooseAnalysisScreen: undefined;
};

export type MatchMakingStackParamList = {
  MatchMakingScreen: undefined;
  WaitlistFormScreen: undefined;
  MatchMakingSuccessScreen: undefined;
  MatchMakingLiveScreen: undefined;
  MatchMakingMatchesScreen: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type VerifyOTPScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.VerifyOtpScreen
>;

export type SelectPersonalityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.SelectPersonalityScreen
>;

export type ChatScreenScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.ChatScreen
>;
export type ChooseAnalysisScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.ChooseAnalysisScreen
>;

export type FillWhatsappQuitoinnaireProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.FillWhatappQuestionnaireScreen
>;

export type FillWhatsAppQuitionnarireForAnalysisScreenProps =
  NativeStackScreenProps<
    RootStackParamList,
    SCREEN_NAME.FillWhatsAppQuitionnarireForAnalysisScreen
  >;

export type FillIMessageQuitoinnaireProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.FillIMessageQuestionnaireScreen
>;

export type DeleteUserProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.DeleteAccountConfirmScreen
>;

export type ChatReceiverDataType = {
  avatarUrl: string;
  description: string;
  id: number;
  intro: string;
  name: string;
  title: string;
  type: string;
  about: string;
};

export type ChannelDataType = {
  createdAt: string;
  id: number;
  type: string;
  latestMessage?: ChatMessagesType;
};

export type MessageChaoiceType = {
  contentId: string;
  autoSelect: boolean;
  content: string;
  selected: boolean;
  contentType: string;
  question_id?: string;
  message_id?: string;
};

export type MessageProcessType = {
  message_id?: string;
  status: string;
  updatedAt: string;
};

export type QuestionsType = {
  id: string;
  optional: boolean;
  choices?: Array<MessageChaoiceType> | undefined;
  message_id?: string;
};

export type MessageAttachmentsType = {
  id: string;
  contentType: string;
  content?: string;
  messageId?: string;
  createdAt?: string;
  type?: string;
};

export type ChatMessagesType = {
  channelId: string;
  question?: QuestionsType;
  content: string;
  contentType?: string;
  createdAt: string;
  updated_at?: string;
  id: string;
  senderId: string;
  senderType: string;
  process?: MessageProcessType;
  attachments?: Array<MessageAttachmentsType>;
};

export type MessagesListType = Array<ChatMessagesType>;

export type UploadedChatType = {
  sender: string;
  sentAt: Date;
  content: string;
  contentType: string;
};

export type UploadedChatListType = Array<UploadedChatType>;
export type AuthorsListType = Array<string>;

export type AnalysysItemType = {
  body: any;
  createdAt: string;
  id: string;
  relationshipId: string;
  status: string;
  type: string;
};
