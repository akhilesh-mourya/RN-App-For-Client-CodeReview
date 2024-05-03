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
  UploadConvBottomTouchable,
  UploadButtonIcon,
  WhatsappUploadImage,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {useTranslation} from 'react-i18next';
import AMHeaderArrowBackButton from '../../../components/button/AMHeaderArrowBackButton';
import {useWhatsAppTutorial} from '../../../hooks/upload/useWhatsAppTutorial';

const WhatsAppTutorialScreen: FC<{}> = (props: any) => {
  const {t} = useTranslation();
  const {isForSync} = props?.route?.params || {};
  const {onUploadPress, stepsArray} = useWhatsAppTutorial();

  const stepView = (
    index: number,
    label: string,
    showDivider: boolean = true,
  ) => (
    <>
      <StepDetailRowView>
        <NumberView>
          <NumberLabel>{index}</NumberLabel>
        </NumberView>
        <StepDesLabel>{label}</StepDesLabel>
      </StepDetailRowView>
      {showDivider && <Divider />}
    </>
  );

  const renderWhatsappUploadStep = (
    imageSource: any,
    index: number,
    label: string,
    showDivider: boolean = true,
  ) => (
    <>
      <WhatsappUploadImage source={imageSource} topM={index === 1 ? 40 : 0} />
      {stepView(index, label, showDivider)}
    </>
  );

  const renderBottomButton = () => (
    <UploadConvBottomTouchable
      onPress={onUploadPress}
      leftIcon={<UploadButtonIcon />}
    />
  );

  const renderMainView = () => (
    <>
      {stepsArray?.map(step =>
        renderWhatsappUploadStep(
          step?.image,
          step?.number,
          step?.label,
          step?.number < stepsArray.length,
        ),
      )}
    </>
  );

  return (
    <DarkBackgroundContainer>
      <Container>
        <AMHeaderArrowBackButton />
        <ScrollContainer>
          <HeaderLabel>
            {isForSync
              ? t('WhatsApp_Upload_Header_For_Update')
              : t('WhatsApp_Upload_Header')}
          </HeaderLabel>
          {renderMainView()}
          {renderBottomButton()}
        </ScrollContainer>
      </Container>
    </DarkBackgroundContainer>
  );
};

export default WhatsAppTutorialScreen;
