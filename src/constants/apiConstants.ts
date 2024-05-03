export const CHECK_AND_GET_USER = '/users/current';
export const GET_PERSONALITIES = '/assistants';
export const CREATE_USER = '/users';
export const getMessages = (channelId: string, limit: string | number = 10) => {
  return `/channels/${channelId}/messages?limit=${limit}`;
};

export const ansQuestions = (messageId: string) => {
  return `/messages/${messageId}/question/answer`;
};

export const markLastMessageReadApi = (messageId: string) => {
  return `/messages/${messageId}/read`;
};

export const getUserID = (userId: string) => {
  return `/${userId}`;
};
export const updateRelationshipsConstant = (relationshipId: string) => {
  return `/relationships/${relationshipId}/hydrate`;
};
export const getPusherMessageChannel = (userId: string | null) => {
  return `private-users-${userId}-messages`;
};
export const getPusherUploadsChannel = (userId: string | null) => {
  return `private-users-${userId}-uploads`;
};
export const sendMessageQuery = (channelId: string) => {
  return `/channels/${channelId}/messages`;
};
export const getCreateAnalysysQuery = (relationshipId: string | number) => {
  return `/relationships/${relationshipId}/analyses`;
};
export const getAnalysisListQuery = (relationshipId: string | number) => {
  return `/relationships/${relationshipId}/analyses?limit=20`;
};
export const GET_ASSISTANT_BY_ID = '/assistants/';
export const GET_RELATIONSHIPS = '/relationships';
export const POST_RELATIONSHIPS = '/relationships';
export const DELETE_RELATIONSHIP = '/relationships/';
export const EDIT_RELATIONSHIP = '/relationships/';
export const UPLOAD_WHATSAPP_CHAT = '/uploads/whatsapp';
export const GET_CHANNELS = '/channels';
export const UPDATE_USER = '/users/current';
export const UPLOAD_WHATSAPP_INFO = '/uploads/whatsapp/info';
export const UPLOAD_IMESSAGE_INFO = '/uploads/imessage/info';
export const GET_ANALYSIS = '/analyses/';
export const BEAM_AUTH_URL = '/pusher/beams/auth';
export const AI_MATCHMAKING_REGISTER_URL = '/matchmaking/registrations';
export const GET_CITIES_URL = '/cities';
export const GET_CURRENT_AI_MATCHMAKING_URL =
  '/matchmaking/registrations/current';
export const REDEEM_CODE = '/codes/redeem';
export const GET_APPS_URL = '/metadata';
export const GET_RECENT_UPLOADS = '/uploads';
export const DELETE_UPLOADS = '/uploads';

export const API_SUCCESS = 'success';
export const API_SUCCESS_STATUS_200 = 200;
export const API_SUCCESS_STATUS_201 = 201;
