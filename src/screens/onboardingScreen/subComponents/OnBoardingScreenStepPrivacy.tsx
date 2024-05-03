import React, {FC} from 'react';
import {
  DescriptionStepThree,
  StepPrivacyContainer,
  PrivacyStepImageContainer,
  OnBoardingStepImages,
} from './styles';
import {useTranslation} from 'react-i18next';
import {
  BottomContainer,
  BottomTouchable,
  ButtonLabel,
  RowSubContainer,
} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../../enums';
import {Animated} from 'react-native';
import {setOnboardingStepComplete} from '../../../utility';
import {ONBOARDING_PRIVACY} from '../../../constants/imageConstants';
import {useAnalytics} from '../../../services/analytics';

interface OnBoardingPrivacyStepProps {
  translateGetStartedOpacity: any;
}

const OnBoardingScreenStepPrivacy: FC<OnBoardingPrivacyStepProps> = ({
  translateGetStartedOpacity,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const analytics = useAnalytics();
  const RowSubAnimatedContainer =
    Animated.createAnimatedComponent(RowSubContainer);

  const renderBottomView = () => {
    return (
      <BottomContainer>
        <RowSubAnimatedContainer opacity={translateGetStartedOpacity}>
          <BottomTouchable
            onPress={() => {
              setOnboardingStepComplete('OTP_VERIFICATION');
              analytics.trackTouchGetStartedButtonOnIntroScreen();
              navigation.navigate(SCREEN_NAME.InputPhoneNumberScreen);
            }}>
            <ButtonLabel>{t('Get_Started')}</ButtonLabel>
          </BottomTouchable>
        </RowSubAnimatedContainer>
      </BottomContainer>
    );
  };

  return (
    <StepPrivacyContainer>
      <PrivacyStepImageContainer>
        <OnBoardingStepImages imagePath={ONBOARDING_PRIVACY} />
      </PrivacyStepImageContainer>
      <DescriptionStepThree>
        {t('Onboarding_Privacy_Description')}
      </DescriptionStepThree>
      {renderBottomView()}
    </StepPrivacyContainer>
  );
};

export default OnBoardingScreenStepPrivacy;
