import moment from 'moment';
import {
  ChannelTypeEnum,
  MessageContentEnum,
  MessageStatusEnum,
  UploadTypeEnum,
} from '../enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirstAICoachMsgs,
  getFirstAICoachMsgsAfterCovUpload,
  getFirstAICoachMsgsAfterMayBeLater,
  getFirstAICoachMsgsAfterQuitionnare,
} from '../helpers/chatBotMessages';
import {AssistantDataType, UserDataType} from '../../@types/context';
import {
  AuthorsListType,
  ChannelDataType,
  ChatMessagesType,
  MessageChaoiceType,
  UploadedChatListType,
  UploadedChatType,
} from '../types';
import {MessageType} from '../constants/enums';
import i18next from 'i18next';
import {Platform} from 'react-native';

export const validateName = (name: string, isFirstName = false) => {
  name = name?.trim();
  if (!isFirstName && name?.length === 0) {
    return '';
  }
  if (name.length <= 1) {
    return isFirstName
      ? 'First name must be be more than 1 character.'
      : 'Last name must be be more than 1 character.';
  }
  if (name.length > 26) {
    return isFirstName
      ? 'First name must be less than 26 characters.'
      : 'Last name must be less than 26 characters.';
  }
  let nameRegEx = "^[a-zA-Z]+[-'’‘' ]?[a-zA-Z]+$";
  const condition = new RegExp(nameRegEx, 'g');

  if (!condition.test(name)) {
    return isFirstName
      ? 'First name cannot contain numbers or symbols.'
      : 'Last name cannot contain numbers or symbols.';
  }
  return '';
};

export const setOnboardingStepComplete = async (value: string) => {
  try {
    await AsyncStorage.setItem('ONBOARDING_COMPLETE_KEY', value);
  } catch (e) {
    // saving error
  }
};

export const getOnboardingStepComplete = async () => {
  try {
    const value = await AsyncStorage.getItem('ONBOARDING_COMPLETE_KEY');
    if (value !== null) {
      return value; // ONBOARDING/OTP_VERIFICATION/CREATE_USER/ENABLE_NOTIFICATION/DONE
    } else {
      return 'ONBOARDING';
    }
  } catch (e) {
    return 'ONBOARDING';
  }
};

export const setUserDataInAsync = async value => {
  try {
    await AsyncStorage.setItem('USER_DATA', JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('USER_DATA');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

export const setNotificationPopupVisible = async () => {
  try {
    await AsyncStorage.setItem('NOTIFICATION_POPUP_VISIBLE', 'YES');
  } catch (e) {
    // saving error
  }
};

export const getNotificationPopupVisible = async () => {
  try {
    const value = await AsyncStorage.getItem('NOTIFICATION_POPUP_VISIBLE');
    if (value !== null) {
      return value;
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

export const setRelationshipCreated = async (value: string = 'YES') => {
  try {
    await AsyncStorage.setItem('RELATIONHIP_CREATED', value);
  } catch (e) {
    // saving error
  }
};

export const getIsRelationshipCreated = async () => {
  try {
    const value = await AsyncStorage.getItem('RELATIONHIP_CREATED');
    if (value !== null) {
      return value;
    } else {
      return 'NO';
    }
  } catch (e) {
    return 'NO';
  }
};

export const setAIMatchMakingDataAsync = async value => {
  try {
    await AsyncStorage.setItem('AI_MATCHMAKING_DATA', JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getAIMatchMakingData = async () => {
  try {
    const value = await AsyncStorage.getItem('AI_MATCHMAKING_DATA');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

export const getChatBotMessages = (
  coachData: AssistantDataType,
  userData: UserDataType,
) => {
  const status = userData?.initialBotMessagesStatus;
  if (status?.isFillQuestionnarireDone && !status?.isConversationUploaded) {
    return getFirstAICoachMsgsAfterQuitionnare(coachData, userData);
  } else if (status?.isMayBeLaterDone && !status?.isConversationUploaded) {
    return getFirstAICoachMsgsAfterMayBeLater(coachData, userData);
  } else if (status?.isConversationUploaded) {
    const prevData = status?.isMayBeLaterDone
      ? getFirstAICoachMsgsAfterMayBeLater(coachData, userData)
      : getFirstAICoachMsgsAfterQuitionnare(coachData, userData);
    return [
      ...prevData,
      ...getFirstAICoachMsgsAfterCovUpload(coachData, userData),
    ];
  } else {
    return getFirstAICoachMsgs(coachData, userData);
  }
};

export const setRefreshToken = async value => {
  try {
    await AsyncStorage.setItem('REFRESH_TOKEN', value);
  } catch (e) {
    // saving error
  }
};

export const getRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem('REFRESH_TOKEN');
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const getFilteredCoachChannel = (
  channelsList: Array<ChannelDataType>,
) => {
  const filteredChannel = channelsList?.find(
    (channel: ChannelDataType) => channel?.type === ChannelTypeEnum.Coach,
  );
  return filteredChannel;
};

export const isLoadingMessage = (message: ChatMessagesType) => {
  let status = false;
  if (
    message?.process?.status ===
      MessageStatusEnum.MessageProcessStatusInQueue ||
    message?.process?.status ===
      MessageStatusEnum.MessageProcessStatusProcessing
  ) {
    status = true;
  }
  return status;
};

export const isFillQuestionnarireDone = (message: ChatMessagesType) => {
  let status = false;
  if (message?.content === MessageContentEnum.YouFillQuestionnaire) {
    status = true;
  }
  return status;
};

export const getMessageType = (message: ChatMessagesType) => {
  const choices: Array<MessageChaoiceType> = message?.question?.choices;
  let type = MessageType.Text;
  if (isLoadingMessage(message)) {
    type = MessageType.ChatLoading;
    return type;
  }
  if (message?.attachments?.length > 0) {
    if (message?.attachments[0].type === 'relationship_health_status') {
      type = MessageType.RelationshipHealthStatus;
      return type;
    } else {
      type = MessageType.AttachmentStyleAnalysis;
      return type;
    }
  }

  if (isFillQuestionnarireDone(message)) {
    type = MessageType.EditRelationship;
    return type;
  }
  if (!choices) {
    return type;
  }
  if (choices?.length > 0) {
    const selectedChoice = choices?.filter(o => {
      if (typeof o.selected === 'string') {
        return o.selected === 'true';
      }
      return o.selected;
    });
    if (selectedChoice.length === 0) {
      for (let choice of choices) {
        switch (choice.content) {
          case MessageContentEnum?.FillQuestionnaire:
            type = MessageType?.FillQuestionnaire;
            break;
          case MessageContentEnum?.UploadConversation:
            type = MessageType?.UploadConversation;
            break;
          case MessageContentEnum?.Getting_Your_Analysis_Ready:
            type = MessageType?.Getting_Analysis_Ready;
            break;
          default:
            break;
        }
      }
    } else if (selectedChoice.length === 1) {
      switch (selectedChoice[0].content) {
        case MessageContentEnum?.MayBeLater:
          type = MessageType?.MayBeLater;
          break;
        default:
          break;
      }
    }
  }
  return type;
};

const getAvtarImage = (
  message: ChatMessagesType | null = null,
  receiverData: any,
  personalitiesList: Array<any> = [],
) => {
  if (personalitiesList?.length === 0 || message == null) {
    return receiverData?.avatarUrl;
  } else {
    const filteredCoach = personalitiesList?.find(
      per => per?.id == message?.senderId,
    );
    if (filteredCoach) {
      return filteredCoach?.avatarUrl;
    } else {
      return receiverData?.avatarUrl;
    }
  }
};

export const configureChatMessages = (
  messages: Array<ChatMessagesType> = [],
  receiverData: any,
  personalitiesList: Array<any> = [],
) => {
  const _messages = [...messages];
  const updatedList = _messages?.map((message: ChatMessagesType) => {
    return {
      ...message,
      contentType: getMessageType(message),
      avatar: getAvtarImage(message, receiverData, personalitiesList),
    };
  });
  return updatedList;
};

export const getTime = (dt: any) => {
  moment.locale('en');
  return moment(dt).format('h:mm A');
};

export const extractNameDetails = (fullName: string = '') => {
  const nameArray = fullName?.split(' ');
  const firstName = nameArray[0];
  const lastName =
    nameArray.length > 1 ? nameArray[nameArray.length - 1][0] : '';
  return `${firstName} ${lastName}`;
};

export const configureWhatsappContentList = (whatsAppContents: any = []) => {
  const realData = whatsAppContents.filter(
    item => item?.author && item?.message,
  );
  const dataList: UploadedChatListType = realData.map(item => {
    return {
      sender: item?.author,
      sentAt: item?.date,
      content: item?.message,
      contentType: 'text',
    };
  });
  const isFirsEncryptedMsgFound = dataList?.some(
    item => item?.content === i18next.t('Whatsapp_First_Encrypted_Message'),
  );
  const filteredList: UploadedChatListType = isFirsEncryptedMsgFound
    ? dataList?.slice(1)
    : dataList;
  return filteredList;
};

export const getAuthorsFromUploadedChat = (
  chatListData: UploadedChatListType,
) => {
  const authorsList: AuthorsListType = [];
  chatListData?.map((chat: UploadedChatType) => {
    if (!authorsList?.includes(chat?.sender)) {
      authorsList?.push(chat?.sender);
    }
  });
  return authorsList;
};

export const getRelationshipsForUpload = (
  relationshipList: Array<any> = [],
  isWhatsappUpload: boolean = false,
  isFromUpdateAndDiffConv: boolean = false,
  existingRelation: any = null
) => {
  const source = isWhatsappUpload
    ? UploadTypeEnum.WhatsApp
    : UploadTypeEnum.IMessage;
  const filteredListForSource = relationshipList?.filter(
    relationData => relationData?.inputs[0]?.source === source,
  );
  if(isFromUpdateAndDiffConv) {
    const filteredListForUpdate = filteredListForSource?.filter(
      relationData => relationData?.id === existingRelation?.id,
    );
    return filteredListForUpdate;
  }
  return filteredListForSource;
};

export const isNamesDiffForUpdateRelation = (
  currCreaterelationshipData: any,
  authorsList: AuthorsListType,
) => {
  const selectedRelationData =
    currCreaterelationshipData?.selectedExistingRelData;
  const subData = selectedRelationData?.inputs[0];
  return !(
    authorsList?.includes(subData?.object) &&
    authorsList?.includes(subData?.subject)
  );
};

export const getUpdatedContextDataForPreNames = (
  currCreaterelationshipData: any,
) => {
  const selectedRelationData =
    currCreaterelationshipData?.selectedExistingRelData;
  const subData = selectedRelationData?.inputs[0];
  let data = {
    ...currCreaterelationshipData,
    name: subData?.subject,
    otherUserName: subData?.object,
    isAlreadyExist: false,
    isFromSameRelationshipName: true,
  };
  return data;
};

export const getMacLinkShareOptions = (macLink: string) => {
  return Platform.select({
    ios: {
      activityItemSources: [
        {
          placeholderItem: {
            type: 'text',
            content: macLink,
            message: macLink,
          },
          subject: {
            default: 'sdfdsf',
          },
          item: {
            default: {
              type: 'text',
              content: macLink,
              message: macLink,
            },
          },
          linkMetadata: {
            title: 'Amori',
            icon: '',
          },
        },
      ],
      default: {
        title: 'Amori',
        subject: macLink,
        message: `${macLink}`,
      },
    },
  });
};

export const sanitizeString = (inputString: string) => {
  return inputString.replace(/[^\x00-\x7F]/g, '');
};

export const getFirstLetter = (value: string) => {
  return value?.charAt(0)?.toUpperCase() ?? '';
};

export const getEachFirstLetterCapitalize = (name: string) => {
  return name
    ?.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getFirstName = (_name: string) => {
  const nameArr = _name?.split(' ');
  if (nameArr?.length > 1) {
    return capitalizeFirstLetter(nameArr[0]);
  } else {
    return _name;
  }
};

export const capitalizeFirstLetter = (str: string) => {
  return str?.length ? str?.charAt(0)?.toUpperCase() + str?.slice(1) : str;
};
