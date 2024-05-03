import {ChatContextProps} from '../src/context/chatContext';

declare module 'node-emoji';
declare module 'react-native-pusher-push-notifications';

declare module globalThis {
  var dbLocalRef: any;
  var chatContextRef: ChatContextProps;
}
