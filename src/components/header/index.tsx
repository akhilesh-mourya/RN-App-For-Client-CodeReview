import {useNavigation} from '@react-navigation/native';
import {
  AvatarImg,
  Block,
  BackIcon,
  MainContainer,
  HeaderTitle,
  Separator,
  Touchable,
  StarIcon,
  RowContainer,
  AboutContainer,
  CoachTitle,
  AboutTitle,
  ProfileBGContainer,
  ProfileBGIcon,
  SmilyTitle,
  InfoIcon,
} from './styles';
import React, {FC} from 'react';
import {ChatReceiverDataType} from '../../types';
import {ChatType} from '../../enums';
import {t} from 'i18next';
import {getEachFirstLetterCapitalize, getFirstLetter} from '../../utility';

interface HeaderProps {
  title?: string;
  isBack?: boolean;
  receiverData?: ChatReceiverDataType;
  onProfilePress?: Function;
}

const Header: FC<HeaderProps> = React.memo(props => {
  const navigation = useNavigation();
  const {isBack = true, receiverData, onProfilePress} = props;
  const onBackPress = () => {
    navigation.goBack();
  };
  const renderHeader = () => {
    switch (receiverData?.type) {
      case ChatType.AssistantGeneral:
        return (
          <Block>
            <HeaderTitle>{receiverData?.name}</HeaderTitle>
            <StarIcon />
          </Block>
        );
      case ChatType.AssistantRelationship:
        return (
          <RowContainer>
            <AboutContainer>
              <CoachTitle>{receiverData?.name}</CoachTitle>
              <AboutTitle>
                {t('About')} {getEachFirstLetterCapitalize(receiverData?.about)}
              </AboutTitle>
            </AboutContainer>
            <ProfileBGContainer onPress={onProfilePress}>
              <ProfileBGIcon />
              <SmilyTitle>{getFirstLetter(receiverData?.about)}</SmilyTitle>
              <InfoIcon />
            </ProfileBGContainer>
          </RowContainer>
        );
      default:
        return (
          <>
            <HeaderTitle>{receiverData?.name}</HeaderTitle>
            <StarIcon />
          </>
        );
    }
  };

  return (
    <MainContainer>
      <Block>
        {isBack && (
          <Touchable onPress={onBackPress}>
            <BackIcon />
          </Touchable>
        )}
        <AvatarImg source={{uri: receiverData?.avatarUrl}} />
        {renderHeader()}
      </Block>
      <Separator />
    </MainContainer>
  );
});
export default Header;
