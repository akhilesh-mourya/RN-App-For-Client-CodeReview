import styled from 'styled-components/native';
import {color, layout, padding, size, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {
  SVGXMLPropsType,
  TextPropsType,
  ViewPropsType,
} from '../../../../../@types/styledComponents';
import {SvgXml} from 'react-native-svg';
import {
  CHECK_ICON,
  NEXT_ARROW_ICON,
} from '../../../../assets/svg/questionarrie';
import {
  BUTTON_NEXT_ARROW_ACTIVE,
  BUTTON_NEXT_ARROW_DISABLED,
} from '../../../../assets/svg';
import {Platform} from 'react-native';

export const Container = styled.View.attrs<any>(() => ({}))`
  flex: 1;
`;

export const HeaderLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${FontFamily.Bold};
  font-size: ${scale(20)}px;
  line-height: ${verticalScale(29.814)}px;
  margin-bottom: ${verticalScale(27)}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const OptionLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${16}px;
  line-height: ${scale(22.799)}px;
  letter-spacing: 0.32px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const TouchableOpacity = styled.TouchableOpacity.attrs(() => ({}))``;

export const SelectionContainer = styled.View.attrs<ViewPropsType, any>(
  props => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: props?.isSelected
      ? props.theme.colors.optionActiveBorderColor
      : props.theme.colors.inputBorder,
    bg: props.theme.colors.black_10,
  }),
)`
  flex-direction: row;
  margin-top: ${verticalScale(5)}px;
  margin-bottom: ${verticalScale(5)}px;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(12)}px;
  justify-content: space-between;
  align-items: center;
  ${color}
  ${size}
  ${space}
  ${layout}
  ${padding}
`;

export const NextArrowIcon = styled(SvgXml).attrs<any>(() => ({
  xml: NEXT_ARROW_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const CheckArrowIcon = styled(SvgXml).attrs<any>(() => ({
  xml: CHECK_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ButtonNextArrowActive = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_ACTIVE,
  }),
)`
  margin-top: 2px;
`;

export const ButtonNextArrowDisabled = styled(SvgXml).attrs<SVGXMLPropsType>(
  () => ({
    xml: BUTTON_NEXT_ARROW_DISABLED,
  }),
)`
  margin-top: 2px;
`;

export const ButtonContainer = styled.View.attrs<any>(() => ({}))`
  margin-bottom: ${verticalScale(46)}px;
`;

export const MainContainer = styled.View.attrs<any>(() => ({}))`
  flex: 1;
`;

export const RawFullFlex = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
  backgroundColor: 'red',
}))``;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}))``;

export const TopView = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))``;

export const BottomView = styled.View.attrs<ViewPropsType>(() => ({
  justifyContent: 'flex-end',
  marginBottom: verticalScale(46),
}))``;

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: 'position',
    keyboardVerticalOffset: 24,
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {flex: 1},
  }),
)`
  flex: 1;
`;

export const Ques2ListView = styled.FlatList.attrs<ViewPropsType>(() => ({
  contentContainerStyle: {paddingBottom: verticalScale(80)},
  showsVerticalScrollIndicator: false,
}))``;

export const ButtonScrollContainer = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'always',
  scrollEnabled: false,
}))``;

export const ButtonContainerView = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: 'position',
    keyboardVerticalOffset: 125,
    keyboardShouldPersistTaps: 'handled',
  }),
)`
  margin-bottom: ${verticalScale(Platform.OS === 'ios' ? 82 : 60)}px;
  padding-horizontal: ${scale(32)}px;
`;

export const OtherInput = styled.TextInput.attrs<any>(props => ({
  color: props.theme.colors.white,
  cursorColor: props.theme.colors.white,
  keyboardType: 'default',
  maxLength: 240,
  selectionColor: props.theme.colors.white,
  placeholderTextColor: props.theme.colors.placeholder,
  fontSize: scale(16),
  paddingRight: scale(24),
  paddingVertical: 0,
}))`
  font-family: ${FontFamily.Regular};
  flex: 1;
  font-weight: 600;
  line-height: 22.799px;
  letter-spacing: 0.32px;
  ${color} ${size} ${layout} ${space};
`;
