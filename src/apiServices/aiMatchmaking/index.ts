import {AIMatchmakingRegisterReqData} from '../../../@types/common';
import {
  AI_MATCHMAKING_REGISTER_URL,
  GET_CITIES_URL,
  GET_CURRENT_AI_MATCHMAKING_URL,
} from '../../constants/apiConstants';
import api from '../index';

export const aiMatchmakingRegister = async (
  reqData: AIMatchmakingRegisterReqData,
) => {
  const data = await api.post(`${AI_MATCHMAKING_REGISTER_URL}`, reqData);
  return data?.data;
};

export const getCities = async (query: string, cityCursor: string) => {
  let cityApi = query
    ? `${GET_CITIES_URL}?limit=20&query=${query}`
    : `${GET_CITIES_URL}?limit=20`;

  if (cityCursor) {
    cityApi = `${cityApi}&cursor=${cityCursor}`;
  }
  const data = await api.get(cityApi);
  return data?.data;
};

export const getCurrentAIMatchmaking = async () => {
  const data = await api.get(GET_CURRENT_AI_MATCHMAKING_URL);
  return data?.data;
};
