import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../enums';
import {RelationshipReqData} from '../../@types/common';
import {CoachDataProps} from '../constants/mockData';

export type RootStackParamList = {
  MainScreen: undefined;
  Onboarding: undefined;
  InputPhoneNumberScreen: undefined;
  VerifyOtpScreen: {phoneNumber: string};
  InputNameScreen: undefined;
  SelectPersonalityScreen: {userFirstName: string; userLastName: string};
  EnableNotificationScreen: {phoneNumber: string};
  HomeScreen: undefined;
  ChatScreen: {
    receiverData?: ChatReceiverDataType;
    channelData?: ChannelDataType;
    result?: any;
    sectionListData?: any;
    isIMessageUploadType?: any;
    relationShipData?: any;
  };
  FillQuestionnaireScreen:
    | {
        messageItem?: any;
        onFillQuitionnaireDoneFromMsg?: any;
      }
    | undefined;
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
  WhatsAppTutorialScreen: {
    isForSync: boolean;
  };
  IMessageTutorialScreen: undefined;
  UserSelectorScreen: {
    updateStep?: Function;
    removeRelationhipId?: Function;
    updateOptionForStep?: Function;
    senders?: Array<string>;
    selectedOptionForUserSelection?: number;
    isButtonEnabled?: boolean;
    isNamesDiff?: boolean;
    isFromWhatsAppUpload: boolean;
    isUpdateFlow?: boolean;
    updateExistingRelationship?: Function;
    isFromUpdateAndDiffConv?: boolean;
  };
  FillWhatappQuestionnaireScreen: {
    isFromWhatsAppUpload: boolean;
  };
  ChooseAnalysisScreen: {
    createRelationReqData?: RelationshipReqData;
    isUpdateRelationship?: boolean;
    relationshipId?: string;
    relationShipData?: any;
    isFromAnalysis?: boolean;
    analysisListData?: any;
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
    relationShipData?: any;
    updateReceiverDataIfEdited?: any;
    receiverData?: ChatReceiverDataType | CoachDataProps | null | undefined;
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
  WhatsAppTutorialScreen: {
    isForSync?: boolean;
  };
  IMessageTutorialScreen: undefined;
  UserSelectorScreen: {
    updateStep?: Function;
    removeRelationhipId?: Function;
    updateOptionForStep?: Function;
    senders?: Array<string>;
    selectedOptionForUserSelection?: number;
    isButtonEnabled?: boolean;
    isNamesDiff?: boolean;
    isFromWhatsAppUpload: boolean;
    isUpdateFlow?: boolean;
    updateExistingRelationship?: Function;
    isFromUpdateAndDiffConv?: boolean;
  };
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

export type FillQuestionnaireScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.FillQuestionnaireScreen
>;

export type WhatsAppTutorialScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.WhatsAppTutorialScreen
>;

export type RelationshipProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.RelationshipProfileScreen
>;

export type SelectPersonalityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.SelectPersonalityScreen
>;

export type ChatScreenScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.ChatScreen
>;

export type UserSelectorScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREEN_NAME.UserSelectorScreen
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
  avatarUrl?: string;
  description?: string;
  id?: string;
  intro?: string;
  name?: string;
  title?: string;
  type?: any;
  about?: any;
  subject?: string;
};

export type ChannelDataType = {
  createdAt: string;
  id: string;
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
  readers?: any;
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
