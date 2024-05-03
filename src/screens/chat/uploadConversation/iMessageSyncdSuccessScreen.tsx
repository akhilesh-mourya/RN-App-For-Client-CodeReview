import React, {FC} from 'react';
import {
  SyncLoadingContainer,
  IMessageSubDes,
  NameInitialContainer,
  SyncedStatusContainer,
  NameInitial,
  NameLabel,
  ColumnContainer,
  SyncedStatusLabel,
  SoundsGoogBtn,
  IMessageSyncedSuccessImage,
  IMessageSuccessTitle,
  HeaderConatiner,
  CrossConatinerView,
  CrossIcon,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import i18next from 'i18next';
import {getOnltFirstLatterOfName} from '../../../helpers/commonFunctions';
import {useIMessageSyncesSuccess} from '../../../hooks/upload/useIMessageSyncesSuccess';

const IMessageSyncdSuccessScreen: FC<{}> = () => {
  const {relationshipInfo, onButtonPress, lastSyncedDate} =
    useIMessageSyncesSuccess();

  const msgBody = i18next
    ?.t('iMessage_Upload_Success_Des')
    .replace('*', relationshipInfo?.object);

  const renderHeader = () => (
    <>
      <HeaderConatiner>
        <CrossConatinerView onPress={() => {}}>
          <CrossIcon />
        </CrossConatinerView>
      </HeaderConatiner>

      <IMessageSyncedSuccessImage />
      <IMessageSuccessTitle>{i18next.t('Upload_Success')}</IMessageSuccessTitle>
      <IMessageSubDes>{msgBody}</IMessageSubDes>
    </>
  );

  const renderBodyContent = () => {
    return (
      <>
        <SyncedStatusContainer>
          <NameInitialContainer>
            <NameInitial>
              {getOnltFirstLatterOfName(relationshipInfo?.object)}
            </NameInitial>
          </NameInitialContainer>
          <ColumnContainer>
            <NameLabel>{relationshipInfo?.object}</NameLabel>
            <SyncedStatusLabel>
              {i18next.t('New_Synced')}
              {lastSyncedDate()}
            </SyncedStatusLabel>
          </ColumnContainer>
        </SyncedStatusContainer>
      </>
    );
  };

  return (
    <DarkBackgroundContainer>
      {renderHeader()}
      <SyncLoadingContainer>{renderBodyContent()}</SyncLoadingContainer>
      <SoundsGoogBtn onPress={onButtonPress} />
    </DarkBackgroundContainer>
  );
};

export default IMessageSyncdSuccessScreen;
