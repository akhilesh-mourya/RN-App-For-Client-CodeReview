import {AssistantDataType, UserDataType} from '../../@types/context';
import {MessageType} from '../constants/enums';

export const getFirstAICoachMsgs = (
  coachData: AssistantDataType,
  userData: UserDataType,
) => {
  const messages = [
    {
      _id: 1,
      content: coachData?.intro,
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: 'text',
    },
    {
      _id: 2,
      content:
        'To get started, please fill out this questionnaire to help me understand your dating goals.',
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: 'fillQuestionnaire',
    },
  ];
  return messages;
};

export const getFirstAICoachMsgsAfterQuitionnare = (
  coachData: AssistantDataType,
  userData: UserDataType,
) => {
  const messages = [
    {
      _id: 1,
      content: coachData?.intro,
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 2,
      content:
        'To get started, I’d love for you to fill out this questionnaire that I’m adding to your file. This will help me understand your goals & preferences in dating.',
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 3,
      content: 'You filled out your relationship profile.',
      createdAt: new Date(),
      user: {
        _id: userData?.id,
        name: userData?.firstName,
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      contentType: MessageType.EditRelationship,
    },
    {
      _id: 4,
      content:
        'Thanks for filling that out! I see you’re interested in finding a relationship. I can help you with that 😉',
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 5,
      content:
        "Ready to run an analysis on your texts? Let's start by uploading a conversation. And don’t worry - we care about your privacy. Your chats will be stored securely and you can remove them at anytime.",
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.UploadConversation,
    },
  ];
  return messages;
};

export const getFirstAICoachMsgsAfterMayBeLater = (
  coachData: AssistantDataType,
  userData: UserDataType,
) => {
  const messages = [
    {
      _id: 1,
      content: coachData?.intro,
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 2,
      content:
        'To get started, I’d love for you to fill out this questionnaire that I’m adding to your file. This will help me understand your goals & preferences in dating.',
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 3,
      content: 'Maybe later',
      createdAt: new Date(),
      user: {
        _id: userData?.id,
        name: userData?.firstName,
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 4,
      content:
        'No worries! You can always fill out the questionnaire later from the homepage.',
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.Text,
    },
    {
      _id: 5,
      content:
        "Ready to run an analysis on your texts? Let's start by uploading a conversation. And don’t worry - we care about your privacy. Your chats will be stored securely and you can remove them at anytime.",
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.UploadConversation,
    },
  ];
  return messages;
};

export const getFirstAICoachMsgsAfterCovUpload = (
  coachData: AssistantDataType,
  userData: UserDataType,
) => {
  const messages = [
    {
      _id: 33,
      content: 'You uploaded a conversation',
      createdAt: new Date(),
      user: {
        _id: userData?.id,
        name: userData?.firstName,
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      contentType: MessageType?.UploadedConversation,
    },
    {
      _id: 23,
      content:
        'Getting  your analysis ready now. This may take a while - I’ll send you the results in George’s thread when they are ready.',
      createdAt: new Date(),
      user: {
        _id: coachData?.id,
        name: coachData?.name,
        avatar: coachData?.avatarUrl,
      },
      contentType: MessageType?.GoToRelationships,
    },
  ];
  return messages;
};
