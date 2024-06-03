import React, {FC, useState, useEffect, useRef} from 'react';
import * as Keychain from 'react-native-keychain';
import {UserDataType} from '../../@types/context';
import {
  getAIMatchMakingData,
  getOnboardingStepComplete,
  getRefreshToken,
  getUserData,
  setAIMatchMakingDataAsync,
  setOnboardingStepComplete,
  setUserDataInAsync,
} from '../utility';
import {
  CoachDataProps,
  QuestionnaireProps,
  WhatsappRelationshipProps,
} from '../constants/mockData';
import {useMutation, useQuery} from 'react-query';
import {
  checkAndGetUser,
  deleteUpload,
  getAppSoreLinksData,
  getRecentUploadsData,
} from '../apiServices/registration';
import {checkForApiVersionIsGreater} from '../helpers/commonFunctions';
import {IS_IOS_PLATFORM, MAC_APP_LINK} from '../constants/appContants';
import {AppState} from 'react-native';
import {SCREEN_NAME} from '../enums';
import {
  navigationRef,
  resetToPhoneNumberRoute,
  resetToWaitlistRoute,
} from '../navigation/navigationHelper';
import {getiMessageUploadInfo} from '../apiServices/main';
import {deleteAllDBTablesData} from '../dbServices/db';
import {useAnalytics} from '../services/analytics';
import {usePusher} from '../services/pusher/hooks/usePuser';
import axios from 'axios';
import {useNotification} from '../services/notification/hooks/useNotification';
import {Config} from 'react-native-config';
import Auth0 from 'react-native-auth0';

interface AuthContextType {
  children: React.ReactElement;
}

const authContextInitialState = {
  updateUserData: () => {},
  setAuthTokenInKeychain: () => {},
  getAuthToken: () => {},
  resetAuthToken: () => {},
  setAuthTokenInContext: () => {},
  setRegistrationProgressContext: () => {},
  setQuestionnaireContext: () => {},
  setUploadedWhatsappIdContext: () => {},
  setUploadedWhatsappId: () => {},
  setRelationshipDataContext: () => {},
  setRelationshipData: () => {},
  resetSession: () => {},
  setAIMatchmakingData: () => {},
  setCurrCreateRelationshipData: () => {},
  setQuestionnaire: () => {},
  fetchAPIs: () => {},
  refreshAccessToken: () => {},
  setMyCoachData: () => {},
  userData: null,
  authToken: null,
  registrationProgress: '',
  uploadedWhatsappId: '',
  relationshipData: [],
  currCreaterelationshipData: null,
  refreshToken: null,
  appsStoreLinksInfo: null,
  showForceUpgrade: false,
  macAppUrl: MAC_APP_LINK,
  auth0: null,
  hasRefreshedTheToken: false,
  aiMatchmakingData: null,
};

export interface AuthContextProps {
  userData: UserDataType | null;
  updateUserData: Function;
  setAuthTokenInKeychain: Function;
  getAuthToken: Function;
  resetAuthToken: Function;
  setAuthTokenInContext: Function;
  setRegistrationProgressContext: Function;
  setQuestionnaire: Function;
  authToken: string | null;
  registrationProgress: string;
  isRegistrationDone?: boolean;
  myCoachData?: CoachDataProps | null;
  questionnaire?: QuestionnaireProps | null;
  setMyCoachData: Function;
  setUploadedWhatsappId: Function;
  uploadedWhatsappId?: string | undefined | null;
  relationshipData?: Array<any>;
  setRelationshipData: Function;
  currCreaterelationshipData?: WhatsappRelationshipProps | undefined | null;
  setCurrCreateRelationshipData: Function;
  refreshToken: string | null;
  aiMatchmakingData: any;
  appsStoreLinksInfo: any;
  setAIMatchmakingData: any;
  showForceUpgrade: boolean;
  macAppUrl: string;
  resetSession: Function;
  fetchAPIs: Function;
  auth0: Auth0 | null;
  hasRefreshedTheToken: boolean;
  refreshAccessToken: Function;
}

export const AuthContext = React.createContext<AuthContextProps>(
  authContextInitialState,
);
const AuthContextProvider: FC<AuthContextType> = ({children}) => {
  const {data: appsStoreLinksData} = useQuery(['getAppSoreLinksData'], () =>
    getAppSoreLinksData(),
  );
  const {data: recentUploadsData} = useQuery(['getRecentUploads'], () =>
    getRecentUploadsData(),
  );
  const {mutateAsync: deleteUploadCall} = useMutation((uploadId: string) =>
    deleteUpload(uploadId),
  );
  const [userData, setUserData] = useState<UserDataType | null>(
    authContextInitialState?.userData,
  );
  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID,
  });

  const [appsStoreLinksInfo, setAppsStoreLinksInfo] = useState(null);
  const [macAppUrl, setMacAppUrl] = useState(MAC_APP_LINK);
  const [aiMatchmakingData, setAIMatchmakingData] = useState(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [registrationProgress, setRegistrationProgress] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string | null>('');
  const appState = useRef(AppState.currentState);

  const pusher = usePusher();
  const analytics = useAnalytics();
  const notification = useNotification();
  const [myCoachData, setMyCoach] = useState<CoachDataProps | null>(
    authContextInitialState?.userData,
  );

  const [questionnaire, setQuestionnaire] = useState<QuestionnaireProps | null>(
    authContextInitialState?.userData,
  );
  const [relationshipData, setRelationshipData] = useState<Array<any>>(
    authContextInitialState?.relationshipData,
  );

  const [currCreaterelationshipData, setCurrCreateRelationshipData] =
    useState<WhatsappRelationshipProps | null>(
      authContextInitialState?.currCreaterelationshipData,
    );

  const [uploadedWhatsappId, setUploadedWhatsappId] = useState('');
  const [hasRefreshedTheToken, setHasRefreshedTheToken] = useState(false);
  const [showForceUpgrade, setShowForceUpgrade] = useState<boolean>(false);

  useEffect(() => {
    checkForAuthToken();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/background/) && nextAppState === 'active') {
        fetchAPIs();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (appsStoreLinksData?.android && appsStoreLinksData?.ios) {
      configureMetaData(appsStoreLinksData);
    }
  }, [appsStoreLinksData]);

  useEffect(() => {
    if (recentUploadsData?.data) {
      handleRecentUploads(recentUploadsData?.data);
    }
  }, [recentUploadsData]);

  const fetchAPIs = async () => {
    const _userData = await checkAndGetUser();
    handleUserSessionAndServices(_userData);
    const _appsStoreLinksData = await getAppSoreLinksData();
    const _recentUploadsData = await getRecentUploadsData();
    configureMetaData(_appsStoreLinksData);
    handleRecentUploads(_recentUploadsData?.data);
  };

  const handleRecentUploads = (uploads: Array<any> = []) => {
    if (uploads?.length > 0) {
      const firstUpload = uploads[0];
      goToImessageSync(firstUpload);

      if (uploads?.length > 1) {
        uploads.splice(0, 1);
        deleteRestUploads(uploads);
      }
    }
  };

  const refreshAccessToken = async (phoneNumber: string) => {
    try {
      const res = await auth0.auth.refreshToken({
        refreshToken: refreshToken,
        scope: 'offline_access',
      });
      setAuthTokenInKeychain(phoneNumber, res?.accessToken);
      return true;
    } catch (error) {
      console.log('RefreshToken Error: ', error);
      return false;
    }
  };

  const handleUserSessionAndServices = async (_userData: any) => {
    const token = global.token;
    const progress = global.registrationProgress;

    try {
      if (_userData?.data?.data?.inWaitlist && progress === 'DONE') {
        resetToWaitlistRoute();
      } else if (
        !_userData?.data?.data?.inWaitlist &&
        _userData?.data?.data?.id &&
        progress === 'DONE' &&
        token
      ) {
        pusher.init({userId: _userData?.data?.data?.id, token: token});
        notification.initializeNotifications(_userData?.data?.data?.id, token);
      } else {
        const userError = JSON.stringify(_userData);
        const finalError = JSON.parse(userError);

        if (
          (progress === 'DONE' ||
            progress === 'ENABLE_NOTIFICATION' ||
            progress === 'WAITLIST_SCREEN') &&
          finalError?.status >= 400 &&
          finalError?.status < 500
        ) {
          if (finalError?.status === 401) {
            const userDataFromAsync = await getUserData();
            const hasTokenRefreshed = await refreshAccessToken(
              userDataFromAsync?.phoneNumber,
            );
            setHasRefreshedTheToken(hasTokenRefreshed);
            if (!hasTokenRefreshed) {
              resetSession();
              resetToPhoneNumberRoute();
            }
          } else {
            resetSession();
            resetToPhoneNumberRoute();
          }
        }
      }
    } catch (error) {
      const userError = JSON.stringify(error);
      const finalError = JSON.parse(userError);
      if (finalError?.status >= 400 && finalError?.status < 500) {
        resetSession();
        resetToPhoneNumberRoute();
      }
    }
  };

  const goToImessageSync = async (uploadData: string) => {
    try {
      const data = await getiMessageUploadInfo(uploadData?.id);
      if (data?.senders?.length > 0) {
        navigationRef.current?.navigate(SCREEN_NAME.IMessageSyncedModalScreen, {
          iMessageInfo: data,
          uploadData: uploadData,
        });
      }
    } catch (error) {}
  };

  const deleteRestUploads = async (restUploads: Array<any> = []) => {
    if (restUploads?.length > 0) {
      const promiseArray: Array<any> = [];
      try {
        restUploads?.map(uploadData => {
          promiseArray.push(
            new Promise((resolve, reject) => {
              deleteUploadCall(uploadData?.id)
                ?.then(() => {
                  resolve(true);
                })
                .catch(error => {
                  reject({error: error});
                });
            }),
          );
        });
        await Promise.all(promiseArray);
      } catch (error) {}
    }
  };

  const configureMetaData = (_appsStoreLinksData: any) => {
    const storeUrl = IS_IOS_PLATFORM
      ? _appsStoreLinksData?.ios?.storeUrl
      : _appsStoreLinksData?.android?.storeUrl;
    setAppsStoreLinksInfo(storeUrl);
    checkForForceUpgrade(_appsStoreLinksData);
    setMacAppUrl(_appsStoreLinksData?.mac?.downloadUrl || MAC_APP_LINK);
  };

  const checkForForceUpgrade = (_appsStoreLinksData: any) => {
    const minAppVersion = IS_IOS_PLATFORM
      ? _appsStoreLinksData?.ios?.minVersion
      : _appsStoreLinksData?.android?.minVersion;
    setShowForceUpgrade(checkForApiVersionIsGreater(minAppVersion));
  };

  const checkForAuthToken = async () => {
    const token = await getAuthToken();
    setAuthTokenInContext(token?.password);
    getUserDataFromAsyncStore(token?.password);
  };

  const getUserDataFromAsyncStore = async (token: string) => {
    const _userData = await getUserData();
    const registrationStep = await getOnboardingStepComplete();
    setUserData(_userData);
    if (
      token &&
      _userData?.id &&
      !_userData?.inWaitlist &&
      registrationStep === 'DONE'
    ) {
      notification.initializeNotifications(_userData?.id, token);
      pusher.init({userId: _userData?.id, token: token});
    }
    getAIMatchMakingAsyncStore();
  };

  const getAIMatchMakingAsyncStore = async () => {
    const matchmakingData = await getAIMatchMakingData();
    setAIMatchmakingData(matchmakingData);
    getRefreshTokenFromAsync();
  };

  const checkForRegistrationDone = async () => {
    const registrationStep = await getOnboardingStepComplete();
    setRegistrationProgressContext(registrationStep);
  };

  const getRefreshTokenFromAsync = async () => {
    const _refreshToken = await getRefreshToken();
    setRefreshToken(_refreshToken);
    checkForRegistrationDone();
  };

  const setRegistrationProgressContext = (progress: string) => {
    global.registrationProgress = progress;
    setRegistrationProgress(progress);
  };

  const setAuthTokenInContext = (newToken: string | null) => {
    global.token = newToken;
    setAuthToken(newToken);
  };

  const updateUserData = (updatedUserInfo: UserDataType) => {
    setUserData(updatedUserInfo);
  };

  const setMyCoachData = (updatedUserInfo: CoachDataProps) => {
    setMyCoach(updatedUserInfo);
  };

  const setAuthTokenInKeychain = async (callingNum: string, token: string) => {
    setAuthTokenInContext(token);
    await Keychain.setGenericPassword(callingNum, token);
  };

  const getAuthToken = async () => {
    const credentials = await Keychain.getGenericPassword();
    return credentials;
  };

  const resetAuthToken = async () => {
    setAuthToken(null);
    await Keychain.resetGenericPassword();
  };

  const resetSession = () => {
    pusher.unbindMessagesListner();
    pusher.unsubscribeToAllPusher();
    setRegistrationProgressContext('OTP_VERIFICATION');
    setOnboardingStepComplete('OTP_VERIFICATION');
    setUserData(null);
    resetAuthToken();
    setAIMatchmakingData(null);
    setAIMatchMakingDataAsync({});
    setUserDataInAsync({});
    setRefreshToken('');
    deleteAllDBTablesData(global.dbLocalRef);
    notification.unsubscribeFromNotifications();
    axios.defaults.headers.common.Authorization = null;
    global.token = null;
    setTimeout(() => {
      analytics?.deidentify();
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        updateUserData,
        setAuthTokenInKeychain,
        getAuthToken,
        resetAuthToken,
        setAuthTokenInContext,
        setRegistrationProgressContext,
        setQuestionnaire,
        setUploadedWhatsappId,
        questionnaire,
        uploadedWhatsappId,
        authToken,
        registrationProgress,
        setMyCoachData,
        myCoachData,
        setRelationshipData,
        relationshipData,
        currCreaterelationshipData,
        setCurrCreateRelationshipData,
        refreshToken,
        aiMatchmakingData,
        appsStoreLinksInfo,
        setAIMatchmakingData,
        showForceUpgrade,
        macAppUrl,
        resetSession,
        fetchAPIs,
        auth0,
        hasRefreshedTheToken,
        refreshAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
