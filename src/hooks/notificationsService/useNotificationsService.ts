import {Config} from 'react-native-config';
import axios from 'axios';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import {
  BEAM_AUTH_URL,
  GET_ASSISTANT_BY_ID,
  GET_RELATIONSHIPS,
} from '../../constants/apiConstants';
import {ReceivedNotificationType, UploadTypeEnum} from '../../enums';
import {goToChatFromNotification} from '../../navigation/navigationHelper';
import api from '../../apiServices';
import notifee, {EventType} from '@notifee/react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {useAnalytics} from '../../services/analytics';
import {getUserData} from '../../utility';
import {RelationshipDataProps} from '../../constants/mockData';

const useNotificationsService = () => {
  const analytics = useAnalytics();
  const [relationshipDataNew, setRelationshipDataNew] =
    useState<RelationshipDataProps>();
  const relationshipData = useRef();

  let unsubscribeNotifee: Function = () => {};
  let unsubscribeRegister: any;
  let unsubscribeNotification: any;

  useEffect(() => {
    return () => {
      unsubscribeFromNotifications();
    };
  }, []);

  const initializeNotifications = (userId: string, token: string) => {
    unsubscribeFromNotifications();

    setTimeout(() => {
      RNPusherPushNotifications.setInstanceId(Config.PUSHER_INSTANCE_ID);
      unsubscribeRegister = RNPusherPushNotifications.on('registered', () => {
        console.log('Notification registered');
      });
      unsubscribeNotification = RNPusherPushNotifications.on(
        'notification',
        handleNotification,
      );
      authenticateUserWithBeam(userId, token);
      addNotifeeListner();
    }, 1000);
  };

  const addNotifeeListner = () => {
    unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          goToChatScreen(detail?.notification?.data?.userInfo?.data);
          break;
      }
    });
  };

  const authenticateUserWithBeam = async (userId: string, token: string) => {
    try {
      const {data} = await axios.get(`${Config.BASE_URL}${BEAM_AUTH_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (data?.token) {
        try {
          RNPusherPushNotifications.setUserId(
            userId,
            data?.token,
            error => {
              console.log('pusher beam Error ===', error);
            },
            () => {
              console.log('Succefully authenticated with pusher beam');
            },
          );
        } catch (error) {
          console.log('Erro in setuser = ==', error);
        }
      }
    } catch (error) {}
  };

  // Handle notifications received
  const handleNotification = useCallback(
    notification => {
      console.log('relationshipDataNew======== finally-', relationshipDataNew)
      if (Platform.OS === 'ios') {
        switch (notification.appState) {
          case 'inactive':
          case 'background':
            if (
              notification?.userInfo?.data?.notificationId ===
              ReceivedNotificationType.Analysis_Ready
            ) {
              goToChatScreen(notification?.userInfo?.data);
            }
            break;
          case 'active':
            dispayNotificationPopup(notification);
            break;
          default:
            break;
        }
      } else {
        //goToChatScreen(notification?.userInfo?.data);
      }
    },
    [relationshipDataNew],
  );

  const trackNotificationHandleEvent = () => {
    analytics.trackTouchAnalysisIsReadyNotification();
  };

  const dispayNotificationPopup = async (notification: any) => {
    try {
      await notifee.displayNotification({
        id: '123',
        title: 'Amori',
        body: notification?.userInfo?.aps?.alert?.body,
        data: {
          userInfo: notification?.userInfo,
        },
        ios: {
          foregroundPresentationOptions: {
            sound: true,
            banner: true,
          },
        },
      });
    } catch (error) {
      console.log('Error ====', error);
    }
  };

  const goToChatScreen = async (notifData: any) => {
    const userData = await getUserData();
    trackNotificationHandleEvent(notifData);
    const {data} = await api.get(`${Config.BASE_URL}${GET_RELATIONSHIPS}`);
    console.log('relationshipData===', relationshipDataNew, data);
    const assistantData = await api.get(
      `${GET_ASSISTANT_BY_ID}${userData?.assistantId}`,
    );
    const allRelationships = data?.data;
    const relationshipDetail = relationshipDataNew?.find(relations => {
      return relations?.channel?.id === notifData?.channelId;
    });
    if (relationshipDetail) {
      const screenParam = {
        channelData: relationshipDetail?.channel,
        receiverData: {
          ...assistantData?.data?.data,
          type: 'assistant_relationship',
          about: relationshipDetail?.name,
        },
        isIMessageUploadType:
          relationshipDetail?.inputs[0]?.source === UploadTypeEnum?.IMessage,
        relationShipData: relationshipDetail,
      };
      goToChatFromNotification(screenParam);
    }
  };

  const setRelationshipDataFromContext = data => {
    setRelationshipDataNew(data);
    relationshipData.current = data;
  };

  const unsubscribeFromNotifications = () => {
    unsubscribeNotifee();
    unsubscribeRegister?.remove();
    unsubscribeNotification?.remove();
    RNPusherPushNotifications?.clearAllState();
  };

  return {
    initializeNotifications,
    unsubscribeFromNotifications,
    dispayNotificationPopup,
    setRelationshipDataFromContext,
  };
};

export default useNotificationsService;
