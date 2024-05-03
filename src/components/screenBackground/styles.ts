import styled from 'styled-components/native';
import {
  ONBOARDING_GRADIENT_BACKGROUND,
  CHAT_GRADIENT,
} from '../../constants/imageConstants';
import {layout, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View.attrs<any>(props => ({
  backgroundColor: props.theme.colors.base,
}))`
  flex: 1;
  ${layout}
  ${space}
`;

export const DarkContainer = styled.View.attrs<any>(props => ({
  backgroundColor: props.theme.colors.base_new,
}))`
  flex: 1;
  ${layout}
  ${space}
`;

export const GradientContainer = styled.Image.attrs<any>(() => ({
  source: ONBOARDING_GRADIENT_BACKGROUND,
  resizeMode: 'stretch',
}))`
  position: absolute;
  bottom: ${props => props?.bottomMargin}px;
  right: 0px;
  left: 0px;
  width: ${scale(375)}px;
  height: ${verticalScale(522)}px;
  ${layout}
  ${space}
`;

export const GradientCommonContainer = styled.Image.attrs<any>(() => ({
  source: CHAT_GRADIENT,
  resizeMode: 'stretch',
  width: 425,
}))`
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  top: 0px;
  ${layout}
  ${space}
`;

export const DiamondGradientContainer: any = styled(LinearGradient).attrs(
  props => ({
    colors: props?.theme?.colors.diamondGradient,
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    angle: 45,
    useAngle: true,
    angleCenter: {x: 0.5, y: 0.5},
  }),
)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  top: 0px;
  ${layout}
  ${space}
`;
