import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useLoader} from '../loader/useLoader';
import {ErroPopupType} from '../../enums';
import {Keyboard} from 'react-native';
import {EditRelationshipReqData} from '../../../@types/common';
import {useMutation} from 'react-query';
import {editRelationship} from '../../apiServices/main';
import useRelationshipData from '../context/useRelationships';
import {MixpanelData} from '../../constants/enums';
import {getEachFirstLetterCapitalize} from '../../utility';
import {useAnalytics} from '../../services/analytics';

export const useEditRelationshipName = () => {
  const {t} = useTranslation();
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const {relationShipData} = params;
  const {
    showErrorMessage,
    hideLoaderAndShowErrorMessage,
    showLoader,
    hideLoader,
  } = useLoader();
  const [name, setName] = useState(
    getEachFirstLetterCapitalize(relationShipData?.name),
  );
  const [nameInputFocused, setNameFocus] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);
  const {setMyRelationshipsList, myRelationshipsList} = useRelationshipData();
  const {mutateAsync: updateRelationshipMutate} = useMutation(
    (requestBody: EditRelationshipReqData) => editRelationship(requestBody),
  );
  const analytics = useAnalytics();

  useEffect(() => {
    if (name) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [name]);

  const onConfirmSave = () => {
    showLoader();
    const updateReqData = {
      name: name,
      relationshipId: relationShipData?.id,
    };
    updateRelationshipMutate(updateReqData)
      .then(response => {
        const relationData = myRelationshipsList?.map(item => {
          if (item.id === response?.data?.id) {
            const itemArray = {
              ...item,
              name: response?.data?.name,
            };
            return itemArray;
          }
          return item;
        });
        setMyRelationshipsList(relationData);
        hideLoader();
        goBack();
      })
      .catch(error => {
        hideLoaderAndShowErrorMessage(error, t('OK'));
      });
  };

  const onSavePress = () => {
    analytics.trackTouchSaveButtonOnEditRelationshipScreen(
      relationShipData.id,
      name,
    );

    Keyboard.dismiss();
    if (name.length < 2) {
      showErrorMessage({
        errorMessage: 'Relationship name can not be less than 2 characters.',
        errorPopupType: ErroPopupType.OnlyError,
      });
      return;
    }

    if (name.length > 25) {
      showErrorMessage({
        errorMessage: 'Relationship name can not be more than 25 characters.',
        errorPopupType: ErroPopupType.OnlyError,
      });
      return;
    }

    onConfirmSave();
  };

  const onBackPress = () => {
    if (name.length >= 2 && relationShipData?.name !== name) {
      showErrorMessage({
        errorMessage: t('Relationship_Name_Change_Alert'),
        errorPopupType: ErroPopupType.ErrorWithCancelButton,
        onSuccessCallBack: () => {
          analytics.trackTouchYesButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen(
            relationShipData.id,
            name,
          );
          onConfirmSave();
        },
        onCancelCallBack: () => {
          analytics.trackTouchDontSaveButtonOnSaveRelationshipConfirmationPopupOnEditRelationshipScreen(
            relationShipData.id,
            name,
          );
          goBack();
        },
        okButtonLable: t('Save'),
      });
    } else {
      goBack();
    }
  };

  return {
    name,
    onSavePress,
    setName,
    t,
    nameInputFocused,
    setNameFocus,
    isButtonActive,
    setButtonActive,
    onBackPress,
  };
};
