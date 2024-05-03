import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {formatDOBDate, isValidDOb} from '../../helpers/commonFunctions';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import {useMutation, useQuery} from 'react-query';
import {
  aiMatchmakingRegister,
  getCities,
} from '../../apiServices/aiMatchmaking';
import {AIMatchmakingRegisterReqData} from '../../../@types/common';
import {useLoader} from '../loader/useLoader';
import {setAIMatchMakingDataAsync} from '../../utility';
import {debounce} from 'lodash';
import moment from 'moment';
import {useAnalytics} from '../../services/analytics';

export const useWaitlistForm = navigation => {
  const {t} = useTranslation();
  const {goBack} = useNavigation();
  const today = new Date();
  const [date, setDate] = useState(
    new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()),
  );
  const analytics = useAnalytics();
  const [selectedDate, setSelectedDate] = useState<any>('');
  const [open, setOpen] = useState(false);
  const [datePickerError, setDatePickerError] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [meta, setMeta] = useState();

  const [cityQuery, setCityQuery] = useState('');
  const [cityCursor, setCityCursor] = useState('');

  const [isCityPickerOpen, setCityPickerOpen] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState<any>(null);
  const scrollViewRef = useRef();
  const {hideLoaderAndShowErrorMessage, showLoader, hideLoader} = useLoader();

  const {data: allCityData} = useQuery(
    ['fetchCities', cityQuery, cityCursor],
    () => getCities(cityQuery, cityCursor),
    {
      enabled: true,
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    analytics.trackViewMatchmakingRegistrationScreen();
  }, []);

  useEffect(() => {
    if (allCityData?.data && citiesData?.length > 0) {
      setCitiesData([...citiesData, ...allCityData?.data]);
      setMeta(allCityData?.meta);
    } else if (allCityData?.data && citiesData?.length === 0) {
      setCitiesData([...allCityData?.data]);
      setMeta(allCityData?.meta);
    }
  }, [allCityData]);

  const {mutateAsync} = useMutation(
    (requestBody: AIMatchmakingRegisterReqData) =>
      aiMatchmakingRegister(requestBody),
  );

  const onDatePickerDonePress = () => {
    setOpen(false);
    const formattedDate = formatDOBDate(date);
    setDatePickerError(isValidDOb(date) ? '' : t('Age_Must_18_Error'));
    setSelectedDate(formattedDate);
    scrollViewRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const onCitySelected = (selectedCity: any) => {
    console.log('City Name', selectedCity);
    analytics.trackSelectCityOnCityPickerSheetOnMatchmakingRegistrationScreen({
      city: selectedCity.name,
      state: selectedCity.cityCode,
      country: selectedCity.countryCode,
    });
    setCityPickerOpen(false);
    setSelectedCityData(selectedCity);
  };

  const isButtonEnabled = () => {
    return !datePickerError && selectedDate && selectedCityData;
  };

  const getCitiesForQueryWithDebounce = (query: string) => {
    setCitiesData([]);
    setCityCursor(null);
    setCityQuery(query);
  };

  const checkString = data => {
    return /^[0-9]*$/.test(data);
  };

  const getName = (item: any) => {
    const country = checkString(item?.cityCode)
      ? item?.countryCode
      : item?.cityCode;
    return item?.name + ', ' + country;
  };

  const getCitiesForQuery = debounce(getCitiesForQueryWithDebounce, 1000);

  const loadMore = (cursor: string) => {
    setCityCursor(cursor);
  };

  const goToReferFriend = () => {
    showLoader();

    if (selectedCityData) {
      analytics.trackTouchJoinWaitlistButtonOnMatchmakingRegistrationScreen(
        moment(date).format('YYYY-MM-DD'),
        {
          city: selectedCityData.name,
          state: selectedCityData.cityCode,
          country: selectedCityData.countryCode,
        },
      );
    }

    const reqBody = {
      birthDate: date,
      cityId: selectedCityData?.id,
    };
    mutateAsync(reqBody)
      .then(response => {
        setAIMatchMakingDataAsync(response);
        navigation.reset({
          index: 0,
          routes: [{name: SCREEN_NAME.MatchMakingSuccessScreen}],
        });
        setTimeout(() => {
          hideLoader();
          goBack();
        }, 600);
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error, t('OK'));
      });
  };

  return {
    t,
    date,
    setDate,
    open,
    setOpen,
    onDatePickerDonePress,
    scrollViewRef,
    selectedDate,
    datePickerError,
    onCitySelected,
    setCityPickerOpen,
    isCityPickerOpen,
    selectedCityData,
    isButtonEnabled,
    goToReferFriend,
    citiesData,
    getCitiesForQuery,
    getName,
    loadMore,
    meta,
  };
};
