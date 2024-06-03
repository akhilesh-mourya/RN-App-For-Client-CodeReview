import styled from 'styled-components/native';
import {border, color, layout, padding, size, space} from 'styled-system';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  SVGXMLPropsType,
  TextPropsType,
} from '../../../../@types/styledComponents';
import AMButton from '../../../components/button/AMButton';
import {SvgProps, SvgXml} from 'react-native-svg';
import {
  HOME_NEXT_ARROW_NEW,
  UPLOAD_CONVERSATION_ARROW_ICON,
} from '../../../assets/svg';
import {UPLOAD_BUTTON_ICON} from '../../../assets/svg/home';
import AMPrimaryButton from '../../../components/button/AMPrimaryButton';
import i18next from 'i18next';
import {PrimaryButtonType} from '../../../constants/enums';
import {Platform} from 'react-native';
import {IStyledComponent} from 'styled-components';
import {AdditionalProps, XmlProps} from 'react-native-svg/lib/typescript/xml';
import {Substitute} from 'styled-components/dist/types';

export const Container = styled.View.attrs<any>(() => ({
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${padding}
`;

export const MainContainer = styled.View.attrs(() => ({}))`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  ${padding}
`;

export const NameLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(68),
}))`
  font-family: ${FontFamily.Bold};
  font-size: 32px;
  line-height: 44px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const RelationShipContainer: any = styled(AMButton).attrs<any>(
  props => ({
    borderRadius: moderateScale(10),
    height: verticalScale(106),
    px: scale(16),
    py: scale(24),
    bg: props.theme.colors.primary_new,
  }),
)`
  align-self: stretch;
  flex-direction: row;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const RelationShipInnerLeftContainer = styled.View.attrs<any>(
  () => ({}),
)`
  flex: 1;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const ProgressTitleLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.ExtraBold};
  font-size: ${moderateScale(20, 0.5)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const RelationshipsLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  mt: verticalScale(32),
}))`
  font-family: ${FontFamily.Bold};
  font-size: 18px;
  line-height: 25px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const RelationshipsSubLabel = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
  }),
)`
  text-align: center;
  font-family: ${FontFamily.Regular};
  font-size: ${moderateScale(14, 0.5)}px;
  font-weight: 500;
  line-height: 23px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const UploadConversationContainer = styled.View.attrs<any>(props => ({
  borderRadius: scale(10),
  mt: verticalScale(16),
  borderWidth: 1,
  paddingHorizontal: scale(16),
  paddingTop: verticalScale(18),
  paddingBottom: verticalScale(16),
  borderColor: props.theme.colors.cardBorderNew,
  bg: props.theme.colors.black_10_new,
}))`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const MyCoachSubContainer = styled.View.attrs<any>(props => ({
  borderRadius: scale(10),
  mt: verticalScale(16),
  borderWidth: 1,
  borderColor: props.theme.colors.blackGradientCardBgColor,
  paddingHorizontal: scale(16),
  paddingTop: verticalScale(18),
  paddingBottom: verticalScale(16),
}))`
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs(() => ({}))`
  flex: 1;
  background-color: ${props => props.theme.colors.base};
`;

export const ProgressRowView = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(10)}px;
  ${space}
`;

export const RowView = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  padding-right: ${scale(40)}px;
  padding-bottom: ${scale(40)}px;
`;

export const UploadConversationTouchable = styled(AMButton).attrs<any>(
  props => ({
    height: verticalScale(35),
    backgroundColor: props.theme.colors.secoundary_new,
    borderRadius: scale(32),
  }),
)`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(16)}px;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const UploadConversationIcon: () => JSX.Element | null = styled(
  SvgXml,
).attrs(() => ({
  xml: UPLOAD_CONVERSATION_ARROW_ICON,
}))``;

export const UploadConversationLabel = styled.Text.attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
  }),
)`
  font-family: ${FontFamily.Bold};
  font-size: 16px;
  text-align: center;
  line-height: 19.2px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const UploadConversationLayout = styled.View.attrs<any>(() => ({
  marginHorizontal: 30,
}))`
  position: absolute;
  bottom: 32px;
  align-self: center;
  left: 0px;
  right: 0px;
`;

export const ProgressLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${14}px;
  margin-left: ${scale(8)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const NextButtonContainer = styled.View.attrs(() => ({}))`
  align-self: center;
`;

export const NextArrow = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: HOME_NEXT_ARROW_NEW,
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const UploadConvBottomTouchable = styled(AMPrimaryButton).attrs<any>(
  () => ({
    buttonType: PrimaryButtonType.FullButton,
    isDisabled: false,
    label: i18next.t('Upload_Conversation'),
    mb: verticalScale(42),
    mx: scale(54),
    height: verticalScale(44),
    labelSize: 16,
  }),
)`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const ButtonLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${moderateScale(16)}px;
  align-self: center;
  text-align: center;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const UploadButtonIcon = styled(SvgXml).attrs<SVGXMLPropsType>(() => ({
  xml: UPLOAD_BUTTON_ICON,
}))`
  margin-right: ${scale(2)}px;
  ${color}
  ${space}
  ${layout}
`;

export const FlatListView = styled.FlatList.attrs<any>(() => ({
  bounces: false,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: verticalScale(90),
  },
}))`
  padding-top: ${verticalScale(0)}px;
  margin-top: ${verticalScale(5)}px;
  ${color}
  ${space}
  ${layout}
`;

export const FlatListContainer = styled.View.attrs(() => ({}))`
  flex: 1;
  ${space}
  ${layout}
`;
