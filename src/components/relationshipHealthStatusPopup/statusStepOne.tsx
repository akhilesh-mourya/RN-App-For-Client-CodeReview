import React, {FC, useRef, useState} from 'react';
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
  SubContainer,
  VerticalBlock,
  StatusHeaderLabel,
  SummaryStyleLabel,
  FullTouchableViewRight,
  FullTouchableViewLeft,
} from './styles';
import {renderProgress} from '.';
import {Platform} from 'react-native';
import {t} from 'i18next';
import {HealthStatus} from '../../enums';
import theme from '../../theme';
import ScrollingText from '../scrollingText';
import {IS_IOS_PLATFORM} from '../../constants/appContants';

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

export const StatusStepOne: FC<ScreenProps> = React.memo(props => {
  const {
    step,
    updateStep,
    progressList,
    onHide,
    resultScore,
    resultDescription,
    redirectToNextStep,
  } = props;

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

  const dismissButtonPressedRef = useRef(false);

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
      <CurvedImage source={HealthStatus.CURVED_RELATIONSHIP_STATUS} />
      <SpaceBetweenConatiner>
        <SubContainer>
          {renderProgress(
            progressList,
            step,
            Platform.OS === 'android' ? 48 : 68,
          )}
          <CrossContainer>
            <StatusHeaderLabel color={theme.colors.white}>
              {t('Your_Results') || ''}
            </StatusHeaderLabel>
            <CrossTouchable
              onPress={e => {
                dismissButtonPressedRef.current = true;
                onHide();
                updateStep(0);
              }}>
              <CrossIcon />
            </CrossTouchable>
          </CrossContainer>
          {renderResult()}
          {renderVerticalBlock(40)}
          <ChatContainer>
            <SummaryStyleLabel>
              {t('Health_Percentage').replace(
                '$',
                '' + Number(resultScore).toFixed(0),
              )}
            </SummaryStyleLabel>
            {renderVerticalBlock(30)}
            <ScrollingText>
              <DescriptionLabel noOfLine={8}>
                {resultDescription}
              </DescriptionLabel>
            </ScrollingText>
          </ChatContainer>
        </SubContainer>
      </SpaceBetweenConatiner>
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
    </BlackContainer>
  );
});
