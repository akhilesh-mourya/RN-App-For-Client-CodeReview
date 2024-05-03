import {BGGradient, MessageText} from './rightCellstyles';
import React, {FC} from 'react';

interface MessageItemProps {
  text?: string;
  left?: boolean;
}

const RightTextMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {text} = props;

  return (
    <BGGradient>
      <MessageText>{text}</MessageText>
    </BGGradient>
  );
});
export default RightTextMessageCell;
