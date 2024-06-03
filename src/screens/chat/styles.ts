import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {moderateScale} from 'react-native-size-matters/extend';
import {Dimensions, Platform} from 'react-native';
import {FontFamily} from 'custom_enums';
import {TextPropsType, ViewPropsType} from '../../../@types/styledComponents';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const MainContainer = styled.View.attrs<ViewPropsType>(props => ({
  flex: 1,
  bg: props.theme.colors.base_new,
}))`
  ${color} ${layout} ${space};
`;

export const SafeAreaContainer = styled.SafeAreaView.attrs<ViewPropsType>(
  () => ({
    flex: 1,
  }),
)`
  ${color} ${layout} ${space};
`;

export const Block = styled.View.attrs<ViewPropsType>(() => ({
  flex: 1,
}))`
  ${color} ${layout} ${space};
`;

export const Container = styled.KeyboardAvoidingView.attrs<any>(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : null,
  keyboardVerticalOffset: 0,
}))`
  flex: 1;
  ${color}
  ${space}
`;

export const SubContainer = styled.View.attrs<ViewPropsType>(() => ({
  paddingHorizontal: scale(16),
  flex: 1,
}))`
  ${color}
  ${space}
`;

export const BgGradiantImage = styled.Image.attrs(() => ({
  width: windowWidth,
  height: windowHeight,
}))`
  flex: 1;
  position: absolute;
  ${color} ${layout} ${space};
`;

export const HeaderTitle = styled.Text.attrs<TextPropsType>(props => ({
  color: props.theme.colors.white,
  fontSize: moderateScale(13, 0.5),
  mt: verticalScale(16),
  mb: verticalScale(16),
}))`
  align-self: center;
  font-family: ${FontFamily.Bold};
  ${color}
  ${space}
`;

export const SectionListView = styled.SectionList.attrs<ViewPropsType>(() => ({
  stickySectionHeadersEnabled: false,
  inverted: true,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}))`
  margin-bottom: 15px;
  ${space}
  ${layout}
`;

export const SkeletonPlaceholderView = styled(SkeletonPlaceholder)`
  border-radius: 10px;
  background-color: ${props => props.theme.colors.base_90} ${space} ${layout};
`;

export const SkeletonPlaceholderItemContainer = styled(
  SkeletonPlaceholder.Item,
)`
  margin-top: 20px;
`;

export const SkeletonPlaceholderItemRowContainer = styled(
  SkeletonPlaceholder.Item,
)`
  flex-direction: row;
  align-items: center;
`;
export const SkeletonPlaceholderItemImage = styled(SkeletonPlaceholder.Item)`
  border-radius: 10px;
  align-self: center;
  width: 40px;
  height: 40px;
`;

export const SkeletonPlaceholderItemView = styled(SkeletonPlaceholder.Item)`
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 4px;
  width: 80%;
  height: 175px;
`;
