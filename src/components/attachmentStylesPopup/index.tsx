import React, {FC} from 'react';
import {
  BottomView,
  CaptureShotView,
  Container,
  ModalContainer,
  ProgressContainer,
  ProgressSvg,
  ShareIcon,
} from './styles';
import {Analysis} from '../../enums';
import {useAttachmentStyles} from '../../hooks/attachmentStyles/useAttachmentStyles';
import {ResultStepTwo} from './resultStepTwo';
import {ResultStepFour} from './resultStepFour';
import {ResultStepSix} from './resultStepSix';
import {ResultStepOne} from './resultStepOne';
import {ResultStepThree} from './resultStepThree';
import {ResultStepFive} from './resultStepFive';
import {useAnalytics} from '../../services/analytics';
import {AMPrimaryButtonNew} from '../button/AMPrimaryButton';
import {PrimaryButtonType} from '../../constants/enums';
import theme from '../../theme';
import {getRelationshipSectionDetail} from '../../helpers/commonFunctions';

interface ModalProps {
  isVisible: boolean;
  onHide: any;
  analysisData: any;
  subject: string;
  expandedAttachmentRef: any;
}

export const renderProgress = (progressList: any, step: number, mt: number) => {
  return (
    <ProgressContainer mTop={mt}>
      {progressList?.map((item: any, index: number) => {
        return (
          <ProgressSvg
            icon={
              index < step
                ? Analysis.ProgressActiveIcon
                : Analysis.ProgressInactiveIcon
            }
            isFirst={index === 0}
          />
        );
      })}
    </ProgressContainer>
  );
};

export const AttachmentStylesResultModal: FC<ModalProps> = React.memo(props => {
  const {onHide, subject} = props;
  const {
    step,
    progressList,
    resultScore,
    resultDescription,
    yourStyle,
    yourStyleDescritpion,
    yourSnippetHeader,
    yourSnippetFooter,
    yourSnippetMessageList,
    yourPartnerStyle,
    yourPartnerStyleDescription,
    yourPartnerSnippetHeader,
    yourPartnerSnippetFooter,
    yourPartnerSnippetMessageList,
    summaryStyle,
    summaryDetails,
    viewShot,
    compareWidth,
    analysisData,
    isVisible,
    captureScreen,
    updateStep,
    previousStep,
  } = useAttachmentStyles(props);
  const analytics = useAnalytics();

  const onClosePress = () => {
    analytics.trackTouchDismissButtonOnAnalysisDetailScreen(
      analysisData.id,
      getRelationshipSectionDetail(step - 1, true),
    );

    onHide();
    setTimeout(() => {
      updateStep(1);
    }, 200);
  };

  const renderScreen = () => {
    switch (step) {
      case 1:
        return (
          <ResultStepOne
            step={step}
            resultScore={resultScore}
            resultDescription={resultDescription}
            updateStep={updateStep}
            progressList={progressList}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 2:
        return (
          <ResultStepTwo
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            style={yourStyle}
            description={yourStyleDescritpion}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 3:
        return (
          <ResultStepThree
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            snippetHeader={yourSnippetHeader}
            snippetFooter={yourSnippetFooter}
            onHide={onClosePress}
            messageList={yourSnippetMessageList}
            subject={subject}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 4:
        return (
          <ResultStepFour
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            style={yourPartnerStyle}
            description={yourPartnerStyleDescription}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 5:
        return (
          <ResultStepFive
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            onHide={onClosePress}
            snippetHeader={yourPartnerSnippetHeader}
            snippetFooter={yourPartnerSnippetFooter}
            messageList={yourPartnerSnippetMessageList}
            subject={subject}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 6:
        return (
          <ResultStepSix
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            style={summaryStyle}
            description={summaryDetails}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      default:
        return (
          <ResultStepOne
            step={step}
            resultScore={resultScore}
            resultDescription={resultDescription}
            updateStep={updateStep}
            progressList={progressList}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
    }
  };

  const goToNextStep = () => {
    if (step < 6) {
      updateStep(step + 1);
    } else {
      onClosePress();
      updateStep(0);
    }
  };

  const redirectToNextStep = (
    locationX: number,
    isOverride: boolean = false,
    isNext: boolean = true,
  ) => {
    if (isOverride) {
      if (isNext) {
        goToNextStep();
      } else {
        previousStep();
      }
      return;
    }
    if (locationX < compareWidth) {
      analytics.trackTouchBackAreaOnAnalysisDetailScreen(
        analysisData?.id,
        getRelationshipSectionDetail(step - 1, true),
      );
      previousStep();
    } else {
      analytics.trackTouchNextAreaOnAnalysisDetailScreen(
        analysisData?.id,
        getRelationshipSectionDetail(step - 1, true),
      );
      goToNextStep();
    }
  };

  const renderShareButton = () => {
    return (
      <BottomView>
        <AMPrimaryButtonNew
          label="Share"
          leftIcon={<ShareIcon />}
          isDisabled={false}
          buttonType={PrimaryButtonType.ContentWidthButton}
          horizontalPadding={16}
          bgColor={theme.colors.youLabelColor}
          onPress={captureScreen}
        />
      </BottomView>
    );
  };

  return (
    <ModalContainer visible={isVisible} transparent={true}>
      <Container>
        <CaptureShotView ref={viewShot}>{renderScreen()}</CaptureShotView>
        {renderShareButton()}
      </Container>
    </ModalContainer>
  );
});
