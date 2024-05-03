import React, {FC, useState} from 'react';
import {ChannelDataType, MessagesListType} from '../types';
import {checkAndRemoveLoadingMessage} from '../utility/chatUtility';
import {MessageStatusEnum} from '../enums';

interface ChatContextType {
  children: React.ReactElement;
}

const chatContextInitialState = {
  channelsList: [],
  setChannelsList: () => {},
  messagesListContext: [],
  setMessagesListContext: () => {},
  onNewMessageReceived: () => {},
  appendNewMsgs: () => {},
  chatAnalysisData: null,
  setChatAnalysisData: () => {},
};

export interface ChatContextProps {
  channelsList: Array<ChannelDataType>;
  setChannelsList: Function;
  messagesListContext: MessagesListType;
  setMessagesListContext: Function;
  appendNewMsgs: Function;
  chatAnalysisData: any,
  setChatAnalysisData: Function;
}

export const ChatContext = React.createContext<ChatContextProps>(
  chatContextInitialState,
);
const ChatContextProvider: FC<ChatContextType> = ({children}) => {
  const [channelsList, setChannelsList] = useState<Array<ChannelDataType>>(
    chatContextInitialState?.channelsList,
  );
  const [messagesListContext, setMessagesListContext] =
    useState<MessagesListType>(chatContextInitialState?.messagesListContext);
    const [chatAnalysisData, setChatAnalysisData] =
    useState<MessagesListType>(chatContextInitialState?.chatAnalysisData);

  const appendNewMsgs = (newList: MessagesListType = []) => {
    let oldMessages = checkAndRemoveLoadingMessage(messagesListContext);
    if (
      oldMessages?.length > 0 &&
      oldMessages[0]?.channelId !== newList[0]?.channelId
    ) {
      return;
    } else {
      let newMsgList = newList;
      let updatedMsg = {...newMsgList[0]};
      if (
        newList?.length === 1 &&
        [
          MessageStatusEnum?.MessageProcessStatusInQueue,
          MessageStatusEnum?.MessageProcessStatusProcessing,
        ].includes(newList[0]?.process?.status)
      ) {
        updatedMsg.senderType = 'Bot';
        setMessagesListContext([updatedMsg, ...newMsgList, ...oldMessages]);
      } else {
        setMessagesListContext([...newMsgList, ...oldMessages]);
      }
    }
  };
  return (
    <ChatContext.Provider
      value={{
        channelsList,
        messagesListContext,
        setChannelsList,
        setMessagesListContext,
        appendNewMsgs,
        chatAnalysisData,
        setChatAnalysisData,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
