import React, {FC} from 'react';
import {
  DescriptionStepTwo,
  StepKnowledgeContainer,
  ChatImageContainer,
  OnBoardingStepImages,
} from './styles';
import {useTranslation} from 'react-i18next';
import {ONBOARDING_CHAT} from '../../../constants/imageConstants';

const OnBoardingScreenStepKnowledge: FC<{}> = () => {
  const {t} = useTranslation();
  return (
    <StepKnowledgeContainer>
      <DescriptionStepTwo>
        {t('Onboarding_Knowledge_Description')}
      </DescriptionStepTwo>
      <ChatImageContainer>
        <OnBoardingStepImages imagePath={ONBOARDING_CHAT} />
      </ChatImageContainer>
    </StepKnowledgeContainer>
  );
};

export default OnBoardingScreenStepKnowledge;
