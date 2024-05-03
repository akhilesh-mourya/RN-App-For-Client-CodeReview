/**
 * RNCodeForClientReview Api services for @Assistant flow
 */
import {Config} from 'react-native-config';
import axios from 'axios';
import {
  ApiConfig,
  CreateAnalysysReqData,
  CreateUserReqData,
  RelationshipReqData,
} from '../../../@types/common';
import {
  DELETE_RELATIONSHIP,
  EDIT_RELATIONSHIP,
  GET_ANALYSIS,
  GET_ASSISTANT_BY_ID,
  GET_CHANNELS,
  GET_RELATIONSHIPS,
  POST_RELATIONSHIPS,
  UPLOAD_IMESSAGE_INFO,
  UPLOAD_WHATSAPP_CHAT,
  getAnalysisListQuery,
  getCreateAnalysysQuery,
  updateRelationshipsConstant,
} from '../../constants/apiConstants';
import api from '../index';

export const getAssistantByIdData = async (
  getApiconfig: ApiConfig,
  assitantId: number,
) => {
  const data = await api.get(`${GET_ASSISTANT_BY_ID}${assitantId}`);
  return data?.data;
};

export const getRelationshipsData = async () => {
  const {data} = await api.get(`${GET_RELATIONSHIPS}`);
  return data;
};

export const getRelationshipInfo = async (relationshipId: string) => {
  const {data} = await api.get(`${GET_RELATIONSHIPS}/${relationshipId}`);
  return data;
};

export const createRelationship = async (
  reqData: RelationshipReqData,
  getApiconfig: ApiConfig,
) => {
  const response = await api.post(`${POST_RELATIONSHIPS}`, reqData);
  if (response?.status === 201 || response?.status === 200) {
    return response?.data;
  } else {
    throw new Error('Failed to upload chat');
  }
};

export const updateRelationship = async (
  reqData: RelationshipReqData,
) => {
  const relationshipId = reqData?.relationshipId;
  delete reqData.relationshipId;
  const response = await api.post(
    `${updateRelationshipsConstant(relationshipId)}`,
    reqData,
  );
  if ([200, 201, 204]?.includes(response?.status)) {
    return response?.data || {success: true};
  } else {
    throw new Error('Failed to upload chat');
  }
};

export const editRelationship = async (
  reqData: RelationshipReqData,
  getApiconfig?: ApiConfig,
) => {
  const relationshipId = reqData?.relationshipId;
  delete reqData.relationshipId;
  const response = await api.patch(
    `${EDIT_RELATIONSHIP}${relationshipId}`,
    reqData,
  );
  if ([200, 201, 204]?.includes(response?.status)) {
    return response?.data || {success: true};
  } else {
    throw new Error('Failed to update relationship');
  }
};

export const deleteRelationship = async (
  relationshipId: string | number,
  token: string | null,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.delete(
    `${Config.BASE_URL}${DELETE_RELATIONSHIP}${relationshipId}`,
    config,
  );
  if (response?.status > 200 || response?.status < 206) {
    return response?.data;
  } else {
    throw new Error('Failed to update user');
  }
};

export const uploadWhatsappChat = async (
  reqData: any,
) => {
  const response = await api.post(`${UPLOAD_WHATSAPP_CHAT}`, reqData);
  if (response?.status === 201 || response?.status === 200) {
    return response?.data;
  } else {
    throw new Error('Failed to upload chat');
  }
};

export const updateWhatsappChat = async (
  reqData: any,
) => {
  const response = await api.post(`${UPLOAD_WHATSAPP_CHAT}`, reqData);
  if (response?.status === 201 || response?.status === 200) {
    return response?.data;
  } else {
   return response;
  }
};

export const getChannelsList = async (getApiconfig: ApiConfig) => {
  const {data} = await api.get(`${GET_CHANNELS}`);
  return data;
};

export const createAnalysysCall = async (reqData: CreateAnalysysReqData) => {
  const response = await api.post(
    `${getCreateAnalysysQuery(reqData?.relationshipId)}`,
    reqData?.reqData,
  );
  if (response?.status === 201 || response?.status === 200) {
    return response?.data;
  } else {
    throw new Error('Failed to create analysys');
  }
};

export const getAnalysisListData = async (
  relationshipId: number | string,
  cursor?: string,
) => {
  let apiUrl = `/relationships/${relationshipId}/analyses?limit=20`;

  if (cursor) {
    apiUrl = `${apiUrl}&cursor=${cursor}`;
  }
  const data = await api.get(apiUrl);
  return data?.data;
};

export const getAnalysisData = async (analysisId: string | null) => {
  const data = await api.get(`${GET_ANALYSIS}${analysisId}`);
  return data?.data;
};

export const getiMessageUploadInfo = async (uploadId: string | null) => {
  const data = await api.post(`${UPLOAD_IMESSAGE_INFO}`, {uploadId: uploadId});
  return data?.data;
};
