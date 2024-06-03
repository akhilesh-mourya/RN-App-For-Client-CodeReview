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
import {useRelationshipStatus} from '../../hooks/relationshipStatus/useRelationshipStatus';
import {HealthStatus} from '../../enums';
import AMPrimaryButton from '../button/AMPrimaryButton';
import {PrimaryButtonType} from '../../constants/enums';
import {StatusStepOne} from './statusStepOne';
import {StatusStepTwo} from './statusStepTwo';
import {StatusStepThree} from './statusStepThree';
import {StatusStepFour} from './statusStepFour';
import {StatusStepFive} from './statusStepFive';
import {StatusStepSix} from './statusStepSix';
import theme from '../../theme';
import {useAnalytics} from '../../services/analytics';
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
                ? HealthStatus.ProgressActiveIcon
                : HealthStatus.ProgressInactiveIcon
            }
            isFirst={index === 0}
          />
        );
      })}
    </ProgressContainer>
  );
};

export const RelationshipStatusModal: FC<ModalProps> = React.memo(props => {
  const {onHide, subject} = props;
  const {
    step,
    progressList,
    resultScore,
    resultDescription,
    yourStatusDescritpion,
    yourSnippetHeader,
    yourSnippetFooter,
    yourSnippetMessageList,
    yourPartnerStatusDescription,
    yourPartnerSnippetHeader,
    yourPartnerSnippetFooter,
    yourPartnerSnippetMessageList,
    summaryDetails,
    viewShot,
    compareWidth,
    analysisData,
    isVisible,
    captureScreen,
    updateStep,
    previousStep,
  } = useRelationshipStatus(props);

  const analytics = useAnalytics();

  const onClosePress = () => {
    analytics.trackTouchDismissButtonOnAnalysisDetailScreen(
      analysisData.id,
      getRelationshipSectionDetail(step - 1, false),
    );

    onHide();
    setTimeout(() => {
      updateStep(1);
    }, 200);
  };

  const goToNextStep = () => {
    if (step < 6) {
      updateStep(step + 1);
    } else {
      onHide();
      updateStep(0);
    }
  };

  const renderScreen = () => {
    switch (step) {
      case 1:
        return (
          <StatusStepOne
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
          <StatusStepTwo
            step={step}
            description={yourStatusDescritpion}
            updateStep={updateStep}
            progressList={progressList}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 3:
        return (
          <StatusStepThree
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            snippetHeader={yourSnippetHeader}
            snippetFooter={yourSnippetFooter}
            messageList={yourSnippetMessageList}
            onHide={onClosePress}
            subject={subject}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 4:
        return (
          <StatusStepFour
            step={step}
            description={yourPartnerStatusDescription}
            updateStep={updateStep}
            progressList={progressList}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 5:
        return (
          <StatusStepFive
            step={step}
            updateStep={updateStep}
            progressList={progressList}
            snippetHeader={yourPartnerSnippetHeader}
            snippetFooter={yourPartnerSnippetFooter}
            messageList={yourPartnerSnippetMessageList}
            onHide={onClosePress}
            subject={subject}
            redirectToNextStep={redirectToNextStep}
          />
        );
      case 6:
        return (
          <StatusStepSix
            step={step}
            description={summaryDetails}
            updateStep={updateStep}
            progressList={progressList}
            onHide={onClosePress}
            redirectToNextStep={redirectToNextStep}
          />
        );
      default:
        return (
          <StatusStepOne
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
  const renderShareButton = () => {
    return (
      <BottomView>
        <AMPrimaryButton
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
        getRelationshipSectionDetail(step - 1, false),
      );
      previousStep();
    } else {
      analytics.trackTouchNextAreaOnAnalysisDetailScreen(
        analysisData?.id,
        getRelationshipSectionDetail(step - 1, false),
      );
      goToNextStep();
    }
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
