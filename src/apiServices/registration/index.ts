/**
 * Amori Api services for @Registration flow
 */
import {Config} from 'react-native-config';
import {
  CHECK_AND_GET_USER,
  CREATE_USER,
  DELETE_UPLOADS,
  GET_APPS_URL,
  GET_PERSONALITIES,
  GET_RECENT_UPLOADS,
  REDEEM_CODE,
  UPDATE_USER,
} from '../../constants/apiConstants';
import {
  CreateUserReqData,
  RedeemCodeReqData,
  UpdateUserReqData,
} from '../../../@types/common';

import api from '../index';
import {UserDataType} from '../../../@types/context';

export const checkAndGetUser = async () => {
  try {
    const data = await api.get(`${CHECK_AND_GET_USER}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getPersonalitiesData = async () => {
  const {data} = await api.get(`${GET_PERSONALITIES}`);
  return data;
};

export const createUser = async (
  reqData: CreateUserReqData,
): Promise<UserDataType> => {
  type CreateUserResData = {data: UserDataType};

  try {
    const response = await api.post<CreateUserResData>(
      `${CREATE_USER}`,
      reqData,
    );
    return response.data.data;
  } catch (err) {
    throw new Error(`Failed to create user: ${err}`);
  }
};

export const updateUser = async (reqData: UpdateUserReqData) => {
  const response = await api.patch(`${UPDATE_USER}`, reqData);
  if (response?.status === 201 || response?.status === 200) {
    return response?.data;
  } else {
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async () => {
  const response = await api.delete(`${Config.BASE_URL}${UPDATE_USER}`);
  if (response?.status > 200 || response?.status < 206) {
    return response?.data;
  } else {
    throw new Error('Failed to update user');
  }
};

export const redeemCode = async (reqData: RedeemCodeReqData) => {
  const response = await api.post(`${REDEEM_CODE}`, reqData);
  if (
    response?.status === 201 ||
    response?.status === 200 ||
    response?.status === 204
  ) {
    return response?.data;
  } else {
    throw new Error('Failed to create user');
  }
};

export const getAppSoreLinksData = async () => {
  const {data} = await api.get(`${GET_APPS_URL}`);
  return data;
};

export const getRecentUploadsData = async () => {
  const {data} = await api.get(`${GET_RECENT_UPLOADS}`);
  return data;
};

export const deleteUpload = async (uploadId: string) => {
  const response = await api.delete(`${Config.BASE_URL}${DELETE_UPLOADS}/${uploadId}`);
  if (response?.status > 200 || response?.status < 206) {
    return response?.data;
  } else {
    throw new Error('Failed to delete upload id');
  }
};
