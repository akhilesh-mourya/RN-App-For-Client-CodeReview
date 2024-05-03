import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';
import {ProgressContainer, bar, barHome} from './styles';

const ProgressBar = ({progress = 4, width = 121, isfromHome = true}) => {
  const [customProgress] = useState(new Animated.Value(0));
  const progressRatio = width / 100;
  const calculatedProgress = progress * progressRatio;
  useEffect(() => {
    Animated.timing(customProgress, {
      toValue: calculatedProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <ProgressContainer width={width} isfromHome={isfromHome}>
      <Animated.View
        style={[isfromHome ? barHome : bar, {width: customProgress}]}
      />
    </ProgressContainer>
  );
};

export default ProgressBar;
