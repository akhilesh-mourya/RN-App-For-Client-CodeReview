import React, {FC, useEffect, useRef} from 'react';
import {
  SubContainer,
  HeaderTitle,
  RawFullFlexView,
  ButtonContainerView,
  ScrollContainer,
  HeaderRowView,
  BackTouchable,
  BackArrow,
  HeaderTitleLabel,
} from './styles';
import AMPrimaryButton from '../../components/button/AMPrimaryButton';
import {Keyboard} from 'react-native';
import {DarkBackgroundContainer} from '../../components/screenBackground/GradientBackgroundContainer';
import {AMInputNew} from '../../components/input/AMInput';
import {PrimaryButtonType} from '../../constants/enums';
import {useEditRelationshipName} from '../../hooks/relationship/useEditRelationshipName';
import {useAnalytics} from '../../services/analytics';

const EditRelationshipNameScreen: FC<{}> = ({route}) => {
  const firstNameInputRef = useRef<any>();

  const {
    name,
    setName,
    t,
    nameInputFocused,
    setNameFocus,
    onSavePress,
    isButtonActive,
    onBackPress,
  } = useEditRelationshipName();
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackViewEditRelationshipScreen(route.params.relationShipData.id);

    setTimeout(() => {
      firstNameInputRef?.current?.focus();
    }, 500);
  }, []);

  const renderHeaderContent = () => (
    <>
      <HeaderRowView>
        <BackTouchable onPress={onBackPress}>
          <BackArrow />
        </BackTouchable>
        <HeaderTitleLabel>{t('Edit_Name')}</HeaderTitleLabel>
      </HeaderRowView>
      <HeaderTitle>{t('Edit_Name_Header_Title')}</HeaderTitle>
    </>
  );
  const renderBodyContent = () => (
    <>
      <AMInputNew
        setRef={firstNameInputRef}
        isFocused={nameInputFocused}
        isFilled={name?.length > 0}
        inputValue={name}
        onTextChange={text => setName(text)}
        inputPlaceholder={t('Name')}
        onFocus={() => setNameFocus(true)}
        onBlur={() => setNameFocus(false)}
        autoCapitalize={'words'}
        autoComplete={'name'}
        maxLength={25}
      />
    </>
  );
  const renderBottomButtonView = () => (
    <ButtonContainerView>
      <ScrollContainer>
        <AMPrimaryButton
          buttonType={PrimaryButtonType.FullButton}
          label={t('Save')}
          onPress={onSavePress}
          isDisabled={!isButtonActive}
        />
      </ScrollContainer>
    </ButtonContainerView>
  );
  return (
    <DarkBackgroundContainer>
      <SubContainer onPress={() => Keyboard.dismiss()}>
        <RawFullFlexView>
          {renderHeaderContent()}
          {renderBodyContent()}
        </RawFullFlexView>
        {renderBottomButtonView()}
      </SubContainer>
    </DarkBackgroundContainer>
  );
};

export default EditRelationshipNameScreen;
