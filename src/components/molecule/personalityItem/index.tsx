import React, {FC, memo, useState} from 'react';
import {
  BottomTouchable,
  ButtonLabel,
  CardInnerView,
  CheckIcon,
  DetailContainer,
  ImageLoaderContainer,
  NameLabel,
  ProfileContainer,
  ProfileView,
  SelectedLabel,
  SelectedView,
  SubTitleLabel,
  TitleLabel,
} from './styles';
import {t} from 'i18next';
import {DUMMY_USER_PROFILE} from '../../../constants/appContants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from '../../../theme';

interface PersonalityProps {
  data: any;
  onPress: any;
  isForSwitch: boolean;
  isSelected: boolean;
  isOldUI: boolean;
}

const PersonalityItems: FC<PersonalityProps> = React.memo(props => {
  const {data, onPress, isForSwitch, isSelected, isOldUI = true} = props;
  const {avatarUrl = DUMMY_USER_PROFILE, name, title, description} = data;
  const [isImageLoading, setImageLoading] = useState(true);

  const renderBottom = () => {
    if (isSelected) {
      return (
        <SelectedView>
          <CheckIcon />
          <SelectedLabel>{t('Selected')}</SelectedLabel>
        </SelectedView>
      );
    } else if (isForSwitch) {
      return (
        <BottomTouchable isOldUI={isOldUI} onPress={onPress}>
          <ButtonLabel>{t('Switch_Personality')}</ButtonLabel>
        </BottomTouchable>
      );
    } else {
      return (
        <BottomTouchable isOldUI={isOldUI} onPress={onPress}>
          <ButtonLabel>{t('Select this personality')}</ButtonLabel>
        </BottomTouchable>
      );
    }
  };

  const renderProfileImage = () => (
    <ProfileContainer>
      <ProfileView
        source={{uri: avatarUrl}}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
      />
      {isImageLoading && (
        <ImageLoaderContainer>
          <SkeletonPlaceholder backgroundColor={theme.colors.base_90}>
            <SkeletonPlaceholder.Item
              width={70}
              height={70}
              borderRadius={35}
            />
          </SkeletonPlaceholder>
        </ImageLoaderContainer>
      )}
    </ProfileContainer>
  );

  return (
    <CardInnerView isOldUI={isOldUI}>
      <DetailContainer>
        {renderProfileImage()}
        <NameLabel>{name}</NameLabel>
        <TitleLabel>{title}</TitleLabel>
        <SubTitleLabel>{description}</SubTitleLabel>
      </DetailContainer>
      {renderBottom()}
    </CardInnerView>
  );
});

export default memo(PersonalityItems);
