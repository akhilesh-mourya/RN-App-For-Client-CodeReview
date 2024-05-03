import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '../../enums';
import {t} from 'i18next';
import useAuth from '../context/useAuth';
import {useAnalytics} from '../../services/analytics';

export const useMyRelationshipProfile = () => {
  const navigation = useNavigation();
  const {authContextData} = useAuth();
  const userData = authContextData?.userData;
  const gender = userData?.gender ?? '--';
  const genderInterest = userData?.genderInterest ?? '--';
  const relationshipStatus = userData?.relationshipStatus ?? '--';
  const relationshipGoal = userData?.relationshipGoal ?? '--';
  const analytics = useAnalytics();
  const redirectToNextScreen = (type: number) => {
    switch (type) {
      case 1:
        analytics.trackTouchMyBasicsCardOnMyRelationshipProfileScreen();
        const updateQuestionnaire = {
          ...authContextData?.questionnaire,
          gender: userData?.gender || '',
          genderInterest: userData?.genderInterest || '',
          relationshipStatus: userData?.relationshipStatus,
          relationshipType: userData?.relationshipGoal,
        };
        authContextData?.setQuestionnaire(updateQuestionnaire);
        navigation?.navigate(SCREEN_NAME.FillQuestionnaireScreen);
        break;
    }
  };

  const redirectToPreviousScreen = () => {
    navigation.goBack();
  };

  const getIconTitle = (type: number) => {
    switch (type) {
      case 1:
        return t('Relationship_Basic_Icon');
      case 2:
        return t('Relationship_Preference_Icon');
      case 3:
        return t('Relationship_Personality_Icon');
      case 4:
        return t('Relationship_LoveLanguage_Icon');
      case 5:
        return t('Relationship_Dealbreaker_Icon');
      default:
        return '';
    }
  };
  return {
    redirectToNextScreen,
    redirectToPreviousScreen,
    getIconTitle,
    gender,
    genderInterest,
    relationshipStatus,
    relationshipGoal,
  };
};
