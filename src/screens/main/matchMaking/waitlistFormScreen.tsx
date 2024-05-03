import React, {FC} from 'react';
import {
  ScrollContainer,
  SubContainer,
  JoinWaitlistHeaderLabel,
  JoinWaitlistDescription,
  MatchMakingIcon,
  JoinWaitListFormButton,
} from './styles';
import {DarkBackgroundContainer} from '../../../components/screenBackground/GradientBackgroundContainer';
import AMHeaderBackButton from '../../../components/button/AMHeaderBackButton';
import FormPicker from './subComponents/formPicker';
import AMDatePicker from '../../../components/datePicker';
import {useWaitlistForm} from '../../../hooks/matchMaking/useWaitlistForm';
import CitySelectionPopup from '../../../components/citySelectionPopup';
import nodeEmoji from 'node-emoji';
import {useAnalytics} from '../../../services/analytics';

const WaitlistFormScreen: FC<{}> = ({navigation}) => {
  const {
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
    isCityPickerOpen,
    setCityPickerOpen,
    selectedCityData,
    getName,
    isButtonEnabled,
    goToReferFriend,
    citiesData,
    getCitiesForQuery,
    loadMore,
    meta,
  } = useWaitlistForm(navigation);
  const analytics = useAnalytics();
  const renderHeaderContent = () => (
    <>
      <MatchMakingIcon />
      <JoinWaitlistHeaderLabel>
        {t('Join_The_Waitlist')}
      </JoinWaitlistHeaderLabel>
      <JoinWaitlistDescription>
        {t('Waitlist_Form_Description')}
      </JoinWaitlistDescription>
    </>
  );
  const renderBodyContent = () => (
    <>
      <FormPicker
        label={t('Birthday')}
        placeholder={t('MM / DD / YYYY')}
        value={selectedDate}
        onOpenPickerPress={() => {
          analytics.trackTouchBirthdayInputFieldOnMatchmakingRegistrationScreen();
          setOpen(true);
          scrollViewRef?.current?.scrollToEnd({animated: true});
        }}
        error={datePickerError}
      />
      <FormPicker
        label={t('Location')}
        placeholder={t('Select_City')}
        showFlag={true}
        value={selectedCityData ? getName(selectedCityData) : ''}
        emoji={
          selectedCityData
            ? `${selectedCityData?.emoji}`
            : nodeEmoji.get('flag-us')
        }
        onOpenPickerPress={() => {
          analytics.trackTouchLocationInputFieldOnMatchmakingRegistrationScreen();
          setCityPickerOpen(true);
        }}
        topMargin={57}
      />
    </>
  );
  const renderDatePicker = () => (
    <AMDatePicker
      isVisible={open}
      currDate={date}
      setCurrDate={setDate}
      onDonePress={onDatePickerDonePress}
    />
  );
  const renderCityPicker = () => (
    <CitySelectionPopup
      isVisible={isCityPickerOpen}
      onCitySelected={onCitySelected}
      citiesData={citiesData}
      hidePopup={() => setCityPickerOpen(false)}
      getCitiesForQuery={getCitiesForQuery}
      loadMore={loadMore}
      meta={meta}
    />
  );
  const renderButton = () => (
    <JoinWaitListFormButton
      isDisabled={!isButtonEnabled()}
      onPress={goToReferFriend}
    />
  );
  return (
    <>
      <DarkBackgroundContainer>
        <AMHeaderBackButton />
        <ScrollContainer ref={scrollViewRef}>
          <SubContainer>
            {renderHeaderContent()}
            {renderBodyContent()}
            {renderButton()}
          </SubContainer>
          {renderDatePicker()}
        </ScrollContainer>
      </DarkBackgroundContainer>
      {renderCityPicker()}
    </>
  );
};

export default WaitlistFormScreen;
