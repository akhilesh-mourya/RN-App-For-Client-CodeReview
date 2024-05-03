import React, {useEffect, useState} from 'react';
import {getInTimeFormat} from '../../helpers/commonFunctions';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {goBackMultipleScreens} from '../../navigation/navigationHelper';
import {getRelationshipInfo} from '../../apiServices/main';
import {useQuery} from 'react-query';

export const useIMessageSyncesSuccess = () => {
  const {params} = useRoute();
  // const {relationShipData}: any = params;
  const relationShipData = undefined;
  const [relationshipInfo, setRelationshipInfo] = useState(relationShipData);
  const {data: apiRelationshipObj, refetch: fetchRelationshipData} = useQuery(
    'fetchRelationshipData',
    () => getRelationshipInfo(relationShipData?.id),
    {
      enabled: !!relationShipData,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  );
  useFocusEffect(
    React.useCallback(() => {
      if (relationShipData) {
        fetchRelationshipData();
      }
    }, [relationShipData]),
  );
  useEffect(() => {
    if (apiRelationshipObj?.data) {
      setRelationshipInfo(apiRelationshipObj?.data);
    }
  }, [apiRelationshipObj]);
  const lastSyncedDate = () => {
    return getInTimeFormat(relationshipInfo?.inputs[0]?.messagesUpdatedAt);
  };
  const onButtonPress = () => {
    goBackMultipleScreens(3);
  };
  return {
    onButtonPress,
    relationshipInfo: relationshipInfo?.inputs[0] || {},
    lastSyncedDate,
  };
};
