import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale} from 'react-native-size-matters/extend';
import {verticalScale} from 'react-native-size-matters/extend';
import {ViewPropsType} from '../../../@types/styledComponents';
import theme from '../../theme';

export const ProgressContainer = styled.View.attrs<ViewPropsType>(props => ({
  height: verticalScale(3),
  backgroundColor: props.isfromHome
    ? theme.colors.semi_transparent_border
    : theme.colors.questionnaireProgressBarBg,
  borderRadius: scale(10),
  width: props.width,
}))`
  ${color};
  ${space};
  ${layout};
  ${border};
`;

export const barHome = {
  height: verticalScale(4),
  backgroundColor: theme.colors?.base_50,
  borderRadius: scale(10),
};

export const bar = {
  height: verticalScale(4),
  backgroundColor: theme.colors?.white,
  borderRadius: scale(10),
};
