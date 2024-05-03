import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {PLUS_ICON, PLUS_ICON_DISABLED} from '../../../assets/svg';
import {scale} from 'react-native-size-matters/extend';
import {verticalScale} from 'react-native-size-matters/extend';
import {moderateScale} from 'react-native-size-matters/extend';
import {FontFamily} from 'custom_enums';
import {ViewPropsType} from '../../../../@types/styledComponents';
import {SEND_ICON} from '../../../assets/svg/chat';
import AMButton from '../../button/AMButton';

export const ButtonContainerView = styled.KeyboardAvoidingView.attrs<any>(
  () => ({
    behavior: 'padding',
    keyboardVerticalOffset: 0,
    keyboardShouldPersistTaps: 'handled',
  }),
)``;

export const MainContainer = styled.View.attrs<ViewPropsType>(() => ({
  mb: verticalScale(16),
}))`
  margin-top: ${verticalScale(5)}px;
  flex-direction: row;
  align-items: center;
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const Block = styled.View.attrs(() => ({}))`
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const PlusIcon = styled(SvgXml).attrs<any>(() => ({
  xml: PLUS_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const PlusIconDisabled = styled(SvgXml).attrs<any>(() => ({
  xml: PLUS_ICON_DISABLED,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const MessageInput = styled.TextInput.attrs<any>(props => ({
  color: props.theme.colors.white,
  placeholderTextColor: props?.disabled
    ? props.theme.colors.inputBorder
    : props.theme.colors.placeholder,
  placeholder: 'Send a message',
  ml: scale(8),
  autoFocus: false,
}))`
  font-size: 14.03px;
  font-family: ${FontFamily.Medium};
  flex: 1;
  padding-left: ${scale(17)}px;
  padding-vertical: 0px;
  padding-right: ${scale(8)}px;
  ${color}
  ${layout}
`;

export const InputContainer = styled.View.attrs<ViewPropsType | any>(props => ({
  borderRadius: moderateScale(32),
  borderWidth: 1,
  borderColor: props?.disabled
    ? props.theme.colors.inputBorderDisabled
    : props?.focused
    ? props.theme.colors.secoundary
    : props.theme.colors.inputBorder,
  height: verticalScale(37),
  bg: props.theme.colors.black_10,
  pr: scale(10),
}))`
  flex: 1;
  margin-left: ${scale(8)}px;
  flex-direction: row;
  justifycontent: space-between;
  align-items: center;
  ${space}
  ${layout}
`;

export const AvatarImg = styled.Image.attrs(() => ({
  width: scale(32),
  height: scale(32),
  borderRadius: scale(16),
  ml: scale(16),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const Separator = styled.View.attrs(props => ({
  mt: verticalScale(16),
  height: verticalScale(1),
  bg: props.theme.colors.inputBG,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled(AMButton).attrs(() => ({}))`
  ${color}
  ${space}
  ${layout}
`;

export const SendIcon = styled(SvgXml).attrs<any>(() => ({
  xml: SEND_ICON,
}))`
  ${color}
  ${space}
  ${layout}
`;
