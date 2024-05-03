import {
  HOME_TAB_ICON_FOCUSED,
  HOME_TAB_ICON_NON_FOCUSED,
  MATCHMAKING_TAB_FOCUSED,
  MATCHMAKING_TAB_NON_FOCUSED,
  PROFILE_TAB_FOCUSED,
  PROFILE_TAB_NON_FOCUSED,
} from '../../assets/svg/bottomTab';
import {SCREEN_NAME} from '../../enums';

export const useBottomTabBar = (navigation, analytics) => {
  const updateTracker = (name: string) => {
    switch (name) {
      case SCREEN_NAME.MatchMakingScreen:
        analytics.trackTouchMatchmakingItemOnTabBar();
        break;
      case SCREEN_NAME.HomeNavigator:
        analytics.trackTouchHomeItemOnTabBar();
        break;
      case SCREEN_NAME.ProfileScreen:
        analytics.trackTouchProfileItemOnTabBar();
        break;
    }
  };

  const onPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    updateTracker(route?.name);
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = (route: any) => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };
  const getTabIcon = (index: number, isFocused = false) => {
    let icon = HOME_TAB_ICON_FOCUSED;
    switch (index) {
      case 1:
        icon = isFocused ? HOME_TAB_ICON_FOCUSED : HOME_TAB_ICON_NON_FOCUSED;
        break;
      case 2:
        icon = isFocused
          ? MATCHMAKING_TAB_FOCUSED
          : MATCHMAKING_TAB_NON_FOCUSED;
        break;
      case 3:
        icon = isFocused ? PROFILE_TAB_FOCUSED : PROFILE_TAB_NON_FOCUSED;
        break;
      default:
        break;
    }
    return icon;
  };
  return {
    onPress,
    onLongPress,
    getTabIcon,
  };
};
