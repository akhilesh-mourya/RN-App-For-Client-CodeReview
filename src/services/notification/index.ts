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
import {Platform} from 'react-native';
import {getUserData} from '../../utility';
import {RelationshipDataProps} from '../../constants/mockData';
import {AssistantDataType} from '../../../@types/context';
import NotificationHelper from './notificationHelper';

class Notification {
  // const analytics = useAnalytics();
  public relationshipData: any;
  public assistantData: any;
  public unsubscribeLocalNotification: Function = () => {};
  public unsubscribeRegister: any;
  public unsubscribeNotification: any;
  private notificationHelper = NotificationHelper();

  initializeNotifications(userId: string, token: string) {
    this.unsubscribeFromNotifications();

    setTimeout(() => {
      RNPusherPushNotifications.setInstanceId(Config.PUSHER_INSTANCE_ID);
      RNPusherPushNotifications.subscribe(
        'hello',
        (statusCode, response) => {
          console.error(statusCode, response);
        },
        () => {
          console.log('CALLBACK: Subscribed to');
        },
      );

      this.unsubscribeRegister = RNPusherPushNotifications.on(
        'registered',
        () => {
          console.log('1 Notification registered');
        },
      );
      this.unsubscribeNotification = RNPusherPushNotifications.on(
        'notification',
        this.handleNotification,
      );
      this.authenticateUserWithBeam(userId, token);
      this.addNotifeeListner();
    }, 1000);
  }

  addNotifeeListner = () => {
    this.unsubscribeLocalNotification = notifee.onForegroundEvent(
      ({type, detail}) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            this.goToChatScreen(detail?.notification?.data?.userInfo?.data);
            break;
        }
      },
    );
  };

  authenticateUserWithBeam = async (userId: string, token: string) => {
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

  setRelationshipData(data: [RelationshipDataProps]) {
    this.relationshipData = data;
  }

  setAssistantData(data: AssistantDataType) {
    this.assistantData = data;
  }

  // Handle notifications received
  handleNotification = notification => {
    if (Platform.OS === 'ios') {
      switch (notification.appState) {
        case 'inactive':
        case 'background':
          if (
            notification?.userInfo?.data?.notificationId ===
            ReceivedNotificationType.Analysis_Ready
          ) {
            this.goToChatScreen(notification?.userInfo?.data);
          }
          break;
        case 'active':
          this.dispayNotificationPopup(notification);
          break;
        default:
          break;
      }
    } else {
      console.log('notification?.userInfo?.data android: ', notification);
      //goToChatScreen(notification?.userInfo?.data);
    }
  };

  dispayNotificationPopup = async (notification: any) => {
    try {
      await notifee.displayNotification({
        id: '123',
        title: 'RNCodeForClientReview',
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

  async goToChatScreen(notifData: any) {
    const userData = await getUserData();
    this.notificationHelper.trackEvent(notifData);
    if (!this.relationshipData) {
      const {data} = await api.get(`${Config.BASE_URL}${GET_RELATIONSHIPS}`);
      this.relationshipData = data?.data;
    }

    if (!this.assistantData) {
      const assistantData = await api.get(
        `${GET_ASSISTANT_BY_ID}${userData?.assistantId}`,
      );
      this.assistantData = assistantData?.data?.data;
    }

    const relationshipDetail = this.relationshipData?.find(
      (relations: RelationshipDataProps) => {
        return relations?.channel?.id === notifData?.channelId;
      },
    );
    if (relationshipDetail) {
      const screenParam = {
        channelData: relationshipDetail?.channel,
        receiverData: {
          ...this.assistantData,
          type: 'assistant_relationship',
          about: relationshipDetail?.name,
        },
        isIMessageUploadType:
          relationshipDetail?.inputs[0]?.source === UploadTypeEnum?.IMessage,
        relationShipData: relationshipDetail,
      };
      goToChatFromNotification(screenParam);
    }
  }

  unsubscribeFromNotifications() {
    this.unsubscribeLocalNotification();
    this.unsubscribeRegister?.remove();
    this.unsubscribeNotification?.remove();
    if (RNPusherPushNotifications) {
      RNPusherPushNotifications?.clearAllState();
    }
  }
}

export default Notification;
