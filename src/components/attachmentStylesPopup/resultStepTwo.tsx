import React, {FC, useRef} from 'react';
import {
  DescriptionLabel,
  StyleLabel,
  StylesImg,
  StylesImgContainer,
  BlackFullFlexContainer,
  CrossContainer,
  CrossIcon,
  CrossTouchable,
  StyleHeaderLabel,
  StylesDetailContainer,
  SubContainer,
} from './styles';
import {renderProgress} from '.';
import {Analysis, AnalysisAttachmentStyle} from '../../enums';
import {t} from 'i18next';
import {Platform} from 'react-native';
import theme from '../../theme';
import ScrollingText from '../scrollingText';
import {IS_IOS_PLATFORM} from '../../constants/appContants';
import {
  FullTouchableViewLeft,
  FullTouchableViewRight,
} from '../relationshipHealthStatusPopup/styles';

interface ScreenProps {
  step: number;
  updateStep?: any;
  progressList?: any;
  style: any;
  onHide: any;
  description: string;
  redirectToNextStep: Function;
}

let touchEnabled = false;
export const ResultStepTwo: FC<ScreenProps> = React.memo(props => {
  const {
    step,
    updateStep,
    progressList,
    style,
    description,
    onHide,
    redirectToNextStep,
  } = props;
  const renderImage = () => {
    return (
      <StylesImgContainer>
        <StylesImg source={Analysis[`${style}`]} />
      </StylesImgContainer>
    );
  };

  const dismissButtonPressedRef = useRef(false);

  const renderCross = (title: string) => {
    return (
      <CrossContainer>
        <StyleHeaderLabel colors={theme.colors.white}>
          {title || ''}
        </StyleHeaderLabel>
        <CrossTouchable
          onPress={() => {
            dismissButtonPressedRef.current = true;
            onHide();
            updateStep(0);
          }}>
          <CrossIcon />
        </CrossTouchable>
      </CrossContainer>
    );
  };

  const renderStyleDetail = () => {
    return (
      <StylesDetailContainer>
        <StyleLabel>{AnalysisAttachmentStyle[`${style}`]}</StyleLabel>
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
        {renderCross(t('Your_Attachment_Style'))}
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
