import {scale, verticalScale} from 'react-native-size-matters/extend';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import {TextPropsType} from '../../../@types/styledComponents';
import {color, size, layout, space, border} from 'styled-system';
import AMButton from '../button/AMButton';
import {FontFamily} from 'custom_enums';
import theme from '../../theme';
import {Dimensions, Platform} from 'react-native';

export const DatePickerContainer = styled.View.attrs<any>(props => ({
  bg: props.theme.colors.datePickerBG,
}))`
  align-self: stretch;
  align-items: center;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const DatePickerView = styled(DatePicker).attrs<any>(props => ({
  open: props?.open,
  mode: 'date',
  androidVariant: 'iosClone',
  maximumDate: new Date(),
  textColor: theme.colors.white,
  width: Dimensions.get('screen').width,
  fadeToColor: 'none',
  theme: 'auto',
  locale: 'en',
}))`
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DatePickerHeaderView = styled.View.attrs<any>(props => ({
  bg: props.theme.colors.datePickerBG,
  borderBottomWidth: 1,
  borderBottomColor: props.theme.colors.pickerDivider,
  py: verticalScale(14),
  pr: scale(16),
}))`
  align-self: stretch;
  align-items: center;
  justify-content: flex-end;
  ${color}
  ${size}
  ${layout}
  ${space}
  ${border}
`;

export const DatePickerDoneButton = styled(AMButton).attrs<TextPropsType>(
  props => ({
    color: props.theme.colors.white,
  }),
)`
  align-self: flex-end;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const DoneLabel = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.pickerDoneBG,
}))`
  font-family: ${Platform.OS === 'ios'
    ? FontFamily.SemiBold
    : FontFamily.AndroidSemiBold};
  font-size: ${17}px;
  ${color}
  ${size}
  ${layout}
  ${space}
`;

export const ContainerStyle = {
  backgroundColor: theme.colors.datePickerBG,
  alignSelf: 'stretch',
  alignItems: 'center',
};
