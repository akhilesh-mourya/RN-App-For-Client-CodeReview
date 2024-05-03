import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters/extend";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import theme from "../../theme";
import { ViewPropsType } from "../../../@types/styledComponents";
import { Dimensions } from "react-native";
import { border, layout, space } from "styled-system";

export const ModalContainer = styled.View.attrs((props) => ({
  animationIn: "fadeIn",
  animationOut: "fadeOut",
  backdropColor: theme.colors.black,
  backdropOpacity: 0.6,
  animationInTiming: props?.isAnimationEnabled ? 200 : 0,
  animationOutTiming: props?.isAnimationEnabled ? 200 : 0,
  style: {
    margin: 0,
  },
  hideModalContentWhileAnimating: true,
  flex: 1,
}))``;

export const Container = styled.View.attrs(() => ({}))`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const MainContainer = styled.View.attrs(() => ({
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
}))`
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  ${layout}
`;


export const LoaderContainer = styled.View.attrs<ViewPropsType>(() => ({
  width: scale(94),
  height: verticalScale(94),
}))`
  border-radius: ${moderateScale(18.8)}px;
  padding-horizontal: ${scale(23)}px;
  padding-vertical: ${verticalScale(23)}px;
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: center;
  position: absolute;
  ${layout} ${space} ${border}
`;

export const LottieContainer = styled(LottieView).attrs<any>(() => ({
  width: scale(48),
  height: verticalScale(48),
  autoPlay: true,
  loop: true,
  source: require("../../assets/lottie/loader.json"),
}))``;

export const GifImage = styled.Image.attrs<ViewPropsType>(() => ({
  flex: 1,
}))``;
