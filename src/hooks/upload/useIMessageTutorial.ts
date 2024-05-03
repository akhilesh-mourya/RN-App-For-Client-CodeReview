import {useEffect, useState} from 'react';
import Share from 'react-native-share';
import {IMessageTutorial} from '../../helpers/commonFunctions';
import {getMacLinkShareOptions} from '../../utility';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import {MAC_APP_LINK} from '../../constants/appContants';
import useAuth from '../context/useAuth';
// import {SCAN_QR_CODE} from '../../constants/mixPanelEventsConstants';
import {useAnalytics} from '../../services/analytics';

export const useIMessageTutorial = () => {
  const [isQrCodeVisible, setQrCodeVisible] = useState(false);
  const {navigate} = useNavigation();
  const {authContextData} = useAuth();
  const stepsArray = IMessageTutorial;
  const macLink = authContextData?.macAppUrl || MAC_APP_LINK;

  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewUploadIMessageTutorialScreen();
  }, [analytics]);

  const onScanQRPress = () => {
    setQrCodeVisible(true);
  };
  const onScannerClosePress = () => {
    setQrCodeVisible(false);
  };

  const onSharePress = () => {
    analytics.trackTouchShareButtonOnUploadIMessageTutorialScreen();

    const options = getMacLinkShareOptions(macLink);
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const onQrCodeRead = (readData: string) => {
    onScannerClosePress();
    setTimeout(() => {
      navigate(SCREEN_NAME.iMessageNotSyncedModalScreen);
    }, 500);
  };

  return {
    macLink,
    stepsArray,
    isQrCodeVisible,
    onScanQRPress,
    onScannerClosePress,
    onSharePress,
    onQrCodeRead,
  };
};
