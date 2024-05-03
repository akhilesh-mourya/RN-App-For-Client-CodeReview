import {
  BGGradientRow,
  UploadedAConversationMessageText,
} from './rightCellstyles';
import React, {FC, ReactElement} from 'react';

interface MessageItemProps {
  text?: string;
  leftIcon?: ReactElement | null;
}

const RightTextWithIconMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {text, leftIcon = null} = props;
  return (
    <BGGradientRow>
      {leftIcon}
      <UploadedAConversationMessageText>
        {text}
      </UploadedAConversationMessageText>
    </BGGradientRow>
  );
});
export default RightTextWithIconMessageCell;
