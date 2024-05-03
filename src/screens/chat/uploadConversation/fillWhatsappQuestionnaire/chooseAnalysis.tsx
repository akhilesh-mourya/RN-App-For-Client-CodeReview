import React, {FC} from 'react';
import {
  AnalysisContainer,
  RowCenterView,
  AnalysisHeaderLabel,
  AnalysisMainContainer,
  RowSpaceBetweenView,
  SubHeader,
  AnalysisSmallItem,
  CategoryContainer,
  SmallItemContainer,
  ItemHeader,
  ItemDes,
  AnalysisFullItem,
  ScrollBottomView,
  ComingSoonTitle,
} from './styles';
import {DarkBackgroundContainer} from '../../../../components/screenBackground/GradientBackgroundContainer';
import AMHeaderArrowBackButton from '../../../../components/button/AMHeaderArrowBackButton';
import {useChooseAnalysis} from '../../../../hooks/whatsappQuestionnaire/useChooseAnalysis';
import {ChooseAnalysisScreenProps} from '../../../../types';

const ChooseAnalysisScreen: FC<ChooseAnalysisScreenProps> = screenProps => {
  const {
    createRelationReqData,
    isUpdateRelationship,
    relationshipId,
    relationShipData,
  } = screenProps?.route?.params || {};
  const {t, AnalysisDataList, onChooseAnalysis} = useChooseAnalysis(
    createRelationReqData,
    isUpdateRelationship,
    relationshipId,
    relationShipData,
  );

  const renderHeaderContent = () => {
    return (
      <RowCenterView>
        <AMHeaderArrowBackButton />
        <AnalysisHeaderLabel>{t('Choose_An_Analysis')}</AnalysisHeaderLabel>
      </RowCenterView>
    );
  };

  const renderComingSoon = () => {
    return <ComingSoonTitle>{t('Coming_Soon')}</ComingSoonTitle>;
  };

  const renderSmallItem = (analysisData: any, isForSelect: boolean) => (
    <AnalysisSmallItem
      isForSelect={isForSelect}
      onPress={() => {
        onChooseAnalysis(analysisData);
      }}>
      <ItemHeader>{analysisData?.header}</ItemHeader>
      <ItemDes>{analysisData?.description}</ItemDes>
    </AnalysisSmallItem>
  );

  const renderFullItem = (analysisData: any) => (
    <AnalysisFullItem
      onPress={() => {
        onChooseAnalysis(analysisData);
      }}>
      <ItemHeader>{analysisData?.header}</ItemHeader>
      <ItemDes>{analysisData?.description}</ItemDes>
    </AnalysisFullItem>
  );

  const renderCategories = () => (
    <CategoryContainer>
      <SmallItemContainer>
        {renderSmallItem(AnalysisDataList[0], true)}
        {renderSmallItem(AnalysisDataList[1], true)}
      </SmallItemContainer>
      {renderComingSoon()}
      {renderFullItem(AnalysisDataList[2])}
      <SmallItemContainer>
        {renderSmallItem(AnalysisDataList[3], false)}
        {renderSmallItem(AnalysisDataList[4], false)}
      </SmallItemContainer>
      {renderFullItem(AnalysisDataList[5])}
      <SmallItemContainer>
        {renderSmallItem(AnalysisDataList[6], false)}
        {renderSmallItem(AnalysisDataList[7], false)}
      </SmallItemContainer>
    </CategoryContainer>
  );

  const renderBodyContent = () => (
    <AnalysisMainContainer>
      <RowSpaceBetweenView>
        <SubHeader>{t('Recommended')}</SubHeader>
        {/* <FreeAnalysisCountView>
          <FreeCountLabel>3 {t('Free_Analysis_Count')}</FreeCountLabel>
        </FreeAnalysisCountView> */}
      </RowSpaceBetweenView>
      {renderCategories()}
      <ScrollBottomView />
    </AnalysisMainContainer>
  );

  return (
    <DarkBackgroundContainer>
      <AnalysisContainer>
        {renderHeaderContent()}
        {renderBodyContent()}
      </AnalysisContainer>
    </DarkBackgroundContainer>
  );
};

export default ChooseAnalysisScreen;
