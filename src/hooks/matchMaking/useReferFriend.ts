import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Contacts from 'react-native-contacts';
import {Keyboard, Linking, PermissionsAndroid, Platform} from 'react-native';
import SendSMS from 'react-native-sms';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  getFullNameForReferList,
  getNameForInviteMsg,
} from '../../helpers/commonFunctions';
import {IOS_APP_STORE_URL, IS_IOS_PLATFORM} from '../../constants/appContants';
import useAuth from '../context/useAuth';
import {useAnalytics} from '../../services/analytics';
import {unformatPhoneNumber} from '../../helpers/phoneNumber';

export const useReferFriend = (hidePopup: Function = () => {}) => {
  const {t} = useTranslation();
  const {authContextData} = useAuth();
  const [searchText, setSearchText] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [haveContactsPermission, setContactsPermission] = useState(false);
  const [contactsList, setContactsList] = useState<any>([]);
  const [rawContactsList, setRawContactsList] = useState<any>([]);
  const analytics = useAnalytics();

  useEffect(() => {
    if (searchText?.length > 0) {
      const rawList = rawContactsList;
      const filteredList = rawList?.filter(item => {
        const name = getFullNameForReferList(item);
        if (name?.toLowerCase()?.includes(searchText?.toLowerCase())) {
          return true;
        } else if (
          item?.phoneNumbers?.find(_item => _item?.number?.includes(searchText))
        ) {
          return true;
        }
      });
      setContactsList(filteredList);
    } else {
      const newContactList = rawContactsList?.filter(
        item => item?.phoneNumbers.length > 0,
      );
      setContactsList(newContactList);
    }
  }, [searchText, rawContactsList]);

  const onClearSearchPress = () => {
    setSearchText('');
  };

  const getContacts = () => {
    Contacts.getAll().then(contacts => {
      console.log('get all:', contacts);

      const newContactList = contacts?.filter(
        item => item?.phoneNumbers.length > 0,
      );
      setTimeout(() => {
        setContactsList(newContactList);
        setRawContactsList(newContactList);
      }, 0);
    });
  };

  /**
   * checkContactsPermission calling from main screen
   */
  const checkContactsPermission = (isFromWaitlist = false) => {
    if (Platform.OS === 'ios') {
      askForPermissions(isFromWaitlist);
    } else {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ).then(permission => {
        setContactsPermission(permission);
        if (permission) {
          getContacts();
        } else {
          askForPermissions(isFromWaitlist);
        }
      });
    }
  };

  const askForPermissions = (isFromWaitlist: boolean) => {
    if (Platform.OS === 'ios') {
      Contacts.checkPermission().then(permission => {
        if (permission === 'undefined') {
          Contacts.requestPermission().then(per => {
            if (per === 'authorized') {
              if (isFromWaitlist) {
                analytics.trackSelectAllowOptionOnContactPermissionDialogOnWaitlistScreen();
              } else {
                analytics.trackSelectAllowOptionOnContactPermissionDialogOnMatchmakingScreen();
              }
            } else if (per === 'denied') {
              if (isFromWaitlist) {
                analytics.trackSelectDontAllowOptionOnContactPermissionDialogOnWaitlistScreen();
              } else {
                analytics.trackSelectDontAllowOptionOnContactPermissionDialogOnMatchmakingScreen();
              }
            }
            oniOSPermissionRes(per);
          });
        } else if (permission === 'authorized') {
          setContactsPermission(true);
          oniOSPermissionRes(permission);
        } else if (permission === 'denied') {
          setContactsPermission(false);
          oniOSPermissionRes(permission);
        }
      });
    } else {
      request(PERMISSIONS.ANDROID.READ_CONTACTS).then(result => {
        onAndroidPermissionRes(result, isFromWaitlist);
      });
    }
  };

  const oniOSPermissionRes = (permission: string) => {
    if (permission === 'authorized') {
      setContactsPermission(true);
      getContacts();
    }
    if (permission === 'denied') {
      setContactsPermission(false);
    }
  };

  const onAndroidPermissionRes = (
    permission: string,
    isFromWaitlist: boolean,
  ) => {
    if (permission === 'granted') {
      if (isFromWaitlist) {
        analytics.trackSelectAllowOptionOnContactPermissionDialogOnWaitlistScreen();
      } else {
        analytics.trackSelectAllowOptionOnContactPermissionDialogOnMatchmakingScreen();
      }
      setContactsPermission(true);
      getContacts();
    } else {
      if (isFromWaitlist) {
        analytics.trackSelectDontAllowOptionOnContactPermissionDialogOnWaitlistScreen();
      } else {
        analytics.trackSelectDontAllowOptionOnContactPermissionDialogOnMatchmakingScreen();
      }
      setContactsPermission(false);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const inviteFriend = friendData => {
    Keyboard.dismiss();
    const phoneNum = friendData?.phoneNumbers[0]?.number;

    const unformattedNumber = unformatPhoneNumber(phoneNum);
    analytics.trackTouchInviteButtonOnInviteFriendsSheet(unformattedNumber);

    const msg = IS_IOS_PLATFORM
      ? t('Invite_Friend_Text')
      : t('Invite_Friend_Text_Android');
    const msgBody = `${msg.replace('$', getNameForInviteMsg(friendData))}${
      authContextData?.appsStoreLinksInfo || IOS_APP_STORE_URL
    }`;

    SendSMS.send(
      {
        body: msgBody,
        recipients: [phoneNum],
        successTypes: Platform.OS === 'ios' ? ['sent', 'queued'] : ['all'],
        allowAndroidSendWithoutReadPermission: false,
      },
      (completed, cancelled, error) => {
        if (error) {
          return;
        }

        if (IS_IOS_PLATFORM) {
          if (completed) {
            analytics.trackSendInvitationMessage(unformattedNumber, msgBody);
          } else if (error || cancelled) {
            analytics.trackCancelSendInvitationMessage();
          }
        } else {
          if (error || cancelled) {
            analytics.trackCancelSendInvitationMessage();
          } else if (error) {
            analytics.trackSendInvitationMessage(unformattedNumber, msgBody);
          }
        }
      },
    );
  };

  const onClosePress = () => {
    analytics.trackTouchDismissButtonOnInviteFriendsSheet();

    setContactsList([]);
    setTimeout(() => {
      hidePopup();
    }, 50);
  };

  return {
    t,
    searchText,
    searchFocus,
    haveContactsPermission,
    contactsList,
    setSearchText,
    setSearchFocus,
    openSettings,
    inviteFriend,
    onClearSearchPress,
    checkContactsPermission,
    onClosePress,
  };
};
