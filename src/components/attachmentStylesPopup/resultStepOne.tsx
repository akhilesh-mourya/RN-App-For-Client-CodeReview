import React, {FC, useRef} from 'react';
import {
  DescriptionLabel,
  BlackContainer,
  ChatContainer,
  CrossContainer,
  CrossIcon,
  CrossTouchable,
  CurvedImage,
  PercentageLabel,
  ResultContainer,
  ResultLabel,
  SpaceBetweenConatiner,
  StyleHeaderLabel,
  SubContainer,
  SummaryStyleLabel,
  VerticalBlock,
} from './styles';
import {renderProgress} from '.';
import {Platform} from 'react-native';
import {t} from 'i18next';
import {Analysis} from '../../enums';
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
  onHide: any;
  resultScore: number;
  resultDescription: string;
  redirectToNextStep: Function;
}
let touchEnabled = false;
export const ResultStepOne: FC<ScreenProps> = React.memo(props => {
  const {
    step,
    updateStep,
    progressList,
    onHide,
    resultScore,
    resultDescription,
    redirectToNextStep,
  } = props;

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

  const renderResult = () => {
    return (
      <ResultContainer>
        <ResultLabel>{Number(resultScore).toFixed(0)}</ResultLabel>
        <PercentageLabel>{t('%')}</PercentageLabel>
      </ResultContainer>
    );
  };

  const renderVerticalBlock = (val: number) => {
    return <VerticalBlock mTop={val} />;
  };

  return (
    <BlackContainer
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
      <CurvedImage source={Analysis.CURVED_ATTACHMENT_STYLE} />
      <SpaceBetweenConatiner>
        <SubContainer>
          {renderProgress(
            progressList,
            step,
            Platform.OS === 'android' ? 48 : 68,
          )}
          {renderCross(t('Your_Results'))}
          {renderResult()}
          {renderVerticalBlock(40)}
          <ChatContainer>
            <SummaryStyleLabel>
              {t('Compatible_Percentage').replace(
                '$',
                '' + Number(resultScore).toFixed(0),
              )}
            </SummaryStyleLabel>
            {renderVerticalBlock(30)}
            <ScrollingText>
              <DescriptionLabel>{resultDescription}</DescriptionLabel>
            </ScrollingText>
          </ChatContainer>
        </SubContainer>
      </SpaceBetweenConatiner>
      {!IS_IOS_PLATFORM && (
        <>
          <FullTouchableViewRight
            onPress={() => {
              redirectToNextStep('', true, true);
            }}
          />
          <FullTouchableViewLeft
            onPress={() => {
              redirectToNextStep('', true, false);
            }}
          />
        </>
      )}
    </BlackContainer>
  );
});
