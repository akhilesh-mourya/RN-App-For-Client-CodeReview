import React, {FC} from 'react';
import {
  ScrollContainer,
  Container,
  HeaderLabel,
  StepDetailRowView,
  NumberView,
  NumberLabel,
  StepDesLabel,
  Divider,
  WhatsappUploadImage,
  AmoriLogoImage,
  MacShareContainer,
  MacLinkLabel,
  ShareButton,
  ShareUploadIcon,
  ShareLabel,
  StepSubDesLabel,
  LabelContainer,
  ScanQRButton,
  IMessageAMoriLogoContainer,
  StepOneSubDesLabel,
  EmptyIMessageView,
  StepOneSubDesLabelInner,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {useTranslation} from 'react-i18next';
import AMHeaderArrowBackButton from '../../../components/button/AMHeaderArrowBackButton';
import {useIMessageTutorial} from '../../../hooks/upload/useIMessageTutorial';
import QrCodeScanner from '../../../components/qrCodeScanner';
import {removeHttpsPrefix} from '../../../helpers/commonFunctions';

const IMessageTutorialScreen: FC<{}> = () => {
  const {t} = useTranslation();
  const {
    macLink,
    onScanQRPress,
    onScannerClosePress,
    stepsArray,
    isQrCodeVisible,
    onSharePress,
    onQrCodeRead,
  } = useIMessageTutorial();

  const stepView = (
    index: number,
    label: string,
    showDivider: boolean = true,
    subLabel?: string,
  ) => (
    <>
      <StepDetailRowView>
        <NumberView>
          <NumberLabel>{index}</NumberLabel>
        </NumberView>
        <LabelContainer>
          <StepDesLabel>{label}</StepDesLabel>
          {!!subLabel && <StepSubDesLabel>{subLabel}</StepSubDesLabel>}
        </LabelContainer>
      </StepDetailRowView>
      {showDivider && <Divider />}
    </>
  );

  const renderMacAppView = () => {
    return (
      <MacShareContainer>
        <MacLinkLabel>{removeHttpsPrefix(macLink)}</MacLinkLabel>
        <ShareButton onPress={onSharePress}>
          <ShareUploadIcon />
          <ShareLabel>{t('Share')}</ShareLabel>
        </ShareButton>
      </MacShareContainer>
    );
  };

  const renderIMessageUploadStep = (
    imageSource: any,
    index: number,
    label: string,
    showDivider: boolean = true,
    subLabel: string,
  ) => (
    <>
      <WhatsappUploadImage source={imageSource} topM={index === 1 ? 40 : 0} />
      {stepView(index, label, showDivider, subLabel)}
    </>
  );

  const renderBottomButton = () => <ScanQRButton onPress={onScanQRPress} />;

  const renderFirstStep = () => (
    <>
      {stepView(1, t('Download_Mac_App'), false)}
      <StepOneSubDesLabel>
        {t('IMessage_Upload_Inner_Description_One')}
      </StepOneSubDesLabel>
      {renderMacAppView()}
      <StepOneSubDesLabelInner>
        {t('IMessage_Upload_Sub_Description_One')}
      </StepOneSubDesLabelInner>
      <Divider />
    </>
  );

  const renderMainView = () => (
    <>
      {renderFirstStep()}
      {stepsArray?.map(step =>
        renderIMessageUploadStep(
          step?.image,
          step?.number,
          step?.label,
          step?.showDivider,
          step?.sublabel,
        ),
      )}
    </>
  );

  return (
    <DarkBackgroundContainer>
      <Container>
        <AMHeaderArrowBackButton />
        <ScrollContainer>
          <HeaderLabel>{t('IMessage_Upload_Header')}</HeaderLabel>
          <IMessageAMoriLogoContainer>
            <AmoriLogoImage />
          </IMessageAMoriLogoContainer>
          {renderMainView()}
          <EmptyIMessageView />
          {/* {renderBottomButton()} */}
        </ScrollContainer>
        <QrCodeScanner
          isVisible={isQrCodeVisible}
          onClosePress={onScannerClosePress}
          onQrCodeRead={onQrCodeRead}
        />
      </Container>
    </DarkBackgroundContainer>
  );
};

export default IMessageTutorialScreen;
