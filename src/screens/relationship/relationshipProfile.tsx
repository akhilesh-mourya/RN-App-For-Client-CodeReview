import React, {FC, useEffect} from 'react';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {
  MainContainer,
  HeaderContainer,
  BackTouchable,
  BackArrow,
  DotsView,
  BodyContainer,
  ProfileView,
  HeaderNameLabel,
  HeaderFullNameLabel,
  RowViewItemsCenter,
  UploadTypeView,
  UploadTypeLabel,
  SyncContainer,
  SyncIcon,
  SyncLabel,
  LastSyncedLabel,
  AnalysisContainer,
  SubHeaderLabel,
  FlatListView,
  NewAnalysisButton,
  PlusIcon,
} from './styles';
import i18next from 'i18next';
import AnalysisItem from './subComponents/analysisItem';
import {useRelationshipProfile} from '../../hooks/relationship/useRelationshipProfile';
import RelationShipOptionsBottomSheet from '../../components/bottomSheet/relationShipOptionsBottomSheet';
import {getOnltFirstLatterOfName} from '../../helpers/commonFunctions';
import {AttachmentStylesResultModal} from '../../components/attachmentStylesPopup';
import {RelationshipStatusModal} from '../../components/relationshipHealthStatusPopup';
import {getEachFirstLetterCapitalize} from '../../utility';
import {useAnalytics} from '../../services/analytics';
import {useIsFocused} from '@react-navigation/native';
import {RelationshipProfileScreenProps} from '../../types';

const RelationshipProfileScreen: FC<RelationshipProfileScreenProps> =
  React.memo(() => {
    const {
      analysisListData,
      t,
      relationShipData,
      bottomSheetRef,
      onTrippleDotPress,
      onEditPress,
      onDeletePress,
      getUploadType,
      lastSyncedDate,
      onGoBack,
      onNewAnalysisPress,
      onSyncPress,
      onAnalysisPress,
      isAttachmentStyleVisible,
      isRelationshipHealthStatusVaisible,
      showHideAttachmentStyle,
      showHideHealthStatus,
      relationAnalysisData,
      receiverData,
      loadMore,
      meta,
    } = useRelationshipProfile();

    const analytics = useAnalytics();
    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused) {
        analytics.trackViewRelationshipDetailScreen(relationShipData.id);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analytics, isFocused]);

    const renderAttachmentStylesLayout = () => {
      return (
        <AttachmentStylesResultModal
          isVisible={isAttachmentStyleVisible}
          onHide={showHideAttachmentStyle}
          analysisData={relationAnalysisData}
          subject={receiverData?.subject}
        />
      );
    };

    const onEndReached = () => {
      if (meta?.cursor) {
        loadMore(meta?.cursor);
      }
    };

    const renderRelationshipStatusLayout = () => {
      return (
        <RelationshipStatusModal
          isVisible={isRelationshipHealthStatusVaisible}
          onHide={showHideHealthStatus}
          analysisData={relationAnalysisData}
          subject={receiverData?.subject}
        />
      );
    };
    const renderHeaderContent = () => (
      <HeaderContainer>
        <BackTouchable onPress={onGoBack}>
          <BackArrow />
        </BackTouchable>
        <BackTouchable onPress={onTrippleDotPress}>
          <DotsView />
        </BackTouchable>
      </HeaderContainer>
    );
    const renderProfileView = () => (
      <>
        <ProfileView>
          <HeaderNameLabel>
            {getOnltFirstLatterOfName(relationShipData?.name)}
          </HeaderNameLabel>
        </ProfileView>
        <HeaderFullNameLabel>
          {getEachFirstLetterCapitalize(relationShipData?.name)}
        </HeaderFullNameLabel>
      </>
    );
    const renderUploadDetailView = () => (
      <RowViewItemsCenter>
        <UploadTypeView>
          <UploadTypeLabel>{getUploadType()}</UploadTypeLabel>
        </UploadTypeView>
        <SyncContainer onPress={onSyncPress}>
          <SyncIcon />
          <SyncLabel>{i18next.t('Sync')}</SyncLabel>
        </SyncContainer>
      </RowViewItemsCenter>
    );
    const renderAnalysisView = () => (
      <>
        <AnalysisContainer>
          <SubHeaderLabel>{i18next.t('Analyses')}</SubHeaderLabel>
          {/* <SeeAllLabel>{i18next.t('See_All')}</SeeAllLabel> */}
        </AnalysisContainer>
        <FlatListView
          data={analysisListData}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <AnalysisItem
              analysisData={item}
              onAnalysisPress={onAnalysisPress}
            />
          )}
        />
      </>
    );
    const renderBodyContent = () => (
      <BodyContainer>
        {renderProfileView()}
        {renderUploadDetailView()}
        <LastSyncedLabel>
          {t('Last_Synced_On')}
          {lastSyncedDate()}
        </LastSyncedLabel>
        {renderAnalysisView()}
      </BodyContainer>
    );
    const renderBottomButton = () => (
      <NewAnalysisButton onPress={onNewAnalysisPress} leftIcon={<PlusIcon />} />
    );
    const renderRelationOptionsSheet = () => (
      <RelationShipOptionsBottomSheet
        setRef={bottomSheetRef}
        onEditPress={onEditPress}
        onDeletePress={onDeletePress}
        onCancelPress={() => {
          analytics.trackTouchCancelMenuOnMenuSheetOnRelationshipDetailScreen(
            relationShipData.id,
          );
        }}
      />
    );
    return (
      <>
        <DarkBackgroundContainer>
          <MainContainer>
            {renderHeaderContent()}
            {renderBodyContent()}
            {renderBottomButton()}
          </MainContainer>
        </DarkBackgroundContainer>
        {renderRelationOptionsSheet()}
        {renderAttachmentStylesLayout()}
        {renderRelationshipStatusLayout()}
      </>
    );
  });

export default RelationshipProfileScreen;
