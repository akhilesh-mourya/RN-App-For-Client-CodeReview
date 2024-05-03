import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import Swiper from 'react-native-swiper';
import {SCREEN_GRADIENT_BACKGROUND} from '../../constants/imageConstants';
import AMButton from '../../components/button/AMButton';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {BACK_ARROW_ICON, NEXT_ARROW_ICON} from '../../assets/svg';
import {SvgXml} from 'react-native-svg';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

export const Container = styled.ImageBackground.attrs<any>(() => ({
  source: SCREEN_GRADIENT_BACKGROUND,
}))`
  flex: 1;
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs(() => ({}))`
  flex: 1;
  background-color: ${props => props.theme.colors.base};
`;

export const RowSubContainer = styled.View.attrs<any>(() => ({width: width}))`
  align-items: center;
  ${layout}
`;

export const PagerView = styled(Swiper).attrs(() => ({
  loop: false,
  showsButtons: false,
  key: 3,
  showsPagination: false,
  style: {
    flex: 1,
  },
}))``;

export const BottomContainer = styled.View.attrs(() => ({}))`
  align-items: center;
  position: absolute;
  bottom: ${verticalScale(80)}px;
  flex-direction: row;
  right: 0px;
  left: 0px;
`;

export const Touchable = styled(AMButton).attrs(() => ({}))``;

export const NextPrevButtonView = styled.View.attrs<ViewPropsType>(() => ({
  height: scale(40),
  width: scale(40),
  borderRadius: scale(20),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#291C5E', //'rgba(201, 115, 255, 0.4)',
}))`
  ${layout} ${space} ${border}
`;

export const BackIcon = styled(SvgXml).attrs<any>(() => ({
  xml: BACK_ARROW_ICON,
  mr: 1,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const NextIcon = styled(SvgXml).attrs<any>(() => ({
  xml: NEXT_ARROW_ICON,
  ml: 1,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const RowView = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  padding-right: ${scale(40)}px;
  padding-bottom: ${scale(40)}px;
`;

export const BottomTouchable = styled(AMButton).attrs<any>(props => ({
  alignSelf: 'stretch',
  height: verticalScale(54),
  backgroundColor: props.theme.colors.getStartedBgColor,
  borderRadius: scale(30),
  width: scale(310),
}))`
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
${layout}
${border}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${moderateScale(20, 0.5)}px;
  align-self: center;
  text-align: center;
  line-height: 27px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const NextPrevBtnStyle: any = {
  position: 'absolute',
};
