import _ from 'lodash';
import {
  CREATE_CHOICES_TABLE_QUERY,
  CREATE_MESSAGES_TABLE_QUERY,
  CREATE_MESSAGE_ATTACHMENTS_TABLE_QUERY,
  CREATE_MESSAGE_PROCESS_TABLE_QUERY,
  CREATE_QUESTIONS_TABLE_QUERY,
  GET_CHOICES_DATA_QUERY,
  GET_FULL_MESSAGES_DATA_QUERY,
  GET_LATEST_MESSAGES_DATA_QUERY,
  GET_QUESTIONS_DATA_QUERY,
  GET_UPDATE_MAY_BE_LATER_CHOICE_QUERY,
  GET_UPDATE_MESSAGE_ATTACHMENTS_TYPE_QUERY,
  GET_UPDATE_MESSAGE_CHOICES_QUERY,
  GET_UPDATE_MESSAGE_CHOICES_QUERY_NEW,
  GET_UPDATE_MESSAGE_CONTENT_QUERY,
  GET_UPDATE_MESSAGE_PROCESS_QUERY,
} from '../constants/sqliteQueryConstants';
import {
  getAttachmentsParamForDB,
  getChoicesParamForDB,
  getQuestionsParamForDB,
} from '../utility/chatUtility';
import {
  ChatMessagesType,
  MessageAttachmentsType,
  MessageChaoiceType,
  MessageProcessType,
} from '../types';

/**
 * @Create Sections
 */

export const createMessagesTable = async (dbRef: any = null) => {
  const query_create = CREATE_MESSAGES_TABLE_QUERY;
  try {
    if (dbRef) {
      await dbRef?.executeSql(query_create);
    }
  } catch (err) {
    console.log({err});
  }
};

export const createQuestionsTable = async (dbRef: any = null) => {
  const query_create = CREATE_QUESTIONS_TABLE_QUERY;
  try {
    if (dbRef) {
      await dbRef?.executeSql(query_create);
    }
  } catch (err) {
    console.log({err});
  }
};

export const createChoicesTable = async (dbRef: any = null) => {
  const query_create = CREATE_CHOICES_TABLE_QUERY;
  try {
    if (dbRef) {
      await dbRef?.executeSql(query_create);
    }
  } catch (err) {
    console.log({err});
  }
};

export const createMessageProcessTable = async (dbRef: any = null) => {
  const query_create = CREATE_MESSAGE_PROCESS_TABLE_QUERY;
  try {
    if (dbRef) {
      await dbRef?.executeSql(query_create);
    }
  } catch (err) {
    console.log({err});
  }
};

export const createMessageAttachmentsTable = async (dbRef: any = null) => {
  const query_create = CREATE_MESSAGE_ATTACHMENTS_TABLE_QUERY;
  try {
    if (dbRef) {
      await dbRef?.executeSql(query_create);
    }
  } catch (err) {
    console.log({err});
  }
};

/**
 *
 * @Add_Into_DB Section
 */

export const addMessageDataIntoDB = async (query: string, msgsList: any) => {
  const query_insert = query;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      _.each(msgsList, msg => {
        const paramsData = Object.values(msg);
        dbRef.executeSql(
          query_insert,
          paramsData,
          (result: any) => {
            var length = result.rows.length;
            for (var i = 0; i < length; i++) {
              console.log('resultSet.rows.item(i):', result.rows.item(i));
            }
            resolve({success: true});
          },
          (error: any) => {
            console.log('Add Message error:', error);
            reject(error);
          },
        );
      });
    } catch (err) {
      reject(err);
      console.log('Add Message error Catch:', err);
    }
  });
};

export const addQuestionDataIntoDB = async (
  query: string,
  questionsList: any,
) => {
  const query_insert = query;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      _.each(questionsList, msg => {
        const paramsData = getQuestionsParamForDB(msg);
        dbRef.executeSql(
          query_insert,
          paramsData,
          (result: any) => {
            resolve({success: true});
          },
          (error: any) => {
            reject(error);
            console.log('Add Question error:', error);
          },
        );
      });
    } catch (err) {
      reject(err);
      console.log('Add Question error Catch:', err);
    }
  });
};

export const addMessageProcessIntoDB = async (
  query: string,
  process: MessageProcessType,
) => {
  const query_insert = query;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      dbRef.executeSql(
        query_insert,
        process,
        (result: any) => {
          resolve({success: true});
        },
        (err: any) => {
          reject(err);
          console.log('Add Process error:', err);
        },
      );
    } catch (err) {
      reject(err);
      console.log('Add Process error Catch:', err);
    }
  });
};

export const addChoicesDataIntoDB = async (
  query: string,
  choicesList: Array<MessageChaoiceType>,
) => {
  const query_insert = query;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      _.each(choicesList, msg => {
        const paramsData = getChoicesParamForDB(msg);
        dbRef.executeSql(
          query_insert,
          paramsData,
          (result: any) => {
            resolve({success: true});
          },
          (error: any) => {
            reject(error);
            console.log('Add Choices error:', error);
          },
        );
      });
    } catch (err) {
      reject(err);
      console.log('Add Choices error Catch:', err);
    }
  });
};

export const addAttachmentsDataIntoDB = async (
  query: string,
  attachmentsList: Array<MessageAttachmentsType>,
) => {
  const query_insert = query;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      _.each(attachmentsList, attachmentsList => {
        _.each(attachmentsList, msg => {
          const paramsData = getAttachmentsParamForDB(msg);
          dbRef.executeSql(
            query_insert,
            paramsData,
            (result: any) => {
              resolve({success: true});
            },
            (error: any) => {
              reject(error);
            },
          );
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @Get_From_DB Section
 */

export const getMessagesOfChannelFromDB = async (channelId: string) => {
  const query_create = `${GET_FULL_MESSAGES_DATA_QUERY(channelId)}`;

  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      if (dbRef) {
        dbRef.transaction(tx => {
          tx.executeSql(
            query_create,
            [],
            (tx, resultSet) => {
              const msgsList = [];
              var length = resultSet.rows.length;
              for (var i = 0; i < length; i++) {
                msgsList.push(resultSet.rows.item(i));
              }
              resolve(msgsList);
            },
            error => {
              console.log('List user error', error);
              reject({error: error});
            },
          );
        });
      }
    } catch (err) {
      console.log('MessagesData Error:', err);
      reject({error: err});
    }
  });
};

export const getLastMessagesOfChannelFromDB = async (channelId: string) => {
  const query_create = `${GET_LATEST_MESSAGES_DATA_QUERY(channelId)}`;

  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      if (dbRef) {
        dbRef.transaction(tx => {
          tx.executeSql(
            query_create,
            [],
            (tx, resultSet) => {
              const msgsList = [];
              var length = resultSet.rows.length;
              for (var i = 0; i < length; i++) {
                msgsList.push(resultSet.rows.item(i));
              }
              resolve(msgsList);
            },
            error => {
              console.log('List user error', error);
              reject({error: error});
            },
          );
        });
      }
    } catch (err) {
      console.log('LastMessages Data Error:', err);
      reject({error: err});
    }
  });
};

export const getQuestionsDataFromDB = async () => {
  const query_create = GET_QUESTIONS_DATA_QUERY;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      if (dbRef) {
        dbRef.transaction(tx => {
          tx.executeSql(
            query_create,
            [],
            (tx, resultSet) => {
              const msgsList = [];
              var length = resultSet.rows.length;
              for (var i = 0; i < length; i++) {
                msgsList.push(resultSet.rows.item(i));
              }
              resolve(msgsList);
            },
            error => {
              console.log('getQuestionsDataFromDB error', error);
              reject({error: error});
            },
          );
        });
      }
    } catch (err) {
      console.log('getQuestionsDataFromDB Error:', err);
      reject({error: err});
    }
  });
};

export const getChoicesDataFromDB = async () => {
  const query_create = GET_CHOICES_DATA_QUERY;
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      if (dbRef) {
        dbRef.transaction(tx => {
          tx.executeSql(
            query_create,
            [],
            (tx, resultSet) => {
              const msgsList = [];
              var length = resultSet.rows.length;
              for (var i = 0; i < length; i++) {
                msgsList.push(resultSet.rows.item(i));
              }
              resolve(msgsList);
            },
            error => {
              console.log('getQuestionsDataFromDB error', error);
              reject({error: error});
            },
          );
        });
      }
    } catch (err) {
      console.log('getQuestionsDataFromDB Error:', err);
      reject({error: err});
    }
  });
};

/**
 * @Update into DB Section
 */
export const updateMessageProcessIntoDB = async (
  processData: MessageProcessType,
) => {
  const query_insert = GET_UPDATE_MESSAGE_PROCESS_QUERY(processData);
  return new Promise(async (resolve, reject) => {
    try {
      const paramsData = Object.values(processData);
      const dbRef = global.dbLocalRef;
      dbRef.executeSql(
        query_insert,
        paramsData,
        (result: any) => {
          var length = result.rows.length;
          console.log('Process Added in DB:', length);
          resolve({success: true});
        },
        (err: any) => {
          reject(err);
          console.log('Add Process error:', err);
        },
      );
    } catch (err) {
      reject(err);
      console.log('Add Process error Catch:', err);
    }
  });
};

export const updateMessageChoicesIntoDB = async (
  choicesData: MessageChaoiceType,
) => {
  const query_insert = GET_UPDATE_MESSAGE_CHOICES_QUERY(choicesData);
  return new Promise(async (resolve, reject) => {
    try {
      const paramsData = Object.values(choicesData);
      const dbRef = global.dbLocalRef;
      dbRef.executeSql(
        query_insert,
        [],
        (result: any) => {
          var length = result.rows.length;
          console.log('Choices Updated in DB:', length);
          resolve({success: true});
        },
        (err: any) => {
          reject(err);
          console.log('Choices Updated error:', err);
        },
      );
    } catch (err) {
      reject(err);
      console.log('Choices Updated error Catch:', err);
    }
  });
};

export const updateMessageChoicesIntoDBNew = async (
  choicesData: MessageChaoiceType,
) => {
  const query_insert = GET_UPDATE_MESSAGE_CHOICES_QUERY_NEW(choicesData);
  return new Promise(async (resolve, reject) => {
    try {
      const paramsData = Object.values(choicesData);
      const dbRef = global.dbLocalRef;
      dbRef.executeSql(
        query_insert,
        paramsData,
        () => {
          resolve({success: true});
        },
        (err: any) => {
          reject(err);
        },
      );
    } catch (err) {
      reject(err);
    }
  });
};

export const updateMayBeChoiceIntoDB = async (
  choicesData: MessageChaoiceType,
) => {
  const query_insert = GET_UPDATE_MAY_BE_LATER_CHOICE_QUERY(choicesData);
  return new Promise(async (resolve, reject) => {
    try {
      const paramsData = Object.values(choicesData);
      const dbRef = global.dbLocalRef;
      dbRef.executeSql(
        query_insert,
        [],
        (result: any) => {
          var length = result.rows.length;
          console.log('Choices Updated in DB:', length);
          resolve({success: true});
        },
        (err: any) => {
          reject(err);
          console.log('Choices Updated error:', err);
        },
      );
    } catch (err) {
      reject(err);
      console.log('Choices Updated error Catch:', err);
    }
  });
};

export const updateMessageContentInDB = async (
  messageData: ChatMessagesType,
) => {
  const query_insert = GET_UPDATE_MESSAGE_CONTENT_QUERY(messageData);
  return new Promise(async (resolve, reject) => {
    try {
      const paramsData = Object.values(messageData);
      const dbRef = global.dbLocalRef;
      dbRef.executeSql(
        query_insert,
        paramsData,
        () => {
          resolve({success: true});
        },
        (err: any) => {
          reject(err);
        },
      );
    } catch (err) {
      reject(err);
    }
  });
};

export const updateMessageAttachmentsTypeInDB = async (
  attachmentMsgsList: Array<ChatMessagesType>,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbRef = global.dbLocalRef;
      _.each(attachmentMsgsList, msg => {
        const query_update = GET_UPDATE_MESSAGE_ATTACHMENTS_TYPE_QUERY(
          msg?.attachments[0],
          msg?.id,
        );
        dbRef.executeSql(
          query_update,
          [msg?.attachments[0]?.type, msg?.id],
          () => {
            resolve({success: true});
          },
          (err: any) => {
            console.log('attchment type add error:', err);
            reject(err);
          },
        );
      });
    } catch (err) {
      console.log('attchment type update error:', err);
      reject(err);
    }
  });
};
