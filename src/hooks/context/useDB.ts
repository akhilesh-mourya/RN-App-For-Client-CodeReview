import {useState} from 'react';
import {createAllTablesIfNotAlready, openDataBase} from '../../dbServices/db';

const useDB = () => {
  const [dbGLobalRef, setDbRef] = useState(null);
  async function openDB() {
    const dbRef = openDataBase();
    setDbRef(dbRef);
    global.dbLocalRef = dbRef;
    createAllTablesIfNotAlready(dbRef);
  }
  return {openDB, dbGLobalRef};
};

export default useDB;
