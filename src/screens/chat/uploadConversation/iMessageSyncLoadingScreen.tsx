import React, {FC, useEffect, useState} from 'react';
import {
  IContainer,
  IHeaderConatiner,
  IHeaderLabel,
  IHeaderDes,
  IMessageNotSyncedIcon,
  ILinkDes,
  EmptyView,
  Line,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import i18next from 'i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SCREEN_NAME} from '../../../enums';
import AMHeaderBackButton from '../../../components/button/AMHeaderBackButton';
import useRelationshipData from '../../../hooks/context/useRelationships';
import {getFirstName} from '../../../utility';

const IMessageSyncLoadingScreen: FC<{}> = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {myRelationshipsList} = useRelationshipData();
  const [objectName, setObjectName] = useState('');
  const goToImessageTutorial = () => {
    navigate(SCREEN_NAME.IMessageTutorialScreen);
  };

  useEffect(() => {
    getMessageInfo();
  }, []);

  const getMessageInfo = async () => {
    myRelationshipsList.map(relationship => {
      if (relationship?.channel?.id === params?.channelId) {
        relationship?.inputs?.length > 0 &&
          setObjectName(relationship?.inputs[0]?.object);
      }
    });
  };

  const renderHeader = () => (
    <>
      <IMessageNotSyncedIcon />
    </>
  );

  const renderBody = () => (
    <>
      <IHeaderConatiner>
        <IHeaderLabel>{i18next.t('IMEssage_Not_Synced')}</IHeaderLabel>
        <IHeaderDes>
          {i18next
            .t('IMessage_Not_Synced_Des')
            .replace('$', getFirstName(objectName))}
        </IHeaderDes>
        <EmptyView onPress={goToImessageTutorial}>
          <ILinkDes>{i18next.t('Not_Connected_Mac')}</ILinkDes>
          <Line />
        </EmptyView>
      </IHeaderConatiner>
    </>
  );
  return (
    <DarkBackgroundContainer>
      <AMHeaderBackButton />
      <IContainer>
        {renderHeader()}
        {renderBody()}
      </IContainer>
    </DarkBackgroundContainer>
  );
};

export default IMessageSyncLoadingScreen;
