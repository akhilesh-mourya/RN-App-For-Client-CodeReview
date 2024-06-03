import React, {FC, useEffect, useState} from 'react';
import {
  Container,
  NameLabel,
  RelationShipContainer,
  RelationShipInnerLeftContainer,
  RelationshipsLabel,
  RelationshipsSubLabel,
  UploadConversationContainer,
  UploadConversationLabel,
  UploadConversationTouchable,
  ProgressTitleLabel,
  ProgressRowView,
  ProgressLabel,
  NextArrow,
  NextButtonContainer,
  UploadConversationIcon,
  UploadConversationLayout,
  MainContainer,
  FlatListView,
  FlatListContainer,
} from './homeScreenStyles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import {t} from 'i18next';
import MyCoachItem from '../../../components/molecule/myCoachItem';
import ProgressBar from '../../../components/progress/progressBar';
import RelationshipItem from '../../../components/molecule/relationshipItem';
import UploadConversationBottomSheet from '../../../components/bottomSheet/uploadConversationBottomSheet';
import {useHome} from '../../../hooks/main/useHome';
import {capitalizeFirstLater} from '../../../helpers/commonFunctions';
import AMPrimaryButton from '../../../components/button/AMPrimaryButton';
import {PrimaryButtonType} from '../../../constants/enums';
import MaskedView from '../../chat/fillQuestionnaire/linearGradient/maskedView';
import {HomeList as MaskedElement} from '../../chat/fillQuestionnaire/linearGradient/maskedElement';
import {useAnalytics} from '../../../services/analytics';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen: FC<{}> = () => {
  const [progress] = useState(0);
  const {
    bottomSheetRef,
    myName,
    myAssistantData,
    myRelationShips,
    onWhatsAppPress,
    onIMessagePress,
    onCoachPress,
    onRelationshipItemPress,
    onUploadConvPress,
    onFillQuestionnairePress,
    isMyRelationshipBoxShown,
    lastMessageDataForCoach,
  } = useHome();

  const analytics = useAnalytics();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && analytics) {
      analytics.trackViewHomeScreen();
    }
  }, [analytics, isFocused]);

  const renderHeaderContent = () => (
    <>
      <RelationShipContainer
        onPress={() => {
          analytics.trackTouchMyRelationshipProfileCardOnHomeScreen();
          onFillQuestionnairePress();
        }}>
        <RelationShipInnerLeftContainer>
          <ProgressTitleLabel>
            {t('Home_Progress_Header_Label')}
          </ProgressTitleLabel>
          <ProgressRowView>
            <ProgressBar progress={progress} isfromHome={true} />
            <ProgressLabel>{progress}% complete</ProgressLabel>
          </ProgressRowView>
        </RelationShipInnerLeftContainer>
        <NextButtonContainer>
          <NextArrow />
        </NextButtonContainer>
      </RelationShipContainer>
    </>
  );

  const renderListItem = (item: any) => {
    return (
      <RelationshipItem
        item={item?.item}
        onItemPress={onRelationshipItemPress}
        coachData={myAssistantData}
      />
    );
  };

  const renderNoRelationShipView = () => (
    <UploadConversationContainer>
      <RelationshipsSubLabel>
        {t('Relationalship_subtitle')}
      </RelationshipsSubLabel>
      <UploadConversationTouchable onPress={onUploadConvPress}>
        <UploadConversationLabel>
          {t('Upload_Conversation')}
        </UploadConversationLabel>
      </UploadConversationTouchable>
    </UploadConversationContainer>
  );

  const renderRelationshipListLayout = () => {
    return (
      <FlatListContainer>
        <MaskedView element={<MaskedElement />}>
          <FlatListView data={myRelationShips} renderItem={renderListItem} />
        </MaskedView>
        <UploadConversationLayout>
          <AMPrimaryButton
            buttonType={PrimaryButtonType.FullButton}
            label={t('Upload_Conversation')}
            onPress={onUploadConvPress}
            leftIcon={<UploadConversationIcon />}
          />
        </UploadConversationLayout>
      </FlatListContainer>
    );
  };

  const renderRelationshipLayout = () => {
    return (
      <>
        <RelationshipsLabel>{t('Relationalships')}</RelationshipsLabel>
        {myRelationShips?.length > 0
          ? renderRelationshipListLayout()
          : renderNoRelationShipView()}
      </>
    );
  };

  const renderSubCoach = () => {
    return (
      <MyCoachItem
        item={myAssistantData}
        onCoachPress={onCoachPress}
        lastMessageDataForCoach={lastMessageDataForCoach}
      />
    );
  };

  const renderMyCoach = () => {
    return (
      <>
        <RelationshipsLabel>{t('My_Coach')}</RelationshipsLabel>
        {renderSubCoach()}
      </>
    );
  };

  const renderUploadConvSheet = () => (
    <UploadConversationBottomSheet
      setRef={bottomSheetRef}
      onWhatsAppPress={onWhatsAppPress}
      onIMessagePress={onIMessagePress}
    />
  );

  return (
    <DarkBackgroundContainer>
      <MainContainer>
        <NameLabel>Hey {capitalizeFirstLater(myName)}!</NameLabel>
        <Container>
          {isMyRelationshipBoxShown() && renderHeaderContent()}
          {renderMyCoach()}
          {renderRelationshipLayout()}
        </Container>
      </MainContainer>
      {renderUploadConvSheet()}
    </DarkBackgroundContainer>
  );
};

export default HomeScreen;
