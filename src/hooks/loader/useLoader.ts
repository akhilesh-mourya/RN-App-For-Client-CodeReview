import {useContext, useRef, useState} from 'react';
import {LoaderContext} from '../../context/loaderContext';
import {Animated, Dimensions, Platform} from 'react-native';
import {ErroPopupType} from '../../enums';

export const useLoader = () => {
  const contextLoader = useContext<any>(LoaderContext);
  const width = Dimensions.get('window').width;
  const offset = useRef(new Animated.Value(0)).current;

  const showLoader = (timer = 30000) => {
    contextLoader?.setLoaderVisible(true, true);
    if (timer) {
      setTimeout(() => {
        contextLoader?.isVisible &&
          contextLoader?.setLoaderVisible(false, true);
      }, timer);
    }
  };

  const showErrorMessage = ({onSuccessCallBack = () => {}, ...props}) => {
    contextLoader?.setErrorPopupVisible({
      ...props,
      isErrorPopupVisible: true,
      onSuccessCallBack,
    });
  };

  const updateOldErrorUI = (flag: boolean) => {
    contextLoader?.setErrorOldUI(flag);
  };

  const hideLoaderAndShowErrorMessage = (
    message: any,
    okButtonLable: string = '',
  ) => {
    hideLoader(true);
    setTimeout(() => {
      contextLoader?.setErrorPopupVisible({
        isErrorPopupVisible: true,
        errorMessage: message,
        errorPopupType: ErroPopupType.ErrorWithTitle,
        onSuccessCallBack: () => {},
        okButtonLable: okButtonLable,
      });
    }, 800);
  };

  const hideErrorPopup = () => {
    contextLoader?.setErrorPopupHide();
  };

  const hideLoader = (isAnimationEnabled?: boolean) => {
    contextLoader?.setLoaderVisible(false, isAnimationEnabled);
  };

  const translateGetStartedOpacity = offset.interpolate({
    inputRange: [0, width, 2 * width],
    outputRange: [1, 1, 0],
  });

  const startBorderColorAnim = () => {
    const translationBorderColor = new Animated.Value(0);
    const translateBorderColor = translationBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    Animated.timing(translationBorderColor, {
      toValue: 1,
      duration: Platform.OS === 'android' ? 1000 : 300,
      useNativeDriver: Platform.OS === 'android' ? true : false,
    }).start();

    return translateBorderColor;
  };

  const startOpacityForMainContainer = () => {
    const translationBorderColor = new Animated.Value(1);
    const translateBorderColor = translationBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    Animated.timing(translationBorderColor, {
      toValue: 0,
      duration: Platform.OS === 'android' ? 3000 : 300,
      useNativeDriver: Platform.OS === 'android' ? true : false,
    }).start();

    return translateBorderColor;
  };

  return {
    showLoader,
    hideLoader,
    showErrorMessage,
    hideErrorPopup,
    hideLoaderAndShowErrorMessage,
    translateGetStartedOpacity,
    startBorderColorAnim,
    startOpacityForMainContainer,
    updateOldErrorUI,
    errorMessage: contextLoader?.errorMessage,
    contextLoader,
  };
};
