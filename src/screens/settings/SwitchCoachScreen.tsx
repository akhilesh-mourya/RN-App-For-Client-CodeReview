import React, {FC} from 'react';
import {useSetting} from '../../hooks/settings/useSetting';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {
  CenterDescription,
  CoachHeaderTitle,
  PagerContainer,
  PagerView,
  PersonalityCardContainer,
  RawPaddingView,
  SubContainer,
  ViewPagerContainer,
  carousalStyle,
} from './styles';
import {t} from 'i18next';
import {CarouselRenderItem} from 'react-native-reanimated-carousel';
import {PersonalityDataProps} from '../../constants/mockData';
import {Animated} from 'react-native';
import PersonalityItems from '../../components/molecule/personalityItem';
import ScalingDot from '../../components/organisms/ScalingDots';
import {SELECT_PERSONALITY_CARD_WIDTH} from '../../constants/appContants';
import theme from '../../theme';
import HeaderWithBackTitle from '../../components/headerWithBackTitle';
import {SwitchPersonalityPopUp} from '../../components/switchPersonalityPopUp';

const SwitchCoachScreen: FC<{}> = React.memo(() => {
  const {
    personalityList,
    getCardAnimInterpolation,
    onSelectPersonalityPress,
    startCardAnimation,
    startDotAnimation,
    redirectToPreviousScreen,
    onPressShowPopUp,
    onSwitchContinuePress,
    scrollX,
    assistantId,
    isSwitchPopUpVisible,
  } = useSetting();

  const renderHeaderContent = () => (
    <RawPaddingView>
      <CoachHeaderTitle>{t('Your_Coach_Personality')}</CoachHeaderTitle>
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
            onSelectPersonalityPress(item);
          }}
          isForSwitch={true}
          index={index}
          isSelected={item?.id === assistantId ? true : false}
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
        <HeaderWithBackTitle
          title={t('')}
          onBackPress={redirectToPreviousScreen}
        />
        {renderHeaderContent()}
        {renderPagerContent()}
        <SwitchPersonalityPopUp
          isVisible={isSwitchPopUpVisible}
          onHidePress={onPressShowPopUp}
          onContinuePress={onSwitchContinuePress}
        />
      </SubContainer>
    </DarkBackgroundContainer>
  );
});

export default SwitchCoachScreen;
