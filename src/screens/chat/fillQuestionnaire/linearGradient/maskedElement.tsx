import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default props => (
  <View style={styles.constainer}>
    <LinearGradient
      colors={[
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#00000011',
        '#00000000',
      ]}
      style={styles.linearGradient}
    />
  </View>
);

export const HomeList = props => (
  <View style={styles.constainer}>
    <LinearGradient
      colors={[
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#000000FF',
        '#00000000',
        '#00000000',
      ]}
      style={styles.linearGradient}
    />
  </View>
);

var styles = StyleSheet.create({
  constainer: {backgroundColor: 'transparent', flex: 1},
  linearGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
  },
});
