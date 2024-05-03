import React, {FC} from 'react';
import {
  AnalysisContainer,
  AnalysisRowContainer,
  MultipleImageIcon,
  SentAnAnalysisText,
  SvgIcon,
  ViewAnalysisContainer,
  ViewAnalysisStick,
} from './style';
import {t} from 'i18next';
import {Analysis} from '../../../../enums';

const ViewRelationshipHealthStatusCell: FC<{}> = React.memo(props => {
  const renderViewAnalyis = () => {
    return (
      <ViewAnalysisContainer>
        <SentAnAnalysisText>{t('SENT_AN_ANALYSIS')}</SentAnAnalysisText>
        <AnalysisContainer>
          <SvgIcon icon={Analysis['RelationshipStatusChatSvgIcon']} />
          <MultipleImageIcon />
        </AnalysisContainer>
      </ViewAnalysisContainer>
    );
  };

  return (
    <AnalysisRowContainer>
      <ViewAnalysisStick />
      {renderViewAnalyis()}
    </AnalysisRowContainer>
  );
});

export default ViewRelationshipHealthStatusCell;
