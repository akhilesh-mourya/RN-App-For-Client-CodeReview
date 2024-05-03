import React, {FC, useCallback, useRef, useState} from 'react';
import {
  BackButtonView,
  BackIcon,
  Container,
  HeaderContainer,
  MainContainer,
  PagerView,
} from './styles';
import {DarkBackgroundContainer} from '../../../../components/screenBackground/GradientBackgroundContainer';
import {FillIMessageQuitoinnaireProps} from '../../../../types';
import IMessageRelationshipType from './subComponents/relationshipType';
import {useIMessageQuestionnaire} from '../../../../hooks/iMessageQuestionnaire/useIMessageQuestionnaire';
import IMessageRelationshipPronoun from './subComponents/relationshipPronoun';
import {useNavigation} from '@react-navigation/native';
import {useAnalytics} from '../../../../services/analytics';
import {MixpanelData} from '../../../../constants/enums';

const FillIMessageQuestionnaireScreen: FC<
  FillIMessageQuitoinnaireProps
> = () => {
  const {
    RELATIONSHIP_TYPE_LIST,
    selectedOptionForRelationshipType,
    otherUserName,
    selectedOptionForPronoun,
    pronounList,
    updateOptionForStep,
    onFinalStepPress,
    selectedRelationshipPronoun,
  } = useIMessageQuestionnaire();
  const navigation = useNavigation();
  const swiperRef = useRef<any>(null);
  const [selectedInex, setSelectedIndex] = useState(0);

  const renderHeaderContent = () => {
    return (
      <HeaderContainer>
        <BackButtonView onPress={onPrevPress}>
          <BackIcon />
        </BackButtonView>
      </HeaderContainer>
    );
  };

  const pageIndexRef = useRef(0);

  const onNextPress = (nextBy: number = 1, shouldAnimate: boolean = true) => {
    if (pageIndexRef.current === 0) {
      analytics.trackTouchContinueButtonOnTheirPronounsPickerScreen(
        MixpanelData[selectedRelationshipPronoun],
      );
    }

    swiperRef?.current?.scrollBy(nextBy, shouldAnimate);
  };

  const onPrevPress = (prevBy: number = -1, shouldAnimate: boolean = true) => {
    swiperRef?.current?.scrollBy(prevBy, shouldAnimate);
    if (selectedInex === 0) {
      navigation.goBack();
    }
  };

  const analytics = useAnalytics();

  const handleIndexChanged = useCallback(
    (index: number) => {
      pageIndexRef.current = index;

      switch (index) {
        case 0:
          analytics.trackViewPronounsFormScreen();
          break;
        case 1:
          analytics.trackViewRelationshipConnectionPickerScreen();
          break;
      }
    },
    [analytics],
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
            <IMessageRelationshipPronoun
              updateStep={onNextPress}
              otherUserName={otherUserName}
              pronounList={pronounList}
              selectedOptionForPronoun={selectedOptionForPronoun}
              updateOptionForStep={updateOptionForStep}
            />
            <IMessageRelationshipType
              relationshipsList={RELATIONSHIP_TYPE_LIST}
              selectedOptionForRelationshipType={
                selectedOptionForRelationshipType
              }
              updateOptionForStep={updateOptionForStep}
              onFinalStepPress={onFinalStepPress}
            />
          </PagerView>
        </MainContainer>
      </DarkBackgroundContainer>
    </Container>
  );
};

export default FillIMessageQuestionnaireScreen;
