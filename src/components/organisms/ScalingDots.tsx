import React from 'react';
import {Animated, Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {SELECT_PERSONALITY_CARD_WIDTH} from '../../constants/appContants';
export interface ScalingDotProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotScale?: number;
  activeDotColor?: string;
  itemWidth?: number;
}

const ScalingDot = ({
  scrollX,
  data,
  dotStyle,
  containerStyle,
  inActiveDotOpacity,
  activeDotScale,
  activeDotColor,
  itemWidth,
}: ScalingDotProps) => {
  const defaultProps = {
    inActiveDotColor: Platform.OS === 'android' ? activeDotColor : '#857890', //'#347af0',
    activeDotColor: activeDotColor, //'#347af0',
    animationType: 'scale',
    inActiveDotOpacity:
      inActiveDotOpacity || Platform.OS === 'android' ? 0.3 : 1,
    activeDotScale: activeDotScale || 1.4,
    itemWidth: SELECT_PERSONALITY_CARD_WIDTH,
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * itemWidth,
          index * itemWidth,
          (index + 1) * itemWidth,
        ];

        const colour = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotColor,
            defaultProps.activeDotColor,
            defaultProps.inActiveDotColor,
          ],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotOpacity,
            1,
            defaultProps.inActiveDotOpacity,
          ],
          extrapolate: 'clamp',
        });
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [1, defaultProps.activeDotScale, 1],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[
              styles.dotStyle,
              {opacity},
              {transform: [{scale}]},
              dotStyle,
              {backgroundColor: colour},
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default ScalingDot;
