import {useContext} from 'react';
import {ChatContext, ChatContextProps} from '../../context/chatContext';

const useChat = () => {
  const chatContextData = useContext<ChatContextProps>(ChatContext);
  global.chatContextRef = chatContextData;
  return {chatContextData};
};

export default useChat;
