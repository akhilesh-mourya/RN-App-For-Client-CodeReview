import styled from 'styled-components/native';
import {ViewPropsType} from '../../../@types/styledComponents';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {space, layout, color, size} from 'styled-system';
import {SvgXml} from 'react-native-svg';

export const TabContainer = styled.View.attrs<ViewPropsType>(props => ({
  height: verticalScale(90),
  flexDirection: 'row',
  backgroundColor: props.theme.colors.back_new,
  px: scale(35),
  pt: verticalScale(18),
}))`
  justify-content: space-between;
  ${layout}
  ${space}
  ${size}
  ${color}
`;

export const TabItem = styled.TouchableOpacity.attrs<any>(props => ({
  hitSlop: {top: 15, left: 15, bottom: 15, right: 15},
  alignItems: 'center',
  justifyContent: 'center',
  accessibilityRole: 'button',
  accessibilityState: props?.isFocused ? {selected: true} : {},
}))`
  ${layout}
  ${space}
`;

export const TabIcon = styled(SvgXml).attrs<any>(() => ({}))`
  ${color}
  ${space}
  ${layout}
`;
