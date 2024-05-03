import {
  ATTACHMENT_STYLE_BG_ICON,
  ATTACHMENT_STYLE_CHAT_SVG_ICON,
  ATTACHMENT_STYLE_TEXT_SVG_ICON,
  CROSS_ICON,
  MULTIPLE_IMAGES_SVG_ICON,
  PROGREE_ACTIVE_SVG_ICON,
  PROGREE_INACTIVE_SVG_ICON,
  RELATIONSHIP_HEALTH_STATUS_BG_ICON,
  RELATIONSHIP_STATUS_CHAT_SVG_ICON,
  SHARE_ICON,
} from '../assets/svg/analysis';
import {
  ANXIOUS,
  ANXIOUS_AND_ANXIOUS,
  ANXIOUS_AVOIDANT,
  ANXIOUS_AVOIDANT_AND_ANXIOUS_AVOIDANT,
  ANXIOUS_AVOIDANT_AND_AVOIDANT,
  ANXIOUS_AVOIDANT_AND_SECURE,
  ANXIOUS_AND_SECURE,
  AVOIDANT,
  AVOIDANT_AND_ANXIOUS_AVOIDANT,
  AVOIDANT_AND_AVOIDANT,
  AVOIDANT_AND_SECURE,
  CURVED_ATTACHMENT_STYLES,
  CURVED_RELATIONSHIP_HEALTH_STATUS,
  RELATIONSHIP_LENS,
  RELATIONSHIP_STRENGTH,
  RELATIONSHIP_SUMMARY,
  SECURE,
  SECURE_AND_ANXIOUS,
  SECURE_AND_ANXIOUS_AVOIDANT,
  SECURE_AND_AVOIDANT,
  SECURE_AND_SECURE,
} from '../constants/imageConstants';

export enum Size {
  Extra_Small = 'esm',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  Full = 'fl',
  Fit_To_Width = 'ftw',
  Admin_group = 'adg',
  Flexible = 'flexible',
}

export enum Type {
  Primary = 'primary',
  Secondary = 'secondary',
  Message = 'message',
  Grey = 'grey',
  Error = 'error',
  Link = 'link',
  Info = 'info',
  Text = 'text',
  Placeholder = 'placeholder',
  Black = 'black',
  Amount = 'amount',
  White = 'white',
  Line = 'line',
  Danger = 'danger',
  Warning = 'warning',
  SkyBlue = 'sky_blue',
  Clear = 'clear',
  Disabled = 'disabled',
  Tooltip = 'tooltip',
  GreySecondary = 'greySecondary',
  GreyShade = 'greyShade',
  GreyTextColor = 'greyTextColor',
  PrimeryGradiant = 'primeryGradiant',
  HeadingTextBG = 'headingTextBG',
  RememberMeText = 'rememberMeText',
  BG = 'BG',
  Green = 'green',
  LightGreen = 'lightGreen',
  Purple = 'purple',
  UpdateBgColor = 'updateBgColor',
}

export enum FontFamily {
  ExtraLight = 'Manrope-ExtraLight',
  Light = 'Manrope-Light',
  Medium = 'Manrope-Medium',
  Regular = 'Manrope-Regular',
  SemiBold = 'Manrope-Semibold',
  AndroidSemiBold = 'Manrope-SemiBold',
  Bold = 'Manrope-Bold',
  ExtraBold = 'Manrope-ExtraBold',
  FKLight = 'FKRomanStandardTrial-Light',
  FKBlack = 'FKRomanStandardTrial-Black',
  FKMedium = 'FKRomanStandardTrial-Medium',
  FKRegular = 'FKRomanStandardTrial-Regular',
  FKBold = 'FKRomanStandardTrial-Bold',
  FKThin = 'FKRomanStandardTrial-Thin',
  UnboundSemiBold = 'Unbounded-SemiBold',
  UnboundBlack = 'Unbounded-Black',
  UnboundBold = 'Unbounded-Bold',
  UnboundExtraBold = 'Unbounded-ExtraBold',
  UnboundExtraLight = 'Unbounded-ExtraLight',
  UnboundLight = 'Unbounded-Light',
  UnboundMedium = 'Unbounded-Medium',
  UnboundRegular = 'Unbounded-Regular',
}

export enum API_METHOD {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
}

export enum SCREEN_NAME {
  ChatScreen = 'ChatScreen',
  Onboarding = 'Onboarding',
  InputPhoneNumberScreen = 'InputPhoneNumberScreen',
  VerifyOtpScreen = 'VerifyOtpScreen',
  InputNameScreen = 'InputNameScreen',
  SelectPersonalityScreen = 'SelectPersonalityScreen',
  EnableNotificationScreen = 'EnableNotificationScreen',
  MainScreen = 'MainScreen',
  HomeScreen = 'HomeScreen',
  MatchMakingScreen = 'MatchMakingScreen',
  WaitlistFormScreen = 'WaitlistFormScreen',
  ProfileScreen = 'ProfileScreen',
  FillQuestionnaireScreen = 'FillQuestionnaireScreen',
  HomeNavigator = 'HomeNavigator',
  MatchMakingSuccessScreen = 'MatchMakingSuccessScreen',
  SettingScreen = 'SettingScreen',
  PushNotificationScreen = 'PushNotificationScreen',
  DeleteAccountConfirmScreen = 'DeleteAccountConfirmScreen',
  MatchMakingLiveScreen = 'MatchMakingLiveScreen',
  MatchMakingMatchesScreen = 'MatchMakingMatchesScreen',
  WhatsAppTutorialScreen = 'WhatsAppTutorialScreen',
  IMessageTutorialScreen = 'IMessageTutorialScreen',
  UserSelectorScreen = 'UserSelectorScreen',
  FillWhatappQuestionnaireScreen = 'FillWhatappQuestionnaireScreen',
  ChooseAnalysisScreen = 'ChooseAnalysisScreen',
  DeleteAccountReasonScreen = 'DeleteAccountReasonScreen',
  DeleteAccountSuccessScreen = 'DeleteAccountSuccessScreen',
  WelcomeScreen = 'WelcomeScreen',
  SwitchCoachScreen = 'SwitchCoachScreen',
  iMessageNotSyncedModalScreen = 'iMessageNotSyncedModalScreen',
  IMessageSyncedModalScreen = 'IMessageSyncedModalScreen',
  IMessageSyncdSuccessScreen = 'IMessageSyncdSuccessScreen',
  FillIMessageQuestionnaireScreen = 'FillIMessageQuestionnaireScreen',
  MyRelationshipProfileScreen = 'MyRelationshipProfileScreen',
  MyBasicsScreen = 'MyBasicsScreen',
  RelationshipProfileScreen = 'RelationshipProfileScreen',
  EditRelationshipNameScreen = 'EditRelationshipNameScreen',
  FillWhatsAppQuitionnarireForAnalysisScreen = 'FillWhatsAppQuitionnarireForAnalysisScreen',
  IMessageSyncLoadingScreen = 'IMessageSyncLoadingScreen',
  WhatsappSyncdSuccessScreen = 'WhatsappSyncdSuccessScreen',
  WaitlistScreen = 'WaitlistScreen',
}

export interface StructuredProps {
  title: string;
  data: [];
}

export interface MessageSectionItemProps {
  item: any;
  index: number;
}

export enum ChannelTypeEnum {
  Coach = 'assistant_general',
}

export enum MessageContentEnum {
  FillQuestionnaire = 'fill_out_questionnaire',
  MayBeLater = 'maybe_later',
  UploadConversation = 'upload_conversation',
  YouFillQuestionnaire = 'you_filled_relationship_profile',
  QuitionnaireGetStarted = 'questionnaire_get_started',
  Getting_Your_Analysis_Ready = 'getting_your_analysis_ready',
}

export enum MessageStatusEnum {
  MessageProcessStatusInQueue = 'in_queue',
  MessageProcessStatusProcessing = 'processing',
  MessageProcessStatusSucceeded = 'succeeded',
  MessageProcessStatusFailed = 'failed',
}

export enum CreateRelationPronoun {
  He = 'he',
  She = 'she',
  They = 'they',
}

export const QuestionnairePronoun = {
  he: 0,
  she: 1,
  they: 2,
};

export const QuestionnaireGenderInterset = {
  men: 0,
  women: 1,
  everyone: 2,
};

export enum CreateRelationshipType {
  ExPartner = 'ex_partner',
  CurrentPartner = 'current_partner',
  SomeoneTalking = 'someone_i_am_talking_to',
  PreferNotSay = 'prefer_not_to_say',
}

export enum AnalysisListEnum {
  RelationshipHealthStatus = 'relationship_health_status',
  AttachmentStyle = 'attachment_styles',
  Communication = 'communication',
  Highlights = 'highlights',
  Lowlights = 'lowlights',
  CuteMoments = 'cute_moments',
  Sexiness = 'sexiness',
  YourFlags = 'your_flags',
}

export enum UploadTypeEnum {
  WhatsApp = 'whatsapp',
  IMessage = 'imessage',
}

export enum ErroPopupType {
  OnlyError = 'OnlyError',
  ErrorWithTitle = 'ErrorWithTitle',
  ErrorWithCancelButton = 'ErrorWithCancelButton',
  DeleteConfirmation = 'DeleteConfirmation',
}

export enum GenderInterest {
  Man = 'men',
  Women = 'women',
  Everyone = 'everyone',
}

export enum RelationshipStatus {
  Single = 'single',
  TalkingToSomeone = 'talking_to_someone',
  InAnExclusiveRelationship = 'in_an_exclusive_relationship',
  InAnOpenRelationship = 'in_an_open_relationship',
  Married = 'married',
  Divorced = 'divorced',
  Complicated = 'complicated',
}

export const QuestionnaireRelationshipStatus = {
  single: 0,
  talking_to_someone: 1,
  in_an_exclusive_relationship: 2,
  in_an_open_relationship: 3,
  married: 4,
  divorced: 5,
  complicated: 6,
};

export const MyBasicsStatus = {
  single: 'Single',
  talking_to_someone: 'Talking to someone',
  in_an_exclusive_relationship: 'In an exclusive relationship',
  in_an_open_relationship: 'In an open relationship',
  married: 'Married',
  divorced: 'Divorced',
  complicated: "It's complicated",
  casual: 'Date casually',
  long_term_relationship: 'Be in a long-term relationship',
  marry: 'Dating to marry',
  figuring_out: 'Figuring out my dating goals',
  taking_a_break: 'Taking a break from dating',
  man: 'Man',
  woman: 'Woman',
  agender: 'Agender',
  androgynous: 'Androgynous',
  asexual: 'Asexual',
  bigender: 'Bigender',
  cis_man: 'Cis Man',
  cis_woman: 'Cis Woman',
  genderfluid: 'Genderfluid',
  genderqueer: 'Genderqueer',
  gender_nonconforming: 'Gender Nonconforming',
  hijra: 'Hijra',
  intersex: 'Intersex',
  non_binary: 'Non-binary',
  other_gender: 'Other Gender',
  pangender: 'Pangender',
  transfeminine: 'Transfeminine',
  transgender: 'Transgender',
  trans_man: 'Trans Man',
  transmasculine: 'Transmasculine',
  transexual: 'Transexual',
  trans_women: 'Trans Women',
  two_spirit: 'Two Spirit',
};

export enum RelationshipGoal {
  Casual = 'casual',
  LongTermRelationship = 'long_term_relationship',
  Marry = 'marry',
  FiguringOut = 'figuring_out',
  TakingABreak = 'taking_a_break',
}

export const QuestionnaireRelationshipGoal = {
  casual: 0,
  long_term_relationship: 1,
  marry: 2,
  figuring_out: 3,
  taking_a_break: 4,
};

export enum Gender {
  Man = 'man',
  Woman = 'woman',
  Agender = 'agender',
  Androgynous = 'androgynous',
  Asexual = 'asexual',
  Bigender = 'bigender',
  CisMan = 'cis_man',
  CisWoman = 'cis_woman',
  Genderfluid = 'genderfluid',
  Genderqueer = 'genderqueer',
  GenderNonconforming = 'gender_nonconforming',
  Hijra = 'hijra',
  Intersex = 'intersex',
  NonBinary = 'non_binary',
  OtherGender = 'other_gender',
  Pangender = 'pangender',
  Transfeminine = 'transfeminine',
  Transgender = 'transgender',
  TransMan = 'trans_man',
  Transmasculine = 'transmasculine',
  Transexual = 'transexual',
  TransWomen = 'trans_women',
  TwoSpirit = 'two_spirit',
}

export const QuestionnaireGender = {
  man: 1,
  woman: 2,
  agender: 3,
  androgynous: 3,
  asexual: 3,
  bigender: 3,
  cis_man: 3,
  cis_woman: 3,
  genderfluid: 3,
  genderqueer: 3,
  gender_nonconforming: 3,
  hijra: 3,
  intersex: 3,
  non_binary: 3,
  other_gender: 3,
  pangender: 3,
  transfeminine: 3,
  transgender: 3,
  trans_man: 3,
  transmasculine: 3,
  transexual: 3,
  trans_women: 3,
  two_spirit: 3,
};

export enum DeleteReason {
  TechnicalIssues = 'technical_issues',
  NoLongerDating = 'no_longer_dating',
  Privacyconcerns = 'privacy_concerns',
  CostTooMuch = 'cost_too_much',
  DontLikeRNCodeForClientReview = 'dont_like_RNCodeForClientReview',
  Others = 'custom',
}

export enum ChatType {
  AssistantGeneral = 'assistant_general',
  AssistantRelationship = 'assistant_relationship',
}

export const Analysis = {
  CURVED_ATTACHMENT_STYLE: CURVED_ATTACHMENT_STYLES,
  AttachmentStyleBgIcon: ATTACHMENT_STYLE_BG_ICON,
  AttachmentTextBgIcon: ATTACHMENT_STYLE_TEXT_SVG_ICON,
  MultipleImagesIcon: MULTIPLE_IMAGES_SVG_ICON,
  RelationshipStatusChatSvgIcon: RELATIONSHIP_STATUS_CHAT_SVG_ICON,
  AttachmentStyleChatSvgIcon: ATTACHMENT_STYLE_CHAT_SVG_ICON,
  ProgressActiveIcon: PROGREE_ACTIVE_SVG_ICON,
  ProgressInactiveIcon: PROGREE_INACTIVE_SVG_ICON,
  CrossIcon: CROSS_ICON,
  ShareIcon: SHARE_ICON,

  anxious: ANXIOUS,
  avoidant: AVOIDANT,
  anxious_avoidant: ANXIOUS_AVOIDANT,
  secure: SECURE,
  anxious_and_avoidant: ANXIOUS_AVOIDANT,
  avoidant_and_anxious: ANXIOUS_AVOIDANT_AND_AVOIDANT,
  anxious_and_anxious_avoidant: ANXIOUS_AVOIDANT_AND_AVOIDANT,
  anxious_avoidant_and_anxious: ANXIOUS_AVOIDANT_AND_AVOIDANT,
  secure_and_anxious: SECURE_AND_ANXIOUS,
  anxious_and_secure: ANXIOUS_AND_SECURE,
  avoidant_and_anxious_avoidant: AVOIDANT_AND_ANXIOUS_AVOIDANT,
  anxious_avoidant_and_avoidant: ANXIOUS_AVOIDANT_AND_AVOIDANT,
  avoidant_and_secure: AVOIDANT_AND_SECURE,
  secure_and_avoidant: SECURE_AND_AVOIDANT,
  anxious_avoidant_and_secure: ANXIOUS_AVOIDANT_AND_SECURE,
  secure_and_anxious_avoidant: SECURE_AND_ANXIOUS_AVOIDANT,
  anxious_and_anxious: ANXIOUS_AND_ANXIOUS,
  avoidant_and_avoidant: AVOIDANT_AND_AVOIDANT,
  anxious_avoidant_and_anxious_avoidant: ANXIOUS_AVOIDANT_AND_ANXIOUS_AVOIDANT,
  secure_and_secure: SECURE_AND_SECURE,
};

export const HealthStatus = {
  CURVED_RELATIONSHIP_STATUS: CURVED_RELATIONSHIP_HEALTH_STATUS,
  RELATIONSHIP_STRENGTH: RELATIONSHIP_STRENGTH,
  RELATIONSHIP_SUMMARY: RELATIONSHIP_SUMMARY,
  RELATIONSHIP_LENS: RELATIONSHIP_LENS,
  RelationshipStatusBgIcon: RELATIONSHIP_HEALTH_STATUS_BG_ICON,
  CrossIcon: CROSS_ICON,
  ShareIcon: SHARE_ICON,
  ProgressActiveIcon: PROGREE_ACTIVE_SVG_ICON,
  ProgressInactiveIcon: PROGREE_INACTIVE_SVG_ICON,
};

export const AnalysisAttachmentStyle = {
  anxious: 'Anxious',
  avoidant: 'Avoidant',
  anxious_avoidant: 'Anxious-avoidant',
  secure: 'Secure',
  anxious_and_avoidant: 'Anxious and avoidant',
  avoidant_and_anxious: 'Avoidant and anxious',
  anxious_and_anxious_avoidant: 'Anxious and anxious-avoidant',
  anxious_avoidant_and_anxious: 'Anxious-avoidant and anxious',
  secure_and_anxious: 'Secure and anxious',
  anxious_and_secure: 'Anxious and secure',
  avoidant_and_anxious_avoidant: 'Avoidant and anxious-avoidant',
  anxious_avoidant_and_avoidant: 'Anxious-avoidant and avoidant',
  avoidant_and_secure: 'Avoidant and secure',
  secure_and_avoidant: 'Secure and avoidant',
  anxious_avoidant_and_secure: 'Anxious-avoidant and secure',
  secure_and_anxious_avoidant: 'Secure and anxious-avoidant',
  anxious_and_anxious: 'Anxious and anxious',
  avoidant_and_avoidant: 'Avoidant and avoidant',
  anxious_avoidant_and_anxious_avoidant:
    'Anxious-avoidant and anxious-avoidant',
  secure_and_secure: 'Secure and secure',
};

export const SnippetMessage = {
  you: 'You',
};

export const ReceivedNotificationType = {
  Analysis_Ready: 'analysis_ready',
};
