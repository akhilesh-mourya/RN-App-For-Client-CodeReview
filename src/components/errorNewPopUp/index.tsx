import React, {FC, useEffect, useState} from 'react';
import {
  ButtonTouchable,
  Container,
  CrossIcon,
  MainContainer,
  MessageLabel,
  ModalContainer,
  OkLabel,
  PopUpImageBg,
  TitleLabel,
  TouchableOpacity,
  Touchable,
  Cancelabel,
  ErrorButtonTouchable,
} from './styles';
import i18next, {t} from 'i18next';
import {useLoader} from '../../hooks/loader/useLoader';
import {ErroPopupType} from '../../enums';

const ErrorNewPopUp: FC<{}> = React.memo(() => {
  const {contextLoader} = useLoader();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let msg = '';
    if (contextLoader?.errorMessage !== null) {
      if (typeof contextLoader?.errorMessage === 'string') {
        msg = contextLoader?.errorMessage;
      } else if (typeof contextLoader?.errorMessage === 'object') {
        msg =
          contextLoader?.errorMessage?.json?.error_description ||
          'Please try again later.';
      } else {
        msg = 'Please try again later.';
      }
    } else {
      msg = 'Please try again later.';
    }
    setErrorMsg(msg);
  }, [contextLoader?.errorMessage]);

  const onSuccessCallBack = () => {
    contextLoader?.setErrorPopupHide();
    if (contextLoader?.onSuccessCallBack) {
      setTimeout(() => {
        contextLoader?.onSuccessCallBack();
      }, 600);
    }
  };

  const onCancelCallBack = () => {
    contextLoader?.setErrorPopupHide();
    contextLoader?.onCancelCallBack && contextLoader?.onCancelCallBack();
  };

  const renderOnlyErrorWithCancel = () => (
    <Container>
      <TitleLabel>{errorMsg}</TitleLabel>
      <ButtonTouchable onPress={onSuccessCallBack}>
        <OkLabel>{contextLoader?.okButtonLable || t('Okay')}</OkLabel>
      </ButtonTouchable>
      <Touchable onPress={onCancelCallBack}>
        <Cancelabel>
          {contextLoader?.cancelButtonLabel || t('Do_Not_Save')}
        </Cancelabel>
      </Touchable>
    </Container>
  );

  const renderDeleteConfirmation = () => (
    <Container>
      <TitleLabel>{errorMsg}</TitleLabel>
      <MessageLabel>{i18next.t('Delete_Relationship_Msg')}</MessageLabel>
      <ErrorButtonTouchable onPress={onSuccessCallBack}>
        <OkLabel>{t('Delete')}</OkLabel>
      </ErrorButtonTouchable>
      <Touchable onPress={onCancelCallBack}>
        <Cancelabel>{t('Cancel')}</Cancelabel>
      </Touchable>
    </Container>
  );

  const renderOnlyError = () => (
    <Container>
      <TitleLabel>{errorMsg}</TitleLabel>
      <ButtonTouchable onPress={onCancelCallBack}>
        <OkLabel>{t('Okay')}</OkLabel>
      </ButtonTouchable>
    </Container>
  );

  const renderErrorWithTitle = () => (
    <Container>
      <TitleLabel>Oops! Something went wrong. {errorMsg}</TitleLabel>
      {/* <MessageLabel>{errorMsg}</MessageLabel> */}
      <ButtonTouchable onPress={onCancelCallBack}>
        <OkLabel>{contextLoader?.okButtonLable || t('Okay')}</OkLabel>
      </ButtonTouchable>
    </Container>
  );

  const renderCloseView = () => (
    <TouchableOpacity onPress={onCancelCallBack}>
      <CrossIcon />
    </TouchableOpacity>
  );

  const renderBody = () => {
    let bodyComponent = null;
    switch (contextLoader?.errorPopupType) {
      case ErroPopupType.OnlyError:
        bodyComponent = renderOnlyError();
        break;
      case ErroPopupType.ErrorWithTitle:
        bodyComponent = renderErrorWithTitle();
        break;
      case ErroPopupType.ErrorWithCancelButton:
        bodyComponent = renderOnlyErrorWithCancel();
        break;
      case ErroPopupType.DeleteConfirmation:
        bodyComponent = renderDeleteConfirmation();
        break;
    }
    return bodyComponent;
  };

  const shoidShowCancelButton = () => {
    return ![
      ErroPopupType?.DeleteConfirmation,
      ErroPopupType?.ErrorWithCancelButton,
    ]?.includes(contextLoader?.errorPopupType);
  };

  return (
    <ModalContainer isVisible={contextLoader?.isErrorPopupVisible}>
      <MainContainer>
        <PopUpImageBg>
          {shoidShowCancelButton() && renderCloseView()}
          {renderBody()}
        </PopUpImageBg>
      </MainContainer>
    </ModalContainer>
  );
});

export default ErrorNewPopUp;
