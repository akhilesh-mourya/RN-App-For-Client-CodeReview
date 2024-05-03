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
import {Analysis, AnalysisAttachmentStyle} from '../../enums';
import {renderProgress} from '.';
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
  style: string;
  description: string;
  onHide: any;
  redirectToNextStep: Function;
}

let touchEnabled = false;
export const ResultStepFour: FC<ScreenProps> = React.memo(props => {
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
        {renderCross(t('Their_Attachment_Style'))}
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
