import React, {FC} from 'react';
import {
  AnalysisDetailView,
  AnalysisLeftView,
  AnalysisRightView,
  AnalysisLabelHeader,
  AnalysisLabelDec,
  LottieDotsAnim,
} from '../styles';
import {AnalysysItemType} from '../../../types';
import {
  getFormatDateForAnalysis,
  getRelationshipStatusOnAnalysys,
  getRelationshipTypeOnAnalysys,
} from '../../../helpers/commonFunctions';
import { MessageStatusEnum } from '../../../enums';

interface AnalysisItemProps {
  analysisData: AnalysysItemType;
  onAnalysisPress?: Function;
}

const AnalysisItem: FC<AnalysisItemProps> = React.memo(({analysisData, onAnalysisPress = () => {}}) => {
  const isInProcess = [MessageStatusEnum.MessageProcessStatusInQueue, MessageStatusEnum.MessageProcessStatusProcessing]?.includes(analysisData?.status || '');
  const renderLeftView = () => (
    <AnalysisLeftView>
      <AnalysisLabelHeader isInProcess={isInProcess}>
        {getRelationshipTypeOnAnalysys(analysisData?.type)}
      </AnalysisLabelHeader>
      <AnalysisLabelDec isInProcess={isInProcess}>
        {getRelationshipStatusOnAnalysys(analysisData?.status)}
      </AnalysisLabelDec>
    </AnalysisLeftView>
  );
  const renderRightView = () => (
    <AnalysisRightView>
      <AnalysisLabelDec>
        {getFormatDateForAnalysis(analysisData?.createdAt)}
      </AnalysisLabelDec>
    </AnalysisRightView>
  );
  const renderProgressView = () => (
    <AnalysisRightView>
      <LottieDotsAnim />
    </AnalysisRightView>
  );
  return (
    <AnalysisDetailView onPress={() => onAnalysisPress(analysisData)} isInProcess={isInProcess} disabled={isInProcess}>
      {renderLeftView()}
      {isInProcess ? renderProgressView() : renderRightView()}
    </AnalysisDetailView>
  );
});

export default AnalysisItem;
