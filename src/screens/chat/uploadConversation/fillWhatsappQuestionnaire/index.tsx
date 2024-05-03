import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  BackButtonView,
  BackIcon,
  Container,
  HeaderContainer,
  MainContainer,
  PagerView,
} from './styles';
import {DarkBackgroundContainer} from '../../../../components/screenBackground/GradientBackgroundContainer';
import {useWhatsappQuestionnaire} from '../../../../hooks/whatsappQuestionnaire/useWhatsappQuestionnaire';
import UserSelectorScreen from './subComponents/userSelectorScreen';
import RelationshipType from './subComponents/relationshipType';
import RelationshipPronoun from './subComponents/relationshipPronoun';
import SelectExistingUser from './subComponents/selectExistingUser';
import {useNavigation} from '@react-navigation/native';
import {FillWhatsappQuitoinnaireProps} from '../../../../types';
import UpdateRelationConfirmationPopUp from '../../../../components/updateRelationConfirmationPopUp';
import {useAnalytics} from '../../../../services/analytics';

const FillWhatappQuestionnaireScreen: FC<
  FillWhatsappQuitoinnaireProps
> = () => {
  const {
    step,
    updateStep,
    relationshipList,
    senders,
    onBackButtonPress,
    selectedOptionForPronoun,
    updateOptionForStep,
    getOtherUserName,
    selectedOptionForUserSelection,
    selectedOptionForExistingUserSelection,
    updateOptionForExistingUser,
    removeRelationhipId,
    onExistingUserContinuePress,
    selectedOptionForRelationshipType,
    callCreateRelationshipAPI,
    pronounList,
    relationshipTypeList,
    isNamesDiff,
    isFromWhatsAppUpload,
    onClickCreateNewRelationship,
    isUpdateFlow,
    updateExistingRelationship,
    isFromUpdateAndDiffConv,
    existingRelationToUpdateName,
    updateExistingRelationWithDiffNameConfirmation,
    isConfirmationPopupVisible,
    onConfirmUpdatePress,
    onhideConfirmPopupPress,
  } = useWhatsappQuestionnaire();
  const navigation = useNavigation();

  const swiperRef = useRef<any>(null);
  const [selectedInex, setSelectedIndex] = useState(0);

  const renderHeaderContent = () => {
    return (
      <HeaderContainer>
        <BackButtonView
          onPress={() => onBackButtonPress(onPrevPress, selectedInex)}>
          <BackIcon />
        </BackButtonView>
      </HeaderContainer>
    );
  };

  const onPrevPress = (prevBy: number = -1, shouldAnimate: boolean = true) => {
    swiperRef?.current?.scrollBy(prevBy, shouldAnimate);
    updateStep(step + prevBy);

    if (selectedInex === 0) {
      navigation.goBack();
    }
  };

  const onNextPress = (nextBy: number = 1, shouldAnimate: boolean = true) => {
    swiperRef?.current?.scrollBy(nextBy, shouldAnimate);
  };

  const renderUpdateRelationConfirmationPopUp = () => {
    return (
      <UpdateRelationConfirmationPopUp
        isVisible={isConfirmationPopupVisible}
        onQuitPress={() => onConfirmUpdatePress(onNextPress)}
        onStayPress={onhideConfirmPopupPress}
      />
    );
  };

  const analytics = useAnalytics();

  useEffect(() => {
    if (relationshipList?.length > 0) {
      analytics.trackViewCreateNewOrAddToExistingRelationshipScreen();
    } else {
      analytics.trackViewSelectNameThatBelongsToYouScreen();
    }
  }, [analytics, relationshipList]);

  const handleIndexChanged = useCallback(
    (index: number) => {
      if (relationshipList?.length > 0) {
        switch (index) {
          case 0:
            analytics.trackViewCreateNewOrAddToExistingRelationshipScreen();
            break;
          case 1:
            analytics.trackViewSelectNameThatBelongsToYouScreen();
            break;
          case 2:
            analytics.trackViewTheirPronounsPickerScreen();
            break;
          case 3:
            analytics.trackViewRelationshipConnectionPickerScreen();
            break;
        }
      } else {
        switch (index) {
          case 0:
            analytics.trackViewSelectNameThatBelongsToYouScreen();
            break;
          case 1:
            analytics.trackViewTheirPronounsPickerScreen();
            break;
          case 2:
            analytics.trackViewRelationshipConnectionPickerScreen();
            break;
        }
      }
    },
    [analytics, relationshipList?.length],
  );

  return (
    <Container>
      <DarkBackgroundContainer>
        <MainContainer>
          {renderHeaderContent()}
          <PagerView
            ref={swiperRef}
            onIndexChanged={index => {
              setSelectedIndex(index);
              handleIndexChanged(index);
            }}>
            {relationshipList?.length > 0 && (
              <SelectExistingUser
                updateStep={data => {
                  onNextPress();
                  updateStep(data);
                }}
                relationshipList={relationshipList}
                onNextPress={onNextPress}
                selectedOptionForExistingUserSelection={
                  selectedOptionForExistingUserSelection
                }
                updateOptionForExistingUser={updateOptionForExistingUser}
                removeRelationhipId={removeRelationhipId}
                onExistingUserContinuePress={onExistingUserContinuePress}
                onClickCreateNewRelationship={onClickCreateNewRelationship}
                isFromUpdateAndDiffConv={isFromUpdateAndDiffConv}
                existingRelationToUpdateName={existingRelationToUpdateName}
                updateExistingRelationWithDiffNameConfirmation={
                  updateExistingRelationWithDiffNameConfirmation
                }
              />
            )}
            <UserSelectorScreen
              updateStep={data => {
                onNextPress();
                updateStep(data);
              }}
              isNamesDiff={isNamesDiff}
              senders={senders}
              selectedOptionForUserSelection={selectedOptionForUserSelection}
              updateOptionForStep={updateOptionForStep}
              removeRelationhipId={removeRelationhipId}
              isFromWhatsAppUpload={isFromWhatsAppUpload}
              isUpdateFlow={isUpdateFlow}
              updateExistingRelationship={updateExistingRelationship}
              isFromUpdateAndDiffConv={isFromUpdateAndDiffConv}
            />
            <RelationshipPronoun
              updateStep={data => {
                onNextPress();
                updateStep(data);
              }}
              selectedOptionForPronoun={selectedOptionForPronoun}
              updateOptionForStep={updateOptionForStep}
              pronounList={pronounList}
              getOtherUserName={getOtherUserName}
            />
            <RelationshipType
              getOtherUserName={getOtherUserName}
              selectedOptionForRelationshipType={
                selectedOptionForRelationshipType
              }
              relationshipTypeList={relationshipTypeList}
              callCreateRelationshipAPI={callCreateRelationshipAPI}
              updateOptionForStep={updateOptionForStep}
            />
          </PagerView>
        </MainContainer>
        {renderUpdateRelationConfirmationPopUp()}
      </DarkBackgroundContainer>
    </Container>
  );
};

export default FillWhatappQuestionnaireScreen;
