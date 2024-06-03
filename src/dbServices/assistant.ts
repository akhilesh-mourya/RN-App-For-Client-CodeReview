import {
  ADD_ASSISTANT_QUERY,
  CREATE_ASSISTANT_TABLE_QUERY,
  GET_ASSISTANT_DATA_QUERY,
} from '../constants/sqliteQueryConstants';

export const createAssistantTable = async (dbRef: any = null) => {
  const query_create = CREATE_ASSISTANT_TABLE_QUERY;
  try {
    if (dbRef) {
      await dbRef?.executeSql(query_create);
    }
  } catch (err) {
    console.log({err});
  }
};

const paramsData = [
  '1',
  'https://dev-amori-assets.s3.amazonaws.com/assistants/grace.jpg',
  'Description',
  'Its Intro',
  'Name',
  'Title',
];

export const addAssistantDataInDB = async (
  dbRef: any = null,
  query: string,
  params: any = paramsData,
) => {
  const query_insert = ADD_ASSISTANT_QUERY;
  try {
    dbRef.executeSql(
      query_insert,
      paramsData,
      result => {
        Alert.alert('Success', 'User created successfully.');
      },
      error => {
        console.log('Create user error', error);
      },
    );
  } catch (err) {
    console.log('err', err);
  }
};

export const getAssistantDataFromDB = async (dbRef: any = null) => {
  const query_create = GET_ASSISTANT_DATA_QUERY;
  return new Promise((resolve, reject) => {
    try {
      if (dbRef) {
        dbRef.transaction(tx => {
          tx.executeSql(
            query_create,
            [],
            (tx, resultSet) => {
              var length = resultSet.rows.length;
              if (length === 0) {
                resolve([]);
              } else {
                const list = [];
                for (var i = 0; i < length; i++) {
                  list?.push(resultSet.rows.item(i));
                }
                resolve(list);
              }
            },
            error => {
              console.log('List user error', error);
              reject({error: error});
            },
          );
        });
      }
    } catch (err) {
      reject({error: err});
    }
  });
};
