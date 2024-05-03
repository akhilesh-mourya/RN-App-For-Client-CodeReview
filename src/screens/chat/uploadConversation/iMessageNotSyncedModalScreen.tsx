import React, {FC} from 'react';
import {
  IContainer,
  CrossConatinerView,
  CrossIcon,
  HeaderConatiner,
  INonSyncedHeaderLabel,
  IHeaderDes,
  IMessageNotSyncedIcon,
} from './styles';
import { DarkBackgroundContainer } from '../../../components/screenBackground/GradientBackgroundContainer';
import i18next from 'i18next';
import {resetToHomeFromAnalysis} from '../../../navigation/navigationHelper';

const IMessageNotSyncedModalScreen: FC<{}> = () => {
  const renderHeader = () => (
    <>
      <HeaderConatiner>
        <CrossConatinerView onPress={resetToHomeFromAnalysis}>
          <CrossIcon />
        </CrossConatinerView>
      </HeaderConatiner>
      <INonSyncedHeaderLabel>{i18next.t('IMEssage_Not_Synced')}</INonSyncedHeaderLabel>
    </>
  );
  const renderBody = () => (
    <>
      <IMessageNotSyncedIcon />
      <IHeaderDes>{i18next.t('IMessage_Not_Synced_Description')}</IHeaderDes>
    </>
  );
  return (
    <DarkBackgroundContainer>
      <IContainer>
        {renderHeader()}
        {renderBody()}
      </IContainer>
    </DarkBackgroundContainer>
  );
};

export default IMessageNotSyncedModalScreen;
