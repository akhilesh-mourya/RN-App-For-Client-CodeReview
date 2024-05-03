import {AvatarImg, MainContainer, SubContainer, AvatarBlank} from './styles';
import React, {FC} from 'react';
import {StructuredProps} from '../../../enums';
import LeftMessageCell from './leftMessageCell';
import RightMessageCell from './rightMessageCell';
import {MessageContentType, MessageType} from '../../../constants/enums';
import {t} from 'i18next';
import {getMessageContentToShow} from '../../../utility/chatUtility';

interface MessageItemProps {
  text?: string;
  avatar?: string;
  left?: boolean;
  index: number;
  restructureMessageData: StructuredProps[] | any;
  sectionIndex?: number;
  type?: string;
  onMessageOptionPressEvent?: Function;
  item: any;
  myRelationshipsList: Array<any>;
}

const MessageItem: FC<MessageItemProps> = React.memo(props => {
  const {
    text,
    avatar,
    left = false,
    index,
    sectionIndex = 0,
    restructureMessageData = [],
    onMessageOptionPressEvent,
    type,
    item,
    myRelationshipsList = [],
  } = props;
  const isAdjecentItem = () => {
    if (index + 1 < restructureMessageData[sectionIndex]?.data?.length) {
      if (
        restructureMessageData[sectionIndex]?.data[index]?.contentType ===
        MessageType?.ChatLoading
      ) {
        return true;
      }
      const isAdj =
        restructureMessageData[sectionIndex]?.data[index]?.senderId ===
          restructureMessageData[sectionIndex]?.data[index + 1]?.senderId ||
        (restructureMessageData[sectionIndex]?.data[index]?.senderType ===
          'assistant' &&
          restructureMessageData[sectionIndex]?.data[index + 1]?.senderType ===
            'user' &&
          restructureMessageData[sectionIndex]?.data[index - 1]?.senderType !=
            'assistant');
      return isAdj;
    }
    return (
      restructureMessageData[sectionIndex]?.data[index]?.senderType ===
        'assistant' &&
      restructureMessageData[sectionIndex]?.data[index - 1]?.senderType !==
        'assistant'
    );
  };

  const renderLeftMessageCell = () => {
    return (
      <LeftMessageCell
        text={getMessageContentToShow(text, myRelationshipsList)}
        type={type}
        item={item}
        onMessageOptionPressEvent={onMessageOptionPressEvent}
      />
    );
  };

  const getContentType = (_type: string, content: string) => {
    let updatedType = _type;
    switch (content) {
      case MessageContentType?.You_Uploaded_Conversations:
        updatedType = MessageType?.UploadedConversation;
        break;
    }
    return updatedType;
  };

  const renderRightMessageCell = () => {
    return (
      <RightMessageCell
        text={getMessageContentToShow(text)}
        type={getContentType(type, text)}
        onMessageOptionPressEvent={onMessageOptionPressEvent}
        item={item}
      />
    );
  };

  return (
    <MainContainer left={left} isAdjecentItem={isAdjecentItem()}>
      <SubContainer>
        {left && isAdjecentItem() ? (
          <AvatarImg source={{uri: avatar}} />
        ) : (
          left && <AvatarBlank />
        )}
        {left ? renderLeftMessageCell() : renderRightMessageCell()}
      </SubContainer>
    </MainContainer>
  );
});
export default MessageItem;
