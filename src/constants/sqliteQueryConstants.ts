/**
 * @RNCodeForClientReview All Sqlite queries goes here
 */

import {
  ChatMessagesType,
  MessageChaoiceType,
  MessageProcessType,
} from '../types';

export enum DBTable {
  Users_Table = 'users',
  Assistant_Table = 'assistant',
  Messages_Table = 'messages',
  Questions_Table = 'questions',
  Choices_Table = 'choices',
  MessageProcess_Table = 'message_process',
  MessageAttachments_Table = 'message_attachments',
}

export const tablesList = [
  DBTable?.Users_Table,
  DBTable?.Assistant_Table,
  DBTable?.Choices_Table,
  DBTable?.MessageProcess_Table,
  DBTable?.Messages_Table,
  DBTable?.Questions_Table,
  DBTable?.MessageAttachments_Table,
];

/**
 * Create Queries
 */
export const CREATE_USER_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.Users_Table}(id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT, phoneNumber TEXT NOT NULL UNIQUE, assistantId TEXT NOT NULL);`;

export const CREATE_ASSISTANT_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.Assistant_Table}(id TEXT PRIMARY KEY UNIQUE, avatarUrl TEXT, description TEXT, intro TEXT, name TEXT, title TEXT);`;

export const ADD_ASSISTANT_QUERY = `INSERT INTO ${DBTable.Assistant_Table} (id, avatarUrl, description, intro, name, title) VALUES (?, ?, ?, ?, ?, ?)`;

export const CREATE_MESSAGES_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.Messages_Table}(primary_id INTEGER PRIMARY KEY AUTOINCREMENT, id text text NOT NULL UNIQUE, channel_id text NOT NULL, sender_type text NOT NULL, sender_id text NOT NULL, content_type text NOT NULL, content text NOT NULL, created_at TIMESTAMP NOT NULL , updated_at TIMESTAMP NOT NULL );`;

export const CREATE_QUESTIONS_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.Questions_Table}(id text NOT NULL UNIQUE, optional boolean NOT NULL, message_id text);`;

export const CREATE_CHOICES_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.Choices_Table}(contentId text text NOT NULL UNIQUE, question_id text NOT NULL, contentType text, content text, autoSelect boolean, selected boolean, message_id text);`;

export const CREATE_MESSAGE_PROCESS_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.MessageProcess_Table} (message_id text NOT NULL UNIQUE, status text NOT NULL, updated_at NOT NULL);`;

export const CREATE_MESSAGE_ATTACHMENTS_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${DBTable.MessageAttachments_Table} (id text NOT NULL UNIQUE, message_id text, content_type text NOT NULL, content text NOT NULL, created_at TIMESTAMP NOT NULL, attachment_type text);`;

/**
 * Add Queries
 */

//Messages
export const ADD_MESSAGE_QUERY = `INSERT INTO ${DBTable.Messages_Table} (id, channel_id, sender_type, sender_id, content_type, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

export const ADD_QUESTIONS_QUERY = `INSERT INTO ${DBTable.Questions_Table} (id, optional, message_id) VALUES (?, ?, ?)`;

export const ADD_CHOICES_QUERY = `INSERT INTO ${DBTable.Choices_Table} (contentId, question_id, contentType, content, autoSelect, selected, message_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

export const ADD_MESSAGE_PROCESS_QUERY = `INSERT INTO ${DBTable.MessageProcess_Table} (message_id, status, updated_at) VALUES (?, ?, ?)`;

export const ADD_MESSAGE_ATTACHMENTS_QUERY = `INSERT INTO ${DBTable.MessageAttachments_Table} (id, message_id, content_type, content, created_at, attachment_type) VALUES (?, ?, ?, ?, ?, ?)`;

/**
 * Select Queries
 */

export const GET_ASSISTANT_DATA_QUERY = `SELECT * FROM ${DBTable.Assistant_Table}`;

export const GET_MESSAGES_DATA_QUERY = `SELECT * FROM ${DBTable.Messages_Table}`;

export const GET_QUESTIONS_DATA_QUERY = `SELECT * FROM ${DBTable.Questions_Table}`;

export const GET_CHOICES_DATA_QUERY = `SELECT * FROM ${DBTable.Choices_Table}`;

export const GET_MESSAGE_ATTACHMENTS_QUERY = `SELECT * FROM ${DBTable.MessageAttachments_Table}`;

export const GET_FULL_MESSAGES_DATA_QUERY = (channelId: string) => `SELECT 
messages.id,
messages.channel_id,
messages.sender_type,
messages.sender_id,
messages.content_type,
messages.content,
messages.created_at,
message_process.message_id,
message_process.status,
message_process.updated_at,
messages.primary_id,
questions.id AS question_id,
questions.optional,
choices.contentId,
choices.contentType,
choices.content AS choice_content,
choices.autoSelect,
choices.selected,
${DBTable?.MessageAttachments_Table}.id AS attachment_id,
${DBTable?.MessageAttachments_Table}.content_type AS attachment_content_type,
${DBTable?.MessageAttachments_Table}.content AS attachment_content,
${DBTable?.MessageAttachments_Table}.created_at AS attachment_created_at,
${DBTable?.MessageAttachments_Table}.message_id AS attachment_message_id,
${DBTable?.MessageAttachments_Table}.attachment_type
FROM messages
LEFT JOIN message_process ON messages.id = message_process.message_id
LEFT JOIN questions ON messages.id = questions.message_id
LEFT JOIN choices ON questions.id = choices.question_id
LEFT JOIN ${DBTable?.MessageAttachments_Table} ON messages.id = ${DBTable?.MessageAttachments_Table}.message_id
WHERE messages.channel_id = ${channelId}
ORDER BY messages.primary_id DESC`;

export const GET_LATEST_MESSAGES_DATA_QUERY = (channelId: string) => `SELECT 
messages.id,
messages.channel_id,
messages.sender_type,
messages.sender_id,
messages.content_type,
messages.content,
messages.created_at,
message_process.message_id,
message_process.status,
message_process.updated_at,
questions.id AS question_id,
questions.optional,
choices.contentId,
choices.contentType,
choices.content AS choice_content,
choices.autoSelect,
choices.selected,
${DBTable?.MessageAttachments_Table}.id AS attachment_id,
${DBTable?.MessageAttachments_Table}.content_type AS attachment_content_type,
${DBTable?.MessageAttachments_Table}.content AS attachment_content,
${DBTable?.MessageAttachments_Table}.created_at AS attachment_created_at,
${DBTable?.MessageAttachments_Table}.message_id AS attachment_message_id,
${DBTable?.MessageAttachments_Table}.attachment_type
FROM messages
LEFT JOIN message_process ON messages.id = message_process.message_id
LEFT JOIN questions ON messages.id = questions.message_id
LEFT JOIN choices ON questions.id = choices.question_id
LEFT JOIN ${DBTable?.MessageAttachments_Table} ON messages.id = ${DBTable?.MessageAttachments_Table}.message_id
WHERE messages.channel_id = ${channelId}
ORDER BY messages.created_at DESC LIMIT 1;`;

/**
 * Update Queries
 */

export const GET_UPDATE_MESSAGE_PROCESS_QUERY = (
  newMsgData: MessageProcessType,
) =>
  `UPDATE ${DBTable.MessageProcess_Table} SET status="${newMsgData?.status}" WHERE message_id=${newMsgData?.message_id}`;

export const GET_UPDATE_MESSAGE_CHOICES_QUERY = (
  newMsgData: MessageChaoiceType,
) =>
  `UPDATE ${DBTable.Choices_Table} SET autoSelect="${newMsgData?.autoSelect}", selected="${newMsgData?.selected}" WHERE message_id=${newMsgData?.message_id} AND contentId='fill_out_questionnaire'`;

export const GET_UPDATE_MESSAGE_CHOICES_QUERY_NEW = (
  newMsgData: MessageChaoiceType,
) =>
  `UPDATE ${DBTable.Choices_Table} SET autoSelect="${newMsgData?.autoSelect}", selected="${newMsgData?.selected}" WHERE message_id=${newMsgData?.message_id}`;

export const GET_UPDATE_MESSAGE_CONTENT_QUERY = (
  newMsgData: ChatMessagesType,
) =>
  `UPDATE ${DBTable.Messages_Table} SET content="${newMsgData?.content}" WHERE id=${newMsgData?.id}`;

export const GET_UPDATE_MESSAGE_ATTACHMENTS_TYPE_QUERY = () =>
  `UPDATE ${DBTable.MessageAttachments_Table} SET attachment_type=? WHERE message_id=?`;

export const GET_UPDATE_MAY_BE_LATER_CHOICE_QUERY = (
  newMsgData: MessageChaoiceType,
) =>
  `UPDATE ${DBTable.Choices_Table} SET autoSelect="${newMsgData?.autoSelect}", selected="${newMsgData?.selected}" WHERE message_id=${newMsgData?.message_id} AND contentId='maybe_later'`;
