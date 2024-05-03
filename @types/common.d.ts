export interface CreateUserReqData {
  assistantId: string | number;
  firstName: string;
  lastName?: string;
}

export interface UpdateUserReqData {
  gender?: string | undefined;
  genderInterest?: string | undefined;
  relationshipStatus?: string | undefined;
  relationshipGoal?: string | undefined;
  relationshipStatusCustom?: string | undefined;
  relationshipGoalCustom?: string | undefined;
  pronoun?: string | undefined;
  assistantId?: string | number;
}

export interface DeleteUserReqData {
  reason: string | undefined;
}

export interface RelationshipReqData {
  connection: string | undefined;
  name: string | undefined;
  initialAnalysisType?: string | undefined;
  uploadId: string | undefined;
  subject: string | undefined;
  object: string | undefined;
  objectPronoun: string | undefined;
}

export interface EditRelationshipReqData {
  name: string | undefined;
  connection?: string | undefined;
}

export interface CreateAnalysysReqData {
  type: string;
}

export interface HeaderConfig {
  Authorization: string;
  Accept: string;
  'Content-Type': string;
}

export interface ApiConfig {
  headers: HeaderConfig | any;
}

export interface AIMatchmakingRegisterReqData {
  birthDate: string;
  cityId: string;
}

export interface RedeemCodeReqData {
  value: string | number;
}
