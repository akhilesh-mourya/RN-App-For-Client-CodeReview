import React, {FC, useState} from 'react';
import Loader from '../components/loader';
import StackNavigator from '../navigation';
import ErrorPopUp from '../components/errorPopUp';
import ErrorNewPopUp from '../components/errorNewPopUp';
import { ForceUpgradePopup } from '../components/forceUpgradePopup';
import useAuth from '../hooks/context/useAuth';

export const LoaderContext = React.createContext(null);
const StackNavigationWithLoader: FC<{}> = () => {
  const contextInitialState = {
    isVisible: false,
    isErrorPopupVisible: false,
    isErrorOldUI: true,
    isAnimationEnabled: true,
    errorMessage: '',
    errorPopupType: null,
    onSuccessCallBack: () => {},
    onCancelCallBack: () => {},
    okButtonLable: '',
    cancelButtonLabel: '',
  };
  const {authContextData} = useAuth();
  const [loaderInfo, setLoaderInfo] = useState(contextInitialState);
  const [notificationInfo, setNotificationInfo] = useState({
    isEnableNotificationVisible: false,
  });

  function setLoaderVisible(
    isVisible: boolean,
    isAnimationEnabled: boolean,
  ): void {
    const updateState = {
      ...loaderInfo,
      isVisible,
      isErrorPopupVisible: false,
      isAnimationEnabled,
      errorPopupType: null,
      errorMessage: '',
    };
    setLoaderInfo(updateState);
  }

  function setErrorPopupVisible({...rest}): void {
    const updateState = {
      ...loaderInfo,
      ...rest,
    };
    setLoaderInfo(updateState);
  }

  function setErrorOldUI(flag: boolean): void {
    const updateState = {
      ...loaderInfo,
      isErrorOldUI: flag,
    };
    setLoaderInfo(updateState);
  }

  function setErrorPopupHide(): void {
    const updateState = {
      ...loaderInfo,
      isErrorPopupVisible: false,
    };
    setLoaderInfo(updateState);
  }

  function setNotificationVisible(isEnableNotificationVisible: boolean): void {
    const updateState = {
      isEnableNotificationVisible,
    };
    setNotificationInfo(updateState);
  }

  const loaderContextSetter = {
    setLoaderVisible,
    setErrorPopupVisible,
    setErrorPopupHide,
    setErrorOldUI,
  };

  const renderForceUpgradePopup = () => (
    <ForceUpgradePopup isVisible={authContextData?.showForceUpgrade} appStoreLink={authContextData?.appsStoreLinksInfo} />
  );

  return (
    <LoaderContext.Provider
      value={{
        ...loaderInfo,
        ...notificationInfo,
        ...loaderContextSetter,
        setNotificationVisible,
      }}>
      <StackNavigator />
      <Loader
        isVisible={loaderInfo.isVisible}
        isAnimationEnabled={loaderInfo.isAnimationEnabled}
      />
      {loaderInfo.isErrorOldUI ? <ErrorPopUp /> : <ErrorNewPopUp />}
      {renderForceUpgradePopup()}
    </LoaderContext.Provider>
  );
};
export default StackNavigationWithLoader;
