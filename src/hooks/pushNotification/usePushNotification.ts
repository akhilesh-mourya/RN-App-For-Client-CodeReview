import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export const usePushNotification = () => {
  const [allNotificationEnabled, setAllNotificationEnabled] = useState(true);
  const [newMessageEnabled, setNewMessageEnabled] = useState(true);
  const [newAnalysisEnabled, setNewAnalysisEnabled] = useState(true);
  const [updateEnabled, setUpdateEnabled] = useState(true);

  const navigation = useNavigation();
  const redirectToPreviousScreen = () => {
    navigation.goBack();
  };

  const onSwitchAllNotification = (value: boolean) => {
    setAllNotificationEnabled(value);
  };

  const onSwitchNewMessage = (value: boolean) => {
    setNewMessageEnabled(value);
  };

  const onSwitchNewAnalysis = (value: boolean) => {
    setNewAnalysisEnabled(value);
  };

  const onSwitchUpdate = (value: boolean) => {
    setUpdateEnabled(value);
  };

  return {
    allNotificationEnabled,
    newMessageEnabled,
    newAnalysisEnabled,
    updateEnabled,
    onSwitchAllNotification,
    onSwitchNewMessage,
    onSwitchNewAnalysis,
    onSwitchUpdate,
    redirectToPreviousScreen,
  };
};
