import moment from 'moment';
import _, {AnyKindOfDictionary, chain} from 'lodash';
import {MessageContentEnum, MessageStatusEnum, StructuredProps} from '../enums';
import {MessageContentType, MessageType} from '../constants/enums';
import i18next from 'i18next';
import {
  addAttachmentsDataIntoDB,
  addChoicesDataIntoDB,
  addMessageDataIntoDB,
  addMessageProcessIntoDB,
  addQuestionDataIntoDB,
  getLastMessagesOfChannelFromDB,
  getMessagesOfChannelFromDB,
  updateMayBeChoiceIntoDB,
  updateMessageAttachmentsTypeInDB,
  updateMessageChoicesIntoDB,
  updateMessageChoicesIntoDBNew,
  updateMessageContentInDB,
} from '../dbServices/messages';
import {
  ADD_CHOICES_QUERY,
  ADD_MESSAGE_ATTACHMENTS_QUERY,
  ADD_MESSAGE_PROCESS_QUERY,
  ADD_MESSAGE_QUERY,
  ADD_QUESTIONS_QUERY,
} from '../constants/sqliteQueryConstants';
import {
  ChannelDataType,
  ChatMessagesType,
  MessageAttachmentsType,
  MessageChaoiceType,
  MessageProcessType,
  MessagesListType,
  QuestionsType,
} from '../types';
import {getOnlyFirstName} from '../helpers/commonFunctions';
import {getAnalysisData} from '../apiServices/main';

export const getSectionMessages = (messages: any[]) => {
  try {
    const result = chain(messages)
      .groupBy((item: any) =>
        moment(item?.createdAt, 'YYYY-MM-DDThh:mm:ss.000Z')
          // .minutes(
          //   Math.floor(
          //     moment(item?.createdAt, 'YYYY-MM-DDThh:mm:ss.000Z').minutes() /
          //       10,
          //   ) * 10,
          // )
          .format('MMM D, h:mm A'),
      )
      .map((_data: [any], _title: string) => ({
        title: _title,
        data: _data,
      }))
      .value();

    const _result: StructuredProps[] = [];
    result.map((_item: StructuredProps, _index: number) => {
      const _data: any[] = [];
      _item.data.map((chatItem: any) => {
        _data.push({...chatItem, sectionIndex: _index});
      });
      _result.push({..._item, data: _data});
    });
    return _result || [];
  } catch (error) {
    console.log('error:', error);
  }
};

export const configureMsgsOnMaybePress = (messagesList: Array<any>) => {
  const list = messagesList || [];
  const maybeMsg = {
    senderType: MessageContentType?.User,
    content: i18next.t('May_Be_Later'),
    createdAt: new Date(),
    channelId: messagesList?.[0]?.channelId,
  };
  list?.unshift(maybeMsg);
  const withLoading = addLoadingMessageToChat(list);
  return withLoading;
};

export const configureMsgsFillQuitionnairePress = (
  messagesList: Array<any>,
) => {
  const list = messagesList || [];
  const filledQuitionnareMsg = {
    senderType: MessageContentType?.User,
    content: 'you_filled_relationship_profile',
    createdAt: new Date(),
  };
  list?.unshift(filledQuitionnareMsg);
  const withLoading = addLoadingMessageToChat(list);
  return withLoading;
};

export const addLoadingMessageToChat = (messagesList: Array<any>) => {
  const list = messagesList || [];
  const loadingMsg = {
    process: {
      status: MessageStatusEnum.MessageProcessStatusProcessing,
    },
    createdAt: new Date(),
  };
  list?.unshift(loadingMsg);
  return list;
};

export const addMessagesDataInDB = async (
  messagesList: Array<ChatMessagesType>,
  channelId: string,
  appendDataInRead?: boolean,
) => {
  const questionDataList: Array<any> = [];
  const attachmentsDataList: Array<any> = [];
  const newMsgsList = messagesList?.map((rawMsg: ChatMessagesType) => {
    const msg = checkAndGetAnalysisToBeReadyMsg(rawMsg);
    if (msg?.question) {
      questionDataList.push({...msg?.question, message_id: msg?.id});
    }
    if (msg?.attachments?.length > 0) {
      attachmentsDataList.push(msg?.attachments);
    }
    if (msg?.process) {
      const process: MessageProcessType = {
        message_id: msg?.id,
        ...msg?.process,
      };
      const paramsData = Object.values(process);
      addMessageProcessIntoDB(ADD_MESSAGE_PROCESS_QUERY, paramsData);
    }

    if (attachmentsDataList?.length > 0) {
      // Add Data into questionsDb
      addAttachmentsDataIntoDB(
        ADD_MESSAGE_ATTACHMENTS_QUERY,
        attachmentsDataList,
      );
    }

    return {
      id: msg?.id,
      channel_id: msg?.channelId,
      sender_type: msg?.senderType,
      sender_id: msg?.senderId,
      content_type: msg?.contentType,
      content: msg?.content,
      created_at: msg?.createdAt,
      updated_at: msg?.updated_at || msg?.createdAt,
    };
  });
  try {
    await addMessageDataIntoDB(ADD_MESSAGE_QUERY, newMsgsList);
    if (questionDataList?.length > 0) {
      // Add Data into questionsDb
      await addQuestionsDataInDB(questionDataList);
    }
    readMessagesDataFromDB(channelId, appendDataInRead);
  } catch (error) {
    // readMessagesDataFromDB(channelId, appendDataInRead); //Commented, As it was creating duplicate run issue
  }
};

export const addQuestionsDataInDB = (questionDataList: Array<any>) => {
  return new Promise(async (resolve, reject) => {
    await addQuestionDataIntoDB(ADD_QUESTIONS_QUERY, questionDataList);
    await addChoicesDataInDB(questionDataList);
    resolve({success: true});
  });
};

export const addChoicesDataInDB = (questionDataList: Array<QuestionsType>) => {
  const _choicesList: any = [];
  questionDataList?.map((question: QuestionsType) => {
    question?.choices?.map((choice: MessageChaoiceType) => {
      const data = {
        ...choice,
        question_id: question?.id,
        message_id: question?.message_id,
      };
      _choicesList.push(data);
    });
  });
  if (_choicesList?.length > 0) {
    //Add Data into choicesDb
    addChoicesDataIntoDB(ADD_CHOICES_QUERY, _choicesList);
  }
};

export const getQuestionsParamForDB = (questionItem: any) => {
  const quesId = questionItem?.id;
  const message_id = questionItem?.message_id;
  return [quesId, questionItem?.optional, message_id];
};

export const getChoicesParamForDB = (choiceData: MessageChaoiceType) => {
  const contentId = choiceData?.contentId;
  const quesId = choiceData?.question_id;
  const message_id = choiceData?.message_id;
  return [
    contentId,
    quesId,
    choiceData?.contentType,
    choiceData?.content,
    choiceData?.autoSelect,
    choiceData?.selected,
    message_id,
  ];
};

export const getAttachmentsParamForDB = (
  attachmentData: MessageAttachmentsType,
) => {
  return [
    attachmentData?.id,
    attachmentData?.messageId || attachmentData?.message_id,
    attachmentData?.contentType || attachmentData?.content_type,
    attachmentData?.content,
    attachmentData?.createdAt || attachmentData?.created_at,
    attachmentData?.type,
  ];
};

export const readMessagesDataFromDB = async (
  channelId: string,
  appendDataInRead: boolean = false,
) => {
  const msgData = appendDataInRead
    ? await getLastMessagesOfChannelFromDB(channelId)
    : await getMessagesOfChannelFromDB(channelId);

  const result = [
    ...msgData
      .reduce((acc, {id, attachment_id, ...rest}) => {
        const group = acc.get(id);
        const groupAttachment = acc.get(attachment_id);
        if (group) {
          group.question.choices.push({
            contentId: rest?.contentId,
            contentType: rest?.content_type,
            content: rest?.choice_content,
            autoSelect: rest?.autoSelect,
            selected: rest?.selected,
          });
        } else if (groupAttachment) {
          groupAttachment.attachments.push({
            id: attachment_id,
            content: rest?.attachment_content,
            content_type: rest?.attachment_content_type,
            created_at: rest?.attachment_created_at,
          });
        } else {
          if (rest?.question_id) {
            acc.set(id, {
              id,
              channelId: rest?.channel_id,
              senderType: rest?.sender_type,
              senderId: rest?.sender_id,
              contentType: rest?.content_type,
              content: rest?.content,
              createdAt: rest?.created_at,
              question: {
                id: rest?.question_id,
                optional: rest?.optional,
                choices: [
                  {
                    contentId: rest?.contentId,
                    contentType: rest?.content_type,
                    content: rest?.choice_content,
                    autoSelect: rest?.autoSelect,
                    selected: rest?.selected,
                  },
                ],
              },
            });
          } else if (rest?.status) {
            acc.set(id, {
              id,
              channelId: rest?.channel_id,
              senderType: rest?.sender_type,
              senderId: rest?.sender_id,
              contentType: rest?.content_type,
              content: rest?.content,
              createdAt: rest?.created_at,
              process: {
                status: rest?.status,
                updatedAt: rest?.updated_at,
              },
            });
          } else if (attachment_id) {
            acc.set(id, {
              id,
              channelId: rest?.channel_id,
              senderType: rest?.sender_type,
              senderId: rest?.sender_id,
              contentType: rest?.content_type,
              content: rest?.content,
              createdAt: rest?.created_at,
              attachments: [
                {
                  id: attachment_id,
                  content: rest?.attachment_content,
                  content_type: rest?.attachment_content_type,
                  created_at: rest?.attachment_created_at,
                  message_id: rest?.attachment_message_id,
                  type: rest?.attachment_type,
                },
              ],
            });
          } else {
            acc.set(id, {
              id,
              channelId: rest?.channel_id,
              senderType: rest?.sender_type,
              senderId: rest?.sender_id,
              contentType: rest?.content_type,
              content: rest?.content,
              createdAt: rest?.created_at,
            });
          }
        }
        return acc;
      }, new Map())
      .values(),
  ];
  appendDataInRead
    ? appendMessagesDataInContext(result)
    : setMessagesDataInContext(result);
  return result;
};

export const setMessagesDataInContext = (msgs: MessagesListType) => {
  try {
    const updatedList = checkAndAddLastLoadingMsg(msgs);
    global.chatContextRef.setMessagesListContext(updatedList);
  } catch (error) {
    console.log('setMessagesDataInContext Error ===', error);
  }
};

export const appendMessagesDataInContext = (msgs: MessagesListType) => {
  try {
    global.chatContextRef.appendNewMsgs(msgs);
  } catch (error) {
    console.log('setMessagesDataInContext Error ===', error);
  }
};

export const checkAndRemoveLoadingMessage = (msgs: MessagesListType) => {
  let updatedMsgs = msgs;
  if (
    updatedMsgs?.length > 0 &&
    updatedMsgs[0]?.senderType !== MessageContentType?.User &&
    [
      MessageStatusEnum?.MessageProcessStatusInQueue,
      MessageStatusEnum?.MessageProcessStatusProcessing,
    ]?.includes(updatedMsgs[0]?.process?.status)
  ) {
    updatedMsgs?.shift();
  }
  return updatedMsgs;
};

export const checkAndAddLastLoadingMsg = (msgs: MessagesListType = []) => {
  const updatedMsg = {...msgs[0]};
  if (
    msgs?.length > 0 &&
    [
      MessageStatusEnum?.MessageProcessStatusInQueue,
      MessageStatusEnum?.MessageProcessStatusProcessing,
    ].includes(msgs[0]?.process?.status)
  ) {
    updatedMsg.senderType = 'Bot';
    return [updatedMsg, ...msgs];
  }
  return [...msgs];
};

export const getMessageDisable = (msgsList: MessagesListType) => {
  if (
    msgsList?.length > 0 &&
    msgsList[0]?.question &&
    !msgsList[0]?.question?.optional
  ) {
    return true;
  }
  return false;
};

export const updateFillQuitionnaireMsgIntoDB = async (
  msgsList: MessagesListType = [],
  callBack: Function = () => {},
) => {
  const fillQuiMsgData = msgsList?.find(
    (msg: ChatMessagesType) =>
      msg?.question?.id === MessageContentEnum.QuitionnaireGetStarted,
  );
  const choicesList = fillQuiMsgData?.question?.choices;
  // To Update in DB
  let updatedChoice: MessageChaoiceType = null;
  choicesList?.map((choice: MessageChaoiceType) => {
    if (
      choice?.content === MessageContentEnum.FillQuestionnaire ||
      choice?.content === MessageContentEnum.MayBeLater
    ) {
      updatedChoice = {
        ...choice,
        selected: true,
        autoSelect: true,
        message_id: fillQuiMsgData?.id,
      };
    }
  });
  await updateMessageChoicesIntoDB(updatedChoice);
  // To Update Screen Data
  const updatedData = msgsList?.map((msg: ChatMessagesType) => {
    if (msg?.question?.id === MessageContentEnum.QuitionnaireGetStarted) {
      const choicesArr = msg?.question?.choices?.map(
        (choice: MessageChaoiceType) => {
          if (
            choice?.content === MessageContentEnum.FillQuestionnaire ||
            choice?.content === MessageContentEnum.MayBeLater
          ) {
            return {
              ...choice,
              selected: true,
              autoSelect: true,
              message_id: fillQuiMsgData?.id,
            };
          } else {
            return choice;
          }
        },
      );
      return {
        ...msg,
        question: {...msg?.question, choices: choicesArr},
      };
    } else {
      return msg;
    }
  });
  callBack(updatedData);
};

export const updateMayBeLaterMsgIntoDB = async (
  msgsList: MessagesListType = [],
  callBack: Function = () => {},
) => {
  const fillQuiMsgData = msgsList?.find(
    (msg: ChatMessagesType) =>
      msg?.question?.id === MessageContentEnum.QuitionnaireGetStarted,
  );
  const choicesList = fillQuiMsgData?.question?.choices;
  // To Update in DB
  let updatedChoice: MessageChaoiceType = null;
  choicesList?.map((choice: MessageChaoiceType) => {
    if (choice?.content === MessageContentEnum.MayBeLater) {
      updatedChoice = {
        ...choice,
        selected: true,
        autoSelect: true,
        message_id: fillQuiMsgData?.id,
      };
    }
  });
  await updateMayBeChoiceIntoDB(updatedChoice);
  // To Update Screen Data
  const updatedData = msgsList?.map((msg: ChatMessagesType) => {
    if (msg?.question?.id === MessageContentEnum.QuitionnaireGetStarted) {
      const choicesArr = msg?.question?.choices?.map(
        (choice: MessageChaoiceType) => {
          if (choice?.content === MessageContentEnum.MayBeLater) {
            return {
              ...choice,
              selected: true,
              autoSelect: true,
              message_id: fillQuiMsgData?.id,
            };
          } else {
            return choice;
          }
        },
      );
      return {
        ...msg,
        question: {...msg?.question, choices: choicesArr},
      };
    } else {
      return msg;
    }
  });
  callBack(updatedData);
};

export const updateChoicesMsgIntoDB = async (
  choiceData: AnyKindOfDictionary,
) => {
  await updateMessageChoicesIntoDBNew(choiceData);
};

export const checkAndGetAnalysisToBeReadyMsg = (msg: ChatMessagesType) => {
  if (
    msg?.contentType === MessageType.Template &&
    msg?.content === MessageContentType.Getting_Your_Analysis_Ready
  ) {
    return {
      ...msg,
      question: {
        id: 'getting_your_analysis_ready',
        optional: true,
        choices: [
          {
            contentId: 'getting_your_analysis_ready',
            contentType: 'template',
            content: 'getting_your_analysis_ready',
            autoSelect: true,
            selected: false,
          },
        ],
      },
    };
  } else {
    return msg;
  }
};

export const getMessageContentToShow = (val: string, myRelationshipsList) => {
  if (val === MessageContentType?.MayBeLater) {
    return i18next.t('Maybe later');
  } else if (val === MessageContentType?.You_Uploaded_Conversations) {
    return 'You uploaded a conversation';
  } else if (val === MessageContentType.Getting_Your_Analysis_Ready) {
    const name =
      myRelationshipsList?.length > 0
        ? myRelationshipsList[0]?.name
        : 'Relationship';
    return i18next
      .t('Analysis_Being_Ready_Msg')
      .replace('$', getOnlyFirstName(name));
  } else {
    return val;
  }
};

export const checkForAnalysisTypeMessage = async (
  analysisId: string,
  resove: any,
  reject: any,
) => {
  try {
    const data = await getAnalysisData(analysisId);
    resove(data?.data);
  } catch (error) {
    reject(error);
  }
};

export const configreChatMessagesForAnalysisData = (
  messagesList: Array<ChatMessagesType>,
  analysisData: MessageAttachmentsType,
  typeData: any,
) => {
  const updatedList = messagesList?.map((message: ChatMessagesType) => {
    const msgId = analysisData?.messageId || analysisData?.message_id;
    if (message?.id === msgId) {
      return {
        ...message,
        attachments: [{...message?.attachments[0], type: typeData?.type}],
      };
    } else {
      return message;
    }
  });
  return updatedList;
};

export const configureRelationshipsDataIfLastMessage = (
  relationshipsList: Array<any>,
  channelsList: Array<ChannelDataType>,
  myUserId: string | number | undefined,
) => {
  if (channelsList?.length === 0) {
    return relationshipsList;
  }
  const updatedRelationships = relationshipsList?.map((relation: any) => {
    const channelId = relation?.channel?.id;
    const foundChannel = channelsList?.find(
      channel => channel?.id === channelId,
    );
    if (foundChannel) {
      const isRead = foundChannel?.latestMessage
        ? foundChannel?.latestMessage?.readers?.some(
            (readData: any) => readData?.userId === myUserId,
          )
        : false;
      return {
        ...relation,
        latestMessage: foundChannel?.latestMessage,
        isRead:
          foundChannel?.latestMessage?.senderType === 'assistant'
            ? isRead
            : true,
      };
    } else {
      return relation;
    }
  });
  return updatedRelationships;
};

export const checkCoachLastMesageRead = (
  channelData: ChannelDataType | undefined,
  myUserId: string | number | undefined,
) => {
  const isNotAssistantMsg =
    channelData?.latestMessage?.senderType !== 'assistant';
  if (isNotAssistantMsg) {
    return {
      ...channelData,
      isRead: true,
    };
  }
  const isRead = channelData?.latestMessage
    ? channelData?.latestMessage?.readers?.some(
        (readData: any) => readData?.userId === myUserId,
      )
    : false;
  return {
    ...channelData,
    isRead: isRead,
  };
};

export const getAssistantLastMessageId = (
  messages: Array<ChatMessagesType>,
) => {
  let messageId = '';
  const assistantMessagesList = messages?.filter(
    (message: ChatMessagesType) => message?.senderType === 'assistant',
  );
  if (assistantMessagesList?.length > 0) {
    messageId = assistantMessagesList[0]?.id;
  }
  return messageId;
};

export const updateMsgContentIntoDB = async (
  newMessageData: ChatMessagesType,
) => {
  await updateMessageContentInDB(newMessageData);
};

export const updateAttchmentsTypeInDB = (
  messagesList: Array<ChatMessagesType>,
) => {
  const attachmentMsgsList = messagesList?.filter(
    (message: ChatMessagesType) => message?.attachments?.length > 0,
  );
  if (attachmentMsgsList?.length > 0) {
    updateMessageAttachmentsTypeInDB(attachmentMsgsList);
  }
};

export const checkForAttachmentApiCall = (
  messagesList: Array<ChatMessagesType>,
) => {
  let isAnyWithoutType = false;
  const attachmentMsgsList = messagesList?.filter(
    (message: ChatMessagesType) => message?.attachments?.length > 0,
  );
  if (attachmentMsgsList?.length > 0) {
    _.each(attachmentMsgsList, msg => {
      _.each(msg?.attachments, attchment => {
        if (!attchment?.type) {
          isAnyWithoutType = true;
          return;
        }
      });
    });
    return isAnyWithoutType;
  } else {
    return isAnyWithoutType;
  }
};

export const shouldIgnoreMessage = (newMsg: ChatMessagesType) => {
  return (
    newMsg?.content === 'getting_your_analysis_ready' ||
    newMsg?.content === 'maybe_later' ||
    newMsg?.content ===
      'No worries! You can always fill out the questionnaire later from the homepage.' ||
    newMsg?.question?.id === 'upload_conversation' ||
    newMsg?.content === 'Thanks for filling out your relationship profile!' ||
    newMsg?.content ===
      "Ready to run an analysis on your texts? Let's start by uploading a conversation. And don’t worry - we care about your privacy. Your chats will be stored securely and you can remove them at any time."
  );
};

export const isJustAfterAnalysis = (messagesList: Array<ChatMessagesType>) => {
  if (messagesList?.length === 1) {
    const msg = messagesList[0];
    return msg?.content?.includes('Nice job completing your first analysis');
  } else {
    return false;
  }
};
