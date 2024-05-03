import React from 'react';
import {TabContainer, TabIcon, TabItem} from './styles';
import {useBottomTabBar} from '../../hooks/navigation/useBottomTabBar';

interface AMBottomTabBarProps {
  state?: any;
  descriptors: any;
  navigation?: any;
  analytics?: any;
}

const AMBottomTabBar: React.FC<AMBottomTabBarProps> = React.memo(
  ({state, descriptors, navigation, analytics}) => {
    const {getTabIcon, onPress, onLongPress} = useBottomTabBar(
      navigation,
      analytics,
    );
    return (
      <TabContainer>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          return (
            <TabItem
              key={route.key}
              isFocused={isFocused}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() => onPress(route, isFocused)}
              onLongPress={() => onLongPress(route)}>
              <TabIcon xml={getTabIcon(index + 1, isFocused)} />
            </TabItem>
          );
        })}
      </TabContainer>
    );
  },
);

export default AMBottomTabBar;
