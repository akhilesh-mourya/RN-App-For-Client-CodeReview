import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {Dimensions} from 'react-native';
import {useAnalytics} from '../../services/analytics';
const width = Dimensions.get('window').width;

export const useOnboarding = () => {
  const offset = useRef(new Animated.Value(0)).current;

  const [currSwiperIndex, setCurrSwiperIndex] = useState(0);

  const analytics = useAnalytics();

  useEffect(() => {
    switch (currSwiperIndex) {
      case 0:
        analytics.trackViewYourAiDatingCopilotIntroScreen();
        break;
      case 1:
        analytics.trackViewRNCodeForClientReviewLearnsFromChatIntroScreen();
        break;
      case 2:
        analytics.trackViewWeCareAboutPrivacyIntroScreen();
        break;
    }
  }, [analytics, currSwiperIndex]);

  const translateLeft = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [0, -40, -40],
  });
  const translateRight = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [0, 40, 40],
  });
  const translateArrowOpacity = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [0, 1, 1],
  });
  const translateGetStartedRight = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [0, 0, width],
  });
  const translateNextPrevBtnOpacity = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [1, 1, 0],
  });
  const translateGetStartedOpacity = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [0, 0, 1],
  });

  const onSwiperIndexChange = (newIndex: number) => {
    setCurrSwiperIndex(newIndex);
  };

  return {
    translateLeft,
    translateRight,
    onSwiperIndexChange,
    currSwiperIndex,
    translateArrowOpacity,
    translateGetStartedRight,
    translateNextPrevBtnOpacity,
    translateGetStartedOpacity,
    offset,
  };
};
