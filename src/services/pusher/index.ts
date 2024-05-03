import Pusher, {Channel} from 'pusher-js';
import {Config} from 'react-native-config';
import {
  getPusherMessageChannel,
  getPusherUploadsChannel,
} from '../../constants/apiConstants';
import {
  ERROR_EVENT,
  INSERT_EVENT,
  SIGNIN_EVENT,
  SUBSCRIPTION_SUCCESS_EVENT,
  UPDATE_EVENT,
} from '../../constants/pusherConstants';
import PusherListener from './pusherListener';

type PusherSocketProps = {
  userId: string | null;
  token: string | null;
};
export class PusherSocket {
  private pusherInstance: Pusher;
  private userId: string | null = '';
  private token: string | null = '';
  private pusherListener = PusherListener();
  private messagesChannel: Channel;
  private uploadsChannel: Channel;
  public isUploadChannelSubscribed: string = 'DEFAULT';
  public isMessageChannelSubscribed: string = 'DEFAULT';

  public coachData = [];

  init(props: PusherSocketProps) {
    this.userId = props.userId;
    this.token = props.token;
    if (this.userId && this.token) {
      this.authenticatePusher();
    }
  }

  initPusher(): Pusher {
    Pusher.logToConsole = true;
    const pusher = new Pusher(Config.PUSHER_API_KEY, {
      cluster: Config.PUSHER_CLUSTER,
      userAuthentication: {
        transport: 'ajax',
        endpoint: Config.PUSHER_AUTHORIZE_USER_URL,
        headersProvider: () => {
          return {
            Authorization: `Bearer ${this.token}`,
          };
        },
      },
      channelAuthorization: {
        transport: 'ajax',
        endpoint: Config.PUSHER_AUTHORIZE_CHANNEL_URL,
        headersProvider: () => {
          return {
            Authorization: `Bearer ${this.token}`,
          };
        },
      },
    });
    return pusher;
  }

  authenticatePusher() {
    //Make previous subscriptions unbind first
    this.unbindMessagesListner();
    this.unsubscribeToAllPusher();

    setTimeout(() => {
      this.pusherInstance = this.initPusher();
      this.bindSigninPusher();
      this.pusherInstance.signin();
    }, 1000);
  }

  bindSigninPusher() {
    this.pusherInstance.bind(SIGNIN_EVENT, (data: {user_data: string}) => {
      const pusherUserData = JSON.parse(data?.user_data);
      if (!this.userId && pusherUserData?.id) {
        this.userId = pusherUserData?.id;
      }
      this.unbindMessagesListner();
      this.unsubscribeToMessageAndUploadPusher();

      setTimeout(() => {
        this.subscribeToUploadPusher();
        this.subscribeToMessagePusher();
      }, 1000);
    });
  }

  subscribeToUploadPusher() {
    this.uploadsChannel = this.pusherInstance.subscribe(
      getPusherUploadsChannel(this.userId),
    );
    this.uploadsChannel.bind(
      INSERT_EVENT,
      this.pusherListener.oniMessageUploadListener,
    );

    this.uploadsChannel.bind(
      SUBSCRIPTION_SUCCESS_EVENT,
      () => (this.isUploadChannelSubscribed = 'SUBSCRIPTION_SUCCEED'),
    );

    this.uploadsChannel.bind(
      ERROR_EVENT,
      () => (this.isUploadChannelSubscribed = 'SUBSCRIPTION_FAILED'),
    );
  }

  subscribeToMessagePusher() {
    this.messagesChannel = this.pusherInstance.subscribe(
      getPusherMessageChannel(this.userId),
    );
    this.messagesChannel.bind(
      INSERT_EVENT,
      this.pusherListener.onNewMessageListener,
    );
    this.messagesChannel.bind(
      UPDATE_EVENT,
      this.pusherListener.onUpdateMessageListener,
    );
    this.messagesChannel.bind(
      SUBSCRIPTION_SUCCESS_EVENT,
      () => (this.isMessageChannelSubscribed = 'SUBSCRIPTION_SUCCEED'),
    );
    this.messagesChannel.bind(
      ERROR_EVENT,
      () => (this.isMessageChannelSubscribed = 'SUBSCRIPTION_FAILED'),
    );
  }

  unsubscribeToAllPusher() {
    this.isUploadChannelSubscribed = 'DEFAULT';
    this.isMessageChannelSubscribed = 'DEFAULT';
    this.pusherInstance?.unbind_all();
    this.pusherInstance?.unbind_global();
    this.pusherInstance?.unsubscribe(getPusherMessageChannel(this.userId));
    this.pusherInstance?.unsubscribe(getPusherUploadsChannel(this.userId));
    this.pusherInstance?.disconnect();
  }

  unsubscribeToMessageAndUploadPusher() {
    this.pusherInstance?.unsubscribe(getPusherMessageChannel(this.userId));
    this.pusherInstance?.unsubscribe(getPusherUploadsChannel(this.userId));
  }

  unbindMessagesListner() {
    this.messagesChannel?.unbind();
    this.uploadsChannel?.unbind();
  }
}
