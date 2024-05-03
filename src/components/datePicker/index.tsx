/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  DatePickerHeaderView,
  DatePickerDoneButton,
  DoneLabel,
  DatePickerView,
  ContainerStyle,
} from './styles';
import {useTranslation} from 'react-i18next';
import {Animated} from 'react-native';

interface AMDatePickerProps {
  isVisible?: boolean;
  currDate?: any;
  onDonePress?: Function;
  setCurrDate?: Function;
}

const AMDatePicker: FC<AMDatePickerProps> = React.memo(props => {
  const {
    isVisible,
    onDonePress = () => {},
    currDate = new Date(),
    setCurrDate = () => {},
  } = props;
  const {t} = useTranslation();
  const animation = useState(new Animated.Value(0))[0];
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);
  if (true) {
    return (
      <Animated.View style={[ContainerStyle, {transform: [{translateY}]}]}>
        <DatePickerHeaderView>
          <DatePickerDoneButton onPress={onDonePress}>
            <DoneLabel>{t('Done')}</DoneLabel>
          </DatePickerDoneButton>
        </DatePickerHeaderView>
        <DatePickerView
          date={currDate}
          onDateChange={date => {
            setCurrDate(date);
          }}
        />
      </Animated.View>
    );
  }
});

export default AMDatePicker;
