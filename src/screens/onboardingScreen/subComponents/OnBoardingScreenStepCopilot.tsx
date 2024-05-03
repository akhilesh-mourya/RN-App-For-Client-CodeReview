import React, {FC} from 'react';
import {
  Container,
  OnBoardingStepImages,
  HeaderTitle,
  Description,
  ImageContainer,
} from './styles';
import {useTranslation} from 'react-i18next';
import {ONBOARDING_COPILOT} from '../../../constants/imageConstants';

const OnBoardingScreenStepCopilot: FC<{}> = () => {
  const {t} = useTranslation();
  return (
    <Container>
      <ImageContainer>
        <OnBoardingStepImages imagePath={ONBOARDING_COPILOT} />
      </ImageContainer>
      <HeaderTitle>{t('Onboarding_Copilot_Header')}</HeaderTitle>
      <Description>{t('Onboarding_Copilot_Description')}</Description>
    </Container>
  );
};

export default OnBoardingScreenStepCopilot;
