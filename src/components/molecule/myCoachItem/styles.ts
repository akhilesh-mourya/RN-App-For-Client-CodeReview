import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import {SvgXml} from 'react-native-svg';
import {RNCodeForClientReview_LOGO_SVG, DOT_SVG_ICON} from '../../../assets/svg';
import AMButton from '../../button/AMButton';
import { IS_IOS_PLATFORM } from '../../../constants/appContants';

export const Container = styled(AMButton).attrs<any>(props => ({
  borderRadius: scale(10),
  borderWidth: 1,
  marginTop: verticalScale(16),
  borderColor: props.theme.colors.cardBorderNew,
  padding: scale(16),
  bg: props.theme.colors.black_10_new,
}))`
  flex-direction: row;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const InnerRowView = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
}))`
  flex: 1;
  ${color}
  ${space}
  ${layout}
`;

export const ProfileImg = styled.Image.attrs(() => ({
  width: scale(40),
  height: scale(40),
  borderRadius: scale(20),
}))`
  margin-top: ${verticalScale(6)}px;
  ${color}
  ${space}
  ${layout}
`;

export const NameContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}))`
  ${color}
  ${space}
  ${layout}
`;

export const DetailContainer = styled.View.attrs<ViewPropsType>(() => ({
  marginLeft: scale(10),
  marginRight: scale(4),
}))`
  flex: 1;
`;

export const StarIcon = styled(SvgXml).attrs<any>(() => ({
  xml: RNCodeForClientReview_LOGO_SVG,
  height: verticalScale(20),
  width: scale(18.2),
}))`
  margin-left: ${scale(8)}px;
  margin-bottom: 2px;
  margin-bottom: ${IS_IOS_PLATFORM ? 2 : -2}px;
  ${color}
  ${layout}
`;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  line-height: ${32}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubTitleBoldLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  maxWidth: scale(181),
  numberOfLines: 1,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${moderateScale(14)}px;
  line-height: ${verticalScale(22.4)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.placeholder_new,
  maxWidth: scale(181),
  numberOfLines: 1,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${moderateScale(14)}px;
  line-height: ${verticalScale(22.4)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const TimeLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.placeholder_new,
}))`
  text-align: center;
  font-family: ${FontFamily.Medium};
  font-size: ${moderateScale(12)}px;
  align-self: center;
  align-items: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DotIcon = styled(SvgXml).attrs<any>(() => ({
  xml: DOT_SVG_ICON,
}))`
  margin-left: ${scale(8)}px;
  ${color}
  ${layout}
`;
