export type UserDataType = {
  assistantId: number;
  firstName: string;
  lastName?: string;
  gender?: string;
  genderInterest?: string;
  id: string;
  phoneNumber: string | number;
  relationshipGoal?: string;
  pronoun?: string;
  relationshipStatus?: string;
  initialBotMessagesStatus?: {
    isFillQuestionnarireDone?: boolean;
    isMayBeLaterDone?: boolean;
    isConversationUploaded?: boolean;
  };
};

export type AssistantDataType = {
  avatarUrl: string;
  description: string;
  id: number;
  intro: string;
  name: string;
  title: string;
};
