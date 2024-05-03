import React, {FC} from 'react';
import {Container, MessageLabel, MyNameLabel, PartnerLabel} from './styles';
import {SnippetMessage} from '../../../enums';

interface MessageProps {
  item: any;
  type: string;
  subject: string;
}

export const AttachmentMessageItem: FC<MessageProps> = React.memo(props => {
  const {item, type, subject} = props;
  const renderMyMessage = () => {
    return (
      <MyNameLabel>
        {item?.sender}: <MessageLabel>{item?.content}</MessageLabel>
      </MyNameLabel>
    );
  };

  const renderPartnerMessage = () => {
    return (
      <PartnerLabel type={type}>
        {item?.sender}: <MessageLabel>{item?.content}</MessageLabel>
      </PartnerLabel>
    );
  };

  const compareName = (sender: string, yourName: string) => {
    const yourNameArr = yourName?.split(' ');
    if (yourNameArr?.length > 1) {
      if (yourNameArr[0] === sender || yourName === sender) {
        return true;
      } else {
        return false;
      }
    } else if (yourName === sender) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      {compareName(item?.sender, subject) || item?.sender === SnippetMessage.you
        ? renderMyMessage()
        : renderPartnerMessage()}
    </Container>
  );
});
