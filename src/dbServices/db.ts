import SQLite from 'react-native-sqlite-storage';
import {createAssistantTable} from './assistant';
import {
  createMessagesTable,
  createQuestionsTable,
  createChoicesTable,
  createMessageProcessTable,
  createMessageAttachmentsTable,
} from './messages';
import {tablesList} from '../constants/sqliteQueryConstants';
export const openDataBase = () => {
  var dbRef = SQLite?.openDatabase({
    name: 'AmoriMobileDB',
    location: 'default',
  });
  return dbRef;
};

export const createAllTablesIfNotAlready = async (dbRef: any = null) => {
  createAssistantTable(dbRef);
  createMessagesTable(dbRef);
  createQuestionsTable(dbRef);
  createChoicesTable(dbRef);
  createMessageProcessTable(dbRef);
  createMessageAttachmentsTable(dbRef);
};

export const deleteAllDBTablesData = async (dbRef: any = null) => {
  const tablesLength = tablesList;
  tablesLength?.map(async (tableName: string) => {
    dbRef.transaction(async tx => {
      await tx.executeSql(`DELETE FROM ${tableName}`);
    });
  });
};
