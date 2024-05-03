import React, {FC, useCallback, useState} from 'react';
import {
  SubContainer,
  CenterHeaderTitle,
  RawPaddingView,
  CenterDescription,
  PagerView,
  PersonalityCardContainer,
  PagerContainer,
  carousalStyle,
  ViewPagerContainer,
} from './styles';
import {useTranslation} from 'react-i18next';
import PersonalityItems from '../../components/molecule/personalityItem';
import {HeaderWithSkip} from '../../components/headerWithSkip';
import {SkipPopUp} from '../../components/skipPopUp';
import {Animated} from 'react-native';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import ScalingDot from '../../components/organisms/ScalingDots';
import theme from '../../theme';
import {SELECT_PERSONALITY_CARD_WIDTH} from '../../constants/appContants';
import {usePersonality} from '../../hooks/personality/usePersonality';
import {PersonalityDataProps} from '../../constants/mockData';
import {CarouselRenderItem} from 'react-native-reanimated-carousel';
import {SelectPersonalityScreenProps} from '../../types';
import {useAnalytics} from '../../services/analytics';

const SelectPersonalityScreen: FC<
  SelectPersonalityScreenProps
> = screenProps => {
  const {userFirstName = '', userLastName = ''} =
    screenProps?.route?.params || {};
  const {t} = useTranslation();
  const [isSkipPopUpVisible, setSkipPopUpVisible] = useState(false);

  const {
    scrollX,
    getCardAnimInterpolation,
    startCardAnimation,
    startDotAnimation,
    selectCoachThroughSelectPersonality,
    onSkipContinuePress,
    personalityList,
  } = usePersonality(userFirstName, userLastName);

  const analytics = useAnalytics();

  const handleTouchSkipButton = useCallback(() => {
    setSkipPopUpVisible(true);
    analytics.trackTouchSkipButtonOnCoachPersonalityPickerScreen();
  }, [analytics]);

  const handleTouchDismissOnSkipConfirmationPopup = useCallback(() => {
    setSkipPopUpVisible(false);
    analytics.trackTouchDismissButtonOnSkipConfirmationPopupOnCoachPersonalityPickerScreen();
  }, [analytics]);

  const handleTouchContinueOnSkipConfirmationPopup = useCallback(() => {
    setSkipPopUpVisible(false);
    onSkipContinuePress();
  }, [analytics, onSkipContinuePress]);

  const renderHeaderContent = () => (
    <RawPaddingView>
      <CenterHeaderTitle>{t('Select_Personality_Header')}</CenterHeaderTitle>
      <CenterDescription>
        {t('Select_Personality_Description')}
      </CenterDescription>
    </RawPaddingView>
  );

  const AnimatedPersonalityCardContainer = Animated.createAnimatedComponent(
    PersonalityCardContainer,
  );

  const renderPagerItem: CarouselRenderItem<PersonalityDataProps> = ({
    item,
    index,
  }) => {
    let translateCardOpacity = getCardAnimInterpolation(index);

    return (
      <AnimatedPersonalityCardContainer opacity={translateCardOpacity}>
        <PersonalityItems
          data={item}
          onPress={() => {
            selectCoachThroughSelectPersonality(item);
          }}
          isForSwitch={false}
          isSelected={false}
          isOldUI={false}
        />
      </AnimatedPersonalityCardContainer>
    );
  };

  const renderPagerContent = () => {
    return (
      <>
        <ViewPagerContainer>
          <PagerView
            data={personalityList}
            renderItem={renderPagerItem}
            style={carousalStyle}
            onProgressChange={(
              offsetProgress: number,
              absoluteProgress: number,
            ) => {
              startDotAnimation(offsetProgress);
              startCardAnimation(absoluteProgress);
            }}
          />
        </ViewPagerContainer>
        <PagerContainer>
          <ScalingDot
            data={personalityList}
            scrollX={scrollX}
            inActiveDotColor={theme.colors.inactiveDotColor}
            activeDotColor={theme.colors.white}
            activeDotScale={1}
            itemWidth={SELECT_PERSONALITY_CARD_WIDTH}
          />
        </PagerContainer>
      </>
    );
  };

  return (
    <DarkBackgroundContainer>
      <SubContainer>
        <HeaderWithSkip onPress={handleTouchSkipButton} />
        {renderHeaderContent()}
        {renderPagerContent()}
      </SubContainer>
      <SkipPopUp
        isVisible={isSkipPopUpVisible}
        onTouchDismiss={handleTouchDismissOnSkipConfirmationPopup}
        onTouchContinue={handleTouchContinueOnSkipConfirmationPopup}
      />
    </DarkBackgroundContainer>
  );
};

export default SelectPersonalityScreen;
