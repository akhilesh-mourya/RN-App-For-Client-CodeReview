import {MessageText, MessageContainer} from './style';
import React, {FC} from 'react';

interface MessageItemProps {
  text?: string;
}

const TextMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {text} = props;

  const getMapping = (content: string) => {
    switch (content) {
      case 'maybe_later':
        return 'Maybe later';
      default:
        return content;
    }
  };

  return (
    <MessageContainer>
      <MessageText selectable={true}>{getMapping(text)}</MessageText>
    </MessageContainer>
  );
});
export default TextMessageCell;
