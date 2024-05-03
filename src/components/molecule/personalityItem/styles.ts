import {scale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import {border, color, layout, size, space} from 'styled-system';
import {
  TextPropsType,
  ViewPropsType,
} from '../../../../@types/styledComponents';
import {FontFamily} from 'custom_enums';
import AMButton from '../../button/AMButton';
import {ONBOARDING_GRADIENT_BACKGROUND} from '../../../constants/imageConstants';
import {SvgXml} from 'react-native-svg';
import {SELECTED_CHECK_ICON} from '../../../assets/svg/personality';
import { IS_IOS_PLATFORM } from '../../../constants/appContants';

export const CardInnerView = styled.View.attrs<ViewPropsType>(props => ({
  borderColor: props.isOldUI
    ? props?.theme.colors.cardBorder
    : props?.theme.colors.cardBorderNew,
  borderWidth: 1,
  borderRadius: 10,
  marginHorizontal: scale(12),
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: scale(17),
  paddingVertical: 24,
  height: 417,
  //minHeight: verticalScale(417),
  // maxHeight: verticalScale(IS_IOS_PLATFORM ? 417 : 445),
  backgroundColor: props.isOldUI
    ? props?.theme.colors.base_90
    : props?.theme.colors.black_10_new,
}))`
  ${color} ${space} ${layout} ${border};
`;

export const DetailContainer = styled.View.attrs<any>(() => ({
  alignItems: 'center',
}))``;

export const ProfileContainer = styled.View.attrs<ViewPropsType>(props => ({
  width: 72,
  height: 72,
  borderRadius: 36,
  borderWidth: 2,
  borderColor: props.theme.colors.white,
}))`
  align-items: center;
  justify-content: center;
  ${border}
  ${layout}
${color}
`;

export const ProfileView = styled.Image.attrs<ViewPropsType>(props => ({
  width: 71,
  height: 71,
  borderRadius: 35.5,
  borderWidth: 1,
  borderColor: props.theme.colors.white,
}))`
  ${border}
  ${layout}
  ${color}
`;

export const ImageLoaderContainer = styled.View.attrs<any>(() => ({}))`
  align-items: center;
  justify-content: center;
  flex: 1;
  position: absolute;
`;

export const CheckIcon = styled(SvgXml).attrs(() => ({
  xml: SELECTED_CHECK_ICON,
}))``;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 1,
}))`
  margin-top: 15.5px;
  font-family: ${FontFamily.Bold};
  font-size: 18px;
  line-height: 28.8px;
  text-align: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const TitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 1,
}))`
  font-family: ${FontFamily.Medium};
  font-size: 16px;
  line-height: 25.6px;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const SubTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  numberOfLines: 6,
}))`
  font-family: ${FontFamily.Medium};
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 24px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${14}px;
  text-align: center;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const SelectedLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${14}px;
  margin-left: ${10}px;
  padding-vertical: 0px;
  line-height: ${IS_IOS_PLATFORM ? 21 : 16}px;
  ${color}
  ${size}
    ${layout}
    ${space}
`;

export const BottomTouchable = styled(AMButton).attrs<any>(props => ({
  height: 36,
  width: scale(201),
  backgroundColor: props.isOldUI
    ? props.theme.colors.secoundary
    : props.theme.colors.secoundary_new,
  borderRadius: 30,
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
    ${layout}
    ${border}
`;

export const GradientContainer = styled.Image.attrs<any>(() => ({
  source: ONBOARDING_GRADIENT_BACKGROUND,
  opacity: 0.6,
}))`
  position: absolute;
  bottom: 0px;
  right: 0px;
  min-height: ${verticalScale(400)}px;
  max-height: ${verticalScale(428)}px;
  width: 375px;
  align-self: stretch;
  ${layout}
  ${space}
`;

export const SelectedView = styled.View.attrs<any>(props => ({
  height: 36,
  width: scale(131),
  backgroundColor: props.theme.colors.primary_light,
  borderRadius: 30,
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
  ${layout}
  ${border}
`;
