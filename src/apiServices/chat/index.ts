import axios from 'axios';
import {
  getMessages,
  ansQuestions,
  sendMessageQuery,
  markLastMessageReadApi,
} from '../../constants/apiConstants';
import api from '../index';

export const getMessagesData = async (queryParams: any) => {
  const messagesLimit = 100;
  if (!queryParams?.queryKey[1]) {
    return false;
  }
  const {data} = await api.get(
    `${getMessages(queryParams?.queryKey[1], messagesLimit)}`,
  );
  return data;
};

export const addQuestionAnswer = async (queryParams: any) => {
  const {data} = await api.post(
    `${ansQuestions(queryParams?.messageId)}`,
    queryParams?.reqBody,
  );
  return data;
};

export const sendMessageToServerCall = async (queryParams: any) => {
  const {data} = await api.post(
    `${sendMessageQuery(queryParams?.channelId)}`,
    queryParams?.reqBody,
  );
  return data;
};

export const markLastMessageReadCall = async (messageId: any) => {
  const {data} = await api.post(`${markLastMessageReadApi(messageId)}`);
  return data;
};
