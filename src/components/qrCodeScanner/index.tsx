import React, {FC, useRef} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  MainContainer,
  ModalContainer,
  CloseTouchable,
  CloseIcon,
} from './styles';
import {useWindowDimensions} from 'react-native';

interface QrCodeScannerProps {
  isVisible?: boolean;
  onClosePress?: Function;
  onQrCodeRead?: Function;
}

const QrCodeScanner: FC<QrCodeScannerProps> = React.memo(props => {
  const {isVisible, onClosePress = () => {}, onQrCodeRead = () => {}} = props;
  const {height} = useWindowDimensions();
  const qrScannerRef = useRef(null);
  const onCodeRead = e => {
    onQrCodeRead(e);
  };
  return (
    <ModalContainer isVisible={isVisible}>
      <MainContainer>
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          ref={qrScannerRef}
          onRead={onCodeRead}
          cameraStyle={{height}}
        />
        <CloseTouchable onPress={onClosePress}>
          <CloseIcon />
        </CloseTouchable>
      </MainContainer>
    </ModalContainer>
  );
});

export default QrCodeScanner;
