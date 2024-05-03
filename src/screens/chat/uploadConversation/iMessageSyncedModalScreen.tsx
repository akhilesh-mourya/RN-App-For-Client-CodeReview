import React, {FC, useEffect} from 'react';
import {
  IContainer,
  ISyncedHeaderDes,
  ISBottomView,
  ButtonNextArrowActive,
  NameGradeientContainer,
  ISyncedNameInitial,
  IMessageSyncedSuccessImage,
  IHeaderSuccessLabel,
  SyncedStatusContainer,
  ColumnContainer,
  NameLabel,
  SyncedStatusLabel,
  CancelUploadButton,
  HeaderConatiner,
  CrossConatinerView,
  CrossIcon,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import i18next from 'i18next';
import {PrimaryButtonType} from '../../../constants/enums';
import AMPrimaryButton from '../../../components/button/AMPrimaryButton';
import {useIMessageSyncedModal} from '../../../hooks/upload/useIMessageSyncedModal';
import {getOnltFirstLatterOfName} from '../../../helpers/commonFunctions';
import {CancelUploadIMessagePopUp} from '../../../components/cancelUploadIMessagePopUp';
import {useNavigation} from '@react-navigation/native';
import {getEachFirstLetterCapitalize} from '../../../utility';
import {useAnalytics} from '../../../services/analytics';

const IMessageSyncedModalScreen: FC<{}> = () => {
  const {
    authors,
    onContinuePress,
    isCancelUploadVisible,
    lastSyncedDate,
    deleteRelationship,
    onCancelUploadPress,
    onNevermindPress,
  } = useIMessageSyncedModal();

  const navigation = useNavigation();
  const analytics = useAnalytics();

  const renderHeader = () => (
    <>
      <HeaderConatiner>
        <CrossConatinerView onPress={() => navigation.goBack()}>
          <CrossIcon />
        </CrossConatinerView>
      </HeaderConatiner>
      <IMessageSyncedSuccessImage />
      <IHeaderSuccessLabel>{i18next.t('Upload_Success')}</IHeaderSuccessLabel>
      <ISyncedHeaderDes>{i18next.t('IMessage_Synced_Des')}</ISyncedHeaderDes>
    </>
  );

  const renderIMessageCancelUploadPopup = () => {
    return (
      <CancelUploadIMessagePopUp
        name={authors?.object}
        onContinuePress={deleteRelationship}
        onHidePress={onNevermindPress}
        isVisible={isCancelUploadVisible}
      />
    );
  };

  const renderBody = () => {
    return (
      <SyncedStatusContainer mTop={30}>
        <NameGradeientContainer>
          <ISyncedNameInitial>
            {getOnltFirstLatterOfName(authors?.object)}
          </ISyncedNameInitial>
        </NameGradeientContainer>
        <ColumnContainer>
          <NameLabel>{getEachFirstLetterCapitalize(authors?.object)}</NameLabel>
          <SyncedStatusLabel>
            {i18next.t('New_Synced')}
            {lastSyncedDate()}
          </SyncedStatusLabel>
        </ColumnContainer>
      </SyncedStatusContainer>
    );
  };
  const renderBottomButton = () => (
    <ISBottomView>
      <AMPrimaryButton
        buttonType={PrimaryButtonType.FullButton}
        label={i18next.t('Continue')}
        onPress={onContinuePress}
        isDisabled={false}
        rightIcon={<ButtonNextArrowActive />}
      />
      <CancelUploadButton
        buttonType={PrimaryButtonType.FullButton}
        label={i18next.t('Cancel_Upload')}
        onPress={onCancelUploadPress}
        isDisabled={false}
      />
    </ISBottomView>
  );
  return (
    <DarkBackgroundContainer>
      <IContainer>
        {renderHeader()}
        {renderBody()}
        {renderIMessageCancelUploadPopup()}
        {renderBottomButton()}
      </IContainer>
    </DarkBackgroundContainer>
  );
};

export default IMessageSyncedModalScreen;
