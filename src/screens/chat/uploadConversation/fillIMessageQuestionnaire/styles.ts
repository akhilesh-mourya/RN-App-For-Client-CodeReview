import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {ViewPropsType} from '../../../../../@types/styledComponents';
import theme from '../../../../theme';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {Platform} from 'react-native';
import {border, color, layout, padding, size, space} from 'styled-system';
import {HEADER_BACK_ARROW_ICON} from '../../../../assets/svg';
import AMButton from '../../../../components/button/AMButton';
import {SvgXml} from 'react-native-svg';
import {IS_IOS_PLATFORM} from '../../../../constants/appContants';

export const Container = styled.SafeAreaView.attrs<ViewPropsType>(() => ({
  backgroundColor: theme.colors.base_new,
}))`
  flex: 1;
  padding-horizontal: ${verticalScale(IS_IOS_PLATFORM ? 32 : 0)}px;
`;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))``;

export const HeaderContainer = styled.View.attrs<any>(props => ({
  paddingTop: verticalScale(Platform.OS === 'android' ? 24 : 16),
  paddingHorizontal: scale(2),
  backgroundColor: props.theme.colors.base_new,
}))`
  padding-bottom: 10;
  margin-left: 24px;
  ${size}
  ${layout}
  ${space}
`;

export const BackButtonView = styled(AMButton).attrs<ViewPropsType>(props => ({
  height: 40,
  width: 40,
  borderRadius: scale(20),
  backgroundColor: props.theme.colors.backButtonBg,
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${space} ${border} ${color}
`;

export const BackIcon = styled(SvgXml).attrs<any>(() => ({
  xml: HEADER_BACK_ARROW_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const PagerView = styled(Swiper).attrs(() => ({
  loop: false,
  showsButtons: false,
  key: 3,
  showsPagination: false,
  scrollEnabled: false,
  removeClippedSubviews: false,
  style: {
    flex: 1,
  },
}))``;
