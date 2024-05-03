import i18next from 'i18next';
import {
  MessageText,
  MessageContainer,
  FillWidthDivider,
  FillWidthButton,
  UploadButtonIcon,
  FillQueText,
} from './style';
import React, {FC} from 'react';
import {MessageOptionPressEventType} from '../../../../constants/enums';

interface MessageItemProps {
  text?: string;
  onMessageOptionPressEvent?: Function;
  label?: string;
  type?: string;
  leftIcon?: boolean;
}

const UploadConvMessageCell: FC<MessageItemProps> = React.memo(props => {
  const {
    text,
    onMessageOptionPressEvent = () => {},
    label = i18next.t('Upload_Conversation'),
    type = MessageOptionPressEventType.UploadConversation,
    leftIcon = true,
  } = props;

  return (
    <>
      <MessageContainer>
        <MessageText selectable={true}>{text}</MessageText>
        <FillWidthDivider />
        <FillWidthButton onPress={() => onMessageOptionPressEvent(type)}>
          {leftIcon && <UploadButtonIcon />}
          <FillQueText> {label}</FillQueText>
        </FillWidthButton>
      </MessageContainer>
    </>
  );
});
export default UploadConvMessageCell;
