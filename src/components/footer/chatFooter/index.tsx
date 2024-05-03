import {
  MainContainer,
  PlusIcon,
  MessageInput,
  Touchable,
  InputContainer,
  SendIcon,
  PlusIconDisabled,
} from './styles';
import React, {FC, useState} from 'react';

interface FooterProps {
  isDisabled?: boolean;
  sendMessage?: () => void;
  onUploadConvPress?: () => void;
}

const Footer: FC<FooterProps> = React.memo(
  ({
    sendMessage = () => {},
    isDisabled = false,
    onUploadConvPress = () => {},
  }) => {
    const [messageText, setMessageText] = useState();
    return (
      <MainContainer>
        <Touchable onPress={onUploadConvPress} disabled={isDisabled}>
          {isDisabled ? <PlusIconDisabled /> : <PlusIcon />}
        </Touchable>
        <InputContainer disabled={isDisabled} focused={!!messageText}>
          <MessageInput
            autoFocus={false}
            onChangeText={setMessageText}
            value={messageText}
            editable={!isDisabled}
            disabled={isDisabled}
          />
          {!!messageText && (
            <Touchable
              onPress={() => {
                sendMessage(messageText);
                setMessageText('');
              }}>
              <SendIcon />
            </Touchable>
          )}
        </InputContainer>
      </MainContainer>
    );
  },
);
export default Footer;
