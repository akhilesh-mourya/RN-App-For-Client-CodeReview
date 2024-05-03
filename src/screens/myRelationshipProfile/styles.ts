import styled from 'styled-components/native';
import theme from '../../theme';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import {border, color, layout, padding, size, space} from 'styled-system';
import {FontFamily} from 'custom_enums';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import AMButton from '../../components/button/AMButton';
import {SvgXml} from 'react-native-svg';
import {CREATE_NEW_NEXT_ARROW_ICON} from '../../assets/svg/home';
import {Dimensions} from 'react-native';

export const SafeAreaContainer = styled.SafeAreaView.attrs<ViewPropsType>(
  () => ({
    backgroundColor: theme.colors.base_new,
  }),
)`
  flex: 1;
  ${color}
`;

export const SubContainer = styled.View.attrs<ViewPropsType>(() => ({}))`
  margin-horizontal: 24px;
  ${space}
`;

export const SubTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${16}px;
  line-height: 25px;
  text-align: left;
  margin-top: ${verticalScale(40)}px;
  margin-bottom: ${verticalScale(16)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const TouchableView = styled(AMButton).attrs(() => ({}))``;

export const SectionContainer = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  borderColor: theme.colors.inputBorder,
  borderWidth: 1,
  bg: theme.colors.black_10,
}))`
  flex-direction: row;
  border-radius: ${moderateScale(10)}px;
  margin-top: ${verticalScale(8)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: 13px;
  ${layout}
  ${color}
  ${border}
  ${padding}
`;

export const BasicSectionContainer = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'space-between',
  alignItems: 'center',
}))`
  flex-direction: row;
  border-radius: ${moderateScale(10)}px;
  margin-top: ${verticalScale(8)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: 13px;
  ${layout}
  ${color}
  ${border}
  ${padding}
`;

export const RowContainer = styled.View.attrs<ViewPropsType>(() => ({
  flexDirection: 'row',
  marginHorizontal: scale(4),
  justifyContent: 'center',
  alignItems: 'center',
}))``;

export const IconContainer = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.relationship_profile_bg_color,
  borderRadius: moderateScale(10),
}))`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  ${color}
  ${space}
  ${border}
  ${layout}
`;

export const SeparatorView = styled.View.attrs<ViewPropsType>(() => ({
  width: Dimensions.get('screen').width - 30,
  backgroundColor: theme.colors.separatorBgColor,
  height: 0.9,
  marginLeft: scale(24),
}))``;

export const ComingSoonContainer = styled.View.attrs<ViewPropsType>(() => ({
  bg: theme.colors.primary_light,
  borderRadius: 87.209,
}))`
  justify-content: center;
  align-items: center;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  ${color}
  ${space}
  ${border}
  ${layout}
  ${padding}
`;

export const IconTitle = styled.Text.attrs<TextPropsType>(() => ({}))`
  font-family: ${FontFamily.Bold};
  font-size: ${20}px;
  line-height: 32px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const SectionTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: 16px;
  line-height: 21.9px;
  margin-left: ${scale(12)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const SectionValue = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: 14px;
  line-height: 23px;
  margin-left: ${scale(12)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const NextArrowIcon = styled(SvgXml).attrs(() => ({
  xml: CREATE_NEW_NEXT_ARROW_ICON,
}))``;

export const ComingSoonTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Medium};
  font-size: ${scale(13)}px;
  line-height: 18.2px;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${padding}
`;

export const ColumnContainer = styled.View.attrs<ViewPropsType>(() => ({
  marginHorizontal: scale(4),
}))``;
