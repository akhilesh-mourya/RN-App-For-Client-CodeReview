import React, {FC, useRef} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {
  PagerView,
  BottomContainer,
  NextIcon,
  BackIcon,
  RowView,
  NextPrevBtnStyle,
  NextPrevButtonView,
  RowSubContainer,
} from './styles';
import OnBoardingScreenStepCopilot from './subComponents/OnBoardingScreenStepCopilot';
import OnBoardingScreenStepKnowledge from './subComponents/OnBoardingScreenStepKnowledge';
import OnBoardingScreenStepPrivacy from './subComponents/OnBoardingScreenStepPrivacy';
import {useOnboarding} from '../../hooks/onboarding/useOnboarding';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';

const OnBoarding: FC<{}> = () => {
  const {
    currSwiperIndex,
    translateRight,
    translateLeft,
    translateArrowOpacity,
    translateGetStartedRight,
    translateNextPrevBtnOpacity,
    translateGetStartedOpacity,
    onSwiperIndexChange,
    offset,
  } = useOnboarding();

  const swiperRef = useRef<any>(null);
  const LeftAnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
  const NextPrevButtonViewSeparatorAnim =
    Animated.createAnimatedComponent(NextPrevButtonView);
  const RightAnimatedButton =
    Animated.createAnimatedComponent(TouchableOpacity);

  const RowSubAnimatedContainer =
    Animated.createAnimatedComponent(RowSubContainer);

  const BottomAnimatedContainer =
    Animated.createAnimatedComponent(BottomContainer);

  const onPrevPress = () => {
    swiperRef?.current?.scrollBy(-1);
  };

  const onNextPress = () => {
    swiperRef?.current?.scrollBy(1);
  };

  const renderKnowledgeStepBottomView = () => {
    return (
      <RowView>
        <LeftAnimatedButton
          activeOpacity={1}
          onPress={onPrevPress}
          style={[NextPrevBtnStyle, {left: translateLeft}]}>
          {
            <NextPrevButtonViewSeparatorAnim opacity={translateArrowOpacity}>
              <BackIcon />
            </NextPrevButtonViewSeparatorAnim>
          }
        </LeftAnimatedButton>
        <RightAnimatedButton
          activeOpacity={1}
          onPress={onNextPress}
          style={[NextPrevBtnStyle, {left: translateRight}]}>
          <NextPrevButtonView>
            <NextIcon />
          </NextPrevButtonView>
        </RightAnimatedButton>
      </RowView>
    );
  };

  const renderBottomView = () => {
    return (
      <BottomAnimatedContainer style={{right: translateGetStartedRight}}>
        <RowSubAnimatedContainer
          opacity={translateNextPrevBtnOpacity}
          style={{right: translateGetStartedRight}}>
          {renderKnowledgeStepBottomView()}
        </RowSubAnimatedContainer>
      </BottomAnimatedContainer>
    );
  };

  return (
    <DarkBackgroundContainer>
      <PagerView
        ref={swiperRef}
        index={currSwiperIndex}
        onIndexChanged={onSwiperIndexChange}
        removeClippedSubviews={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: offset}}}],
          {useNativeDriver: false},
        )}>
        <OnBoardingScreenStepCopilot />
        <OnBoardingScreenStepKnowledge />
        <OnBoardingScreenStepPrivacy
          translateGetStartedOpacity={translateGetStartedOpacity}
        />
      </PagerView>
      {renderBottomView()}
    </DarkBackgroundContainer>
  );
};

export default OnBoarding;
