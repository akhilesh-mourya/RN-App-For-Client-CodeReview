import React, {FC, useEffect, useState} from 'react';
import {ChannelDataType} from '../types';
import {useQuery} from 'react-query';
import {getRelationshipsData} from '../apiServices/main';
import useChat from '../hooks/context/useChat';
import {configureRelationshipsDataIfLastMessage} from '../utility/chatUtility';
import useAuth from '../hooks/context/useAuth';
import {getPersonalitiesData} from '../apiServices/registration';

interface RelationshipContextType {
  children: React.ReactElement;
}

const relationshipContextInitialState = {
  myRelationshipsList: [],
  setMyRelationshipsList: () => {},
  callgetRelationships: () => {},
  fetchPersonalities: () => {},
  personalitiesList: [],
  resetRelationshipSession: () => {},
};

export interface RelationshipContextProps {
  myRelationshipsList: Array<any>;
  setMyRelationshipsList: Function;
  callgetRelationships: Function;
  fetchPersonalities: Function;
  personalitiesList: Array<any>;
  resetRelationshipSession: Function;
  setAnalysisList: Function;
  analysisList: Array<any>;
}

export const RelationshipContext =
  React.createContext<RelationshipContextProps>(
    relationshipContextInitialState,
  );
const RelationshipContextProvider: FC<RelationshipContextType> = ({
  children,
}) => {
  const {chatContextData} = useChat();
  const {authContextData} = useAuth();
  const {data: relationShipsData, refetch: relationshipRefetch} = useQuery(
    'getRelationsShips',
    () => getRelationshipsData(),
    {
      enabled: true,
    },
  );
  const {data: personalityListData, refetch: fetchPersonalities} = useQuery(
    'getPersonalities',
    () => getPersonalitiesData(),
  );

  const [fetchReltionshipCalled, setFetchReltionshipCalled] = useState(false);
  const [myRelationshipsList, setMyRelationshipsList] = useState<
    Array<ChannelDataType>
  >(relationshipContextInitialState?.myRelationshipsList);
  const [personalitiesList, setPersonalitiesList] = useState([]);
  const [analysisList, setAnalysisList] = useState<Array<any>>([]);
  useEffect(() => {
    if (
      relationShipsData?.data &&
      chatContextData?.channelsList &&
      fetchReltionshipCalled
    ) {
      const configuredList = configureRelationshipsDataIfLastMessage(
        relationShipsData?.data,
        chatContextData?.channelsList,
        authContextData?.userData?.id,
      );
      setMyRelationshipsList(configuredList);
      setFetchReltionshipCalled(false);
    }
  }, [relationShipsData, chatContextData?.channelsList]);
  useEffect(() => {
    if (personalityListData?.data) {
      setPersonalitiesList(personalityListData?.data);
    }
  }, [personalityListData]);
  const callgetRelationships = () => {
    setFetchReltionshipCalled(true);
    relationshipRefetch();
  };

  const resetRelationshipSession = () => {
    setMyRelationshipsList([]);
    setPersonalitiesList([]);
  };

  return (
    <RelationshipContext.Provider
      value={{
        myRelationshipsList,
        setMyRelationshipsList,
        callgetRelationships,
        fetchPersonalities,
        personalitiesList,
        resetRelationshipSession,
        analysisList, 
        setAnalysisList
      }}>
      {children}
    </RelationshipContext.Provider>
  );
};
export default RelationshipContextProvider;
