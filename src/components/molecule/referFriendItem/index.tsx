import React, {FC} from 'react';
import {
  MainContainer,
  NameLabel,
  TouchableOpacity,
  ProfileImg,
  InviteButton,
  InviteBtnLabel,
  NameInitialsView,
  NameInitialsLabel,
} from './styles';
import i18next from 'i18next';
import {
  getFullNameForReferList,
  getNameInitials,
} from '../../../helpers/commonFunctions';

interface ReferFriendItemProps {
  item: any;
  onPress?: any;
  isDarkBackground?: boolean;
}

const ReferFriendItem: FC<ReferFriendItemProps> = React.memo(props => {
  const {item, onPress, isDarkBackground = false} = props;
  const renderProfileImage = () => {
    if (!item?.hasThumbnail) {
      return (
        <NameInitialsView>
          <NameInitialsLabel>
            {getNameInitials(item?.displayName || item?.givenName)}
          </NameInitialsLabel>
        </NameInitialsView>
      );
    } else {
      return <ProfileImg source={{uri: item?.thumbnailPath}} />;
    }
  };
  return (
    <MainContainer>
      <TouchableOpacity>
        {renderProfileImage()}
        <NameLabel>{getFullNameForReferList(item)}</NameLabel>
        <InviteButton
          onPress={() => onPress(item)}
          isDarkBackground={isDarkBackground}>
          <InviteBtnLabel>{i18next.t('Invite')}</InviteBtnLabel>
        </InviteButton>
      </TouchableOpacity>
    </MainContainer>
  );
});

export default ReferFriendItem;
