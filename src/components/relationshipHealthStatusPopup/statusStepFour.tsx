import React, {FC, useRef} from 'react';
import {
  DescriptionLabel,
  StatusImg,
  StylesImgContainer,
  BlackFullFlexContainer,
  CrossContainer,
  CrossIcon,
  CrossTouchable,
  StylesDetailContainer,
  SubContainer,
  StatusHeaderLabel,
  SummaryStyleLabel,
  FullTouchableViewRight,
  FullTouchableViewLeft,
} from './styles';
import {renderProgress} from '.';
import {HealthStatus} from '../../enums';
import {t} from 'i18next';
import {Platform} from 'react-native';
import theme from '../../theme';
import ScrollingText from '../scrollingText';
import {IS_IOS_PLATFORM} from '../../constants/appContants';

interface ScreenProps {
  step: number;
  updateStep?: any;
  progressList?: any;
  onHide: any;
  description: string;
  redirectToNextStep: Function;
}
let touchEnabled = false;
export const StatusStepFour: FC<ScreenProps> = React.memo(props => {
  const {
    step,
    updateStep,
    progressList,
    description,
    onHide,
    redirectToNextStep,
  } = props;

  const renderImage = () => {
    return (
      <StylesImgContainer>
        <StatusImg source={HealthStatus.RELATIONSHIP_LENS} />
      </StylesImgContainer>
    );
  };

  const dismissButtonPressedRef = useRef(false);

  const renderStyleDetail = () => {
    return (
      <StylesDetailContainer>
        <SummaryStyleLabel>{t('RELATIONSHIP_LENS')}</SummaryStyleLabel>
        <ScrollingText>
          <DescriptionLabel noOfLine={6}>{description}</DescriptionLabel>
        </ScrollingText>
      </StylesDetailContainer>
    );
  };

  return (
    <BlackFullFlexContainer
      onTouchEnd={e => {
        if (!dismissButtonPressedRef.current) {
          touchEnabled && redirectToNextStep(e.nativeEvent.locationX);
        }

        dismissButtonPressedRef.current = false;
      }}
      onTouchStart={() => {
        touchEnabled = true;
      }}
      onTouchMove={() => {
        touchEnabled = false;
      }}>
      <SubContainer>
        {renderProgress(
          progressList,
          step,
          Platform.OS === 'android' ? 48 : 68,
        )}
        <CrossContainer>
          <StatusHeaderLabel color={theme.colors.black}>
            {' ' || ''}
          </StatusHeaderLabel>
          <CrossTouchable
            onPress={() => {
              dismissButtonPressedRef.current = true;
              onHide();
              updateStep(0);
            }}>
            <CrossIcon />
          </CrossTouchable>
        </CrossContainer>
        {renderImage()}
        {renderStyleDetail()}
      </SubContainer>
      {!IS_IOS_PLATFORM && (
        <>
          <FullTouchableViewRight
            onPress={() => redirectToNextStep('', true, true)}
          />
          <FullTouchableViewLeft
            onPress={() => redirectToNextStep('', true, false)}
          />
        </>
      )}
    </BlackFullFlexContainer>
  );
});
