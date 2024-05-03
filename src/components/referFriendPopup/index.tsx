import React, {FC, useEffect} from 'react';
import {
  CrossIcon,
  ContactsFlatList,
  HeaderLabel,
  MainContainer,
  ModalContainer,
  RowContainer,
  SearchIcon,
  SearchInput,
  SearchView,
  SeparatorView,
  TouchableOpacity,
  NoPermissionContainer,
  NoPerHeader,
  NoPerDescription,
  OpenSettingButton,
  OpenSettingButtonLbl,
  SearchClearIcon,
  KeyboardAwareView,
} from './styles';
import ReferFriendItem from '../molecule/referFriendItem';
import {useReferFriend} from '../../hooks/matchMaking/useReferFriend';
import AMButton from '../button/AMButton';

interface ReferFriendPopupProps {
  isVisible?: boolean;
  hidePopup?: any;
  isFromWaitlist: boolean;
}

const renderSeperator = () => {
  return <SeparatorView />;
};

const ReferFriendPopup: FC<ReferFriendPopupProps> = React.memo(props => {
  const {isVisible, hidePopup, isFromWaitlist} = props;
  const {
    t,
    searchText,
    searchFocus,
    setSearchText,
    setSearchFocus,
    contactsList,
    haveContactsPermission,
    openSettings,
    inviteFriend,
    onClearSearchPress,
    checkContactsPermission,
    onClosePress,
  } = useReferFriend(hidePopup);

  useEffect(() => {
    if (isVisible) {
      checkContactsPermission(isFromWaitlist);
    }
  }, [isVisible]);

  const onContactSelected = friend => {
    inviteFriend(friend);
  };

  const renderItem = ({item}) => {
    return <ReferFriendItem item={item} onPress={onContactSelected} />;
  };

  const renderContactNoPermissionView = () => (
    <NoPermissionContainer>
      <NoPerHeader>{t('Refer_Your_Friends')}</NoPerHeader>
      <NoPerDescription>{t('No_Contact_Des')}</NoPerDescription>
      <OpenSettingButton onPress={openSettings}>
        <OpenSettingButtonLbl>{t('Open_Settings')}</OpenSettingButtonLbl>
      </OpenSettingButton>
    </NoPermissionContainer>
  );

  const renderSearch = () => (
    <SearchView isFocused={searchFocus}>
      <SearchIcon />
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
      />
      {searchText?.length > 0 && (
        <AMButton onPress={onClearSearchPress}>
          <SearchClearIcon />
        </AMButton>
      )}
    </SearchView>
  );

  const renderHeadereView = () => {
    return (
      <>
        <TouchableOpacity onPress={onClosePress}>
          <CrossIcon />
        </TouchableOpacity>
        <RowContainer>
          <HeaderLabel>{t('Invite_Friends')}</HeaderLabel>
        </RowContainer>
        {renderSearch()}
      </>
    );
  };
  return (
    <ModalContainer isVisible={isVisible} avoidKeyboard={false}>
      <MainContainer>
        {renderHeadereView()}
        {haveContactsPermission ? (
          <KeyboardAwareView>
            <ContactsFlatList
              bounces={false}
              data={contactsList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={renderSeperator}
              legacyImplementation={false}
            />
          </KeyboardAwareView>
        ) : (
          renderContactNoPermissionView()
        )}
      </MainContainer>
    </ModalContainer>
  );
});

export default ReferFriendPopup;
