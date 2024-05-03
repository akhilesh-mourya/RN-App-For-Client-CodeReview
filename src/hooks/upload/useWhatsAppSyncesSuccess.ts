import React, {useEffect, useState} from 'react';
import {getInTimeFormat} from '../../helpers/commonFunctions';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {goBackMultipleScreens} from '../../navigation/navigationHelper';
import {getRelationshipInfo} from '../../apiServices/main';
import {useQuery} from 'react-query';
import { useLoader } from '../loader/useLoader';

export const useWhatsAppSyncesSuccess = () => {
  const {params} = useRoute();
  const {showLoader, hideLoader} = useLoader();
  const {relationShipData}: any = params;
  const [relationshipInfo, setRelationshipInfo] = useState<any>({});
  const {data: apiRelationshipObj, refetch: fetchRelationshipData, isLoading} = useQuery(
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
  useEffect(() => {
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoading]);
  const lastSyncedDate = () => {
    return relationshipInfo?.inputs?.length > 0 ? getInTimeFormat(relationshipInfo?.inputs[0]?.messagesUpdatedAt) : '';
  };
  const onButtonPress = () => {
    goBackMultipleScreens(3);
  };
  return {
    onButtonPress,
    relationshipInfo: relationshipInfo?.inputs?.length > 0 ? relationshipInfo?.inputs[0] : {},
    lastSyncedDate,
  };
};
