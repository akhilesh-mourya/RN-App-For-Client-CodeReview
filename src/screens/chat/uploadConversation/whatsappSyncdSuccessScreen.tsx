import React, {FC} from 'react';
import {
  SyncLoadingContainer,
  WhatsappSuccessTitle,
  IMessageSubDes,
  NameInitialContainer,
  WhatsappSyncedSuccessImage,
  SyncedStatusContainer,
  NameInitial,
  NameLabel,
  ColumnContainer,
  SyncedStatusLabel,
  SoundsGoogBtn,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import i18next from 'i18next';
import {useWhatsAppSyncesSuccess} from '../../../hooks/upload/useWhatsAppSyncesSuccess';
import {getOnltFirstLatterOfName} from '../../../helpers/commonFunctions';

const WhatsappSyncdSuccessScreen: FC<{}> = () => {
  const {relationshipInfo, onButtonPress, lastSyncedDate} =
    useWhatsAppSyncesSuccess();
  const renderBodyContent = () => {
    const msgBody = i18next
      ?.t('Whatsapp_Upload_Success_Des')
      .replace('*', relationshipInfo?.object);
    return (
      <>
        <WhatsappSyncedSuccessImage />
        <WhatsappSuccessTitle>
          {i18next.t('Upload_Success')}
        </WhatsappSuccessTitle>
        {
          relationshipInfo?.object && (
            <>
              <IMessageSubDes>{msgBody}</IMessageSubDes>
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
          )
        }
      </>
    );
  };

  return (
    <DarkBackgroundContainer>
      <SyncLoadingContainer>{renderBodyContent()}</SyncLoadingContainer>
      <SoundsGoogBtn onPress={onButtonPress} />
    </DarkBackgroundContainer>
  );
};

export default WhatsappSyncdSuccessScreen;
