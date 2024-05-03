export enum PrimaryButtonType {
  FullButton = 'FullButton',
  ContentWidthButton = 'ContentWidthButton',
}

export enum MessageType {
  Text = 'text',
  FillQuestionnaire = 'fillQuestionnaire',
  ChatLoading = 'chatLoading',
  UploadConversation = 'uploadConversation',
  GoToRelationships = 'goToRelationships',
  EditRelationship = 'editRelationship',
  UploadedConversation = 'uploadedConversation',
  ViewAnalysis = 'viewanalysis',
  AttachmentStyleAnalysis = 'attachmentStyleAnalysis',
  RelationshipHealthStatus = 'relationshipHealthStatus',
  Template = 'template',
  Getting_Analysis_Ready = 'gettingAnalysisReady',
  MayBeLater = 'mayBeLater',
}

export enum MessageOptionPressEventType {
  UploadConversation = 'uploadConversation',
  GoToRelationships = 'goToRelationships',
  EditRelationship = 'editRelationship',
  FillQuestionnaire = 'fillQuestionnaire',
  AttachmentStyleAnalysis = 'attachmentStyleAnalysis',
  RelationshipHealthStatus = 'relationshipHealthStatus',
  MayBeLater = 'mayBeLater',
  UploadedConversatopn = 'uploadedConversation',
}

export enum MixpanelData {
  relationshipHealthStatus = 'relationship health Status',
  attachmentStyleAnalysis = 'attachment styles',
  ex_partner = 'ex partner',
  current_partner = 'current partner',
  someone_i_am_talking_to = 'someone i am talking to',
  prefer_not_to_say = 'prefer not to say',
  relationship_health_status = 'relationship health status',
  attachment_styles = 'attachment styles',
  technical_issues = 'technical issues',
  no_longer_dating = 'no longer dating',
  privacy_concerns = 'privacy concerns',
  cost_too_much = 'cost too much',
  dont_like_RNCodeForClientReview = "don't like RNCodeForClientReview",
  he = 'he/him',
  she = 'she/her',
  they = 'they/them',
  fill_out_questionnaire = 'fill out questionnaire',
  may_be_later = 'maybe later',
  go_to_relationships = 'go to relationships',
}

export enum MessageContentType {
  MayBeLater = 'maybe_later',
  User = 'user',
  You_Uploaded_Conversations = 'you_uploaded_a_conversation',
  Getting_Your_Analysis_Ready = 'getting_your_analysis_ready',
}
