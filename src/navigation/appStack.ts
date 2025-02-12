import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_TAB, HOME_TAB, LANDING_SCREEN} from './ScreenNames';
import {slideFromRight} from '../styles/commonsStyles';
import {colors} from '../styles/theme';
import Home from '../components/Home';
import HomeSelected from '../components/HomeSelected';
import HomeStack from '../navigation/HomeStack';
import LandingScreen from '../screens/LandingScreen';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

// Define Stack and Tab types
export type RootStackParamList = {
  [LANDING_SCREEN]: undefined;
  [APP_TAB]: undefined;
};

export type BottomTabParamList = {
  [HOME_TAB]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const screenOptions: NativeStackScreenProps<any> = {
  animation: 'slide_from_right',
};

const tabIcons = (tabName: keyof BottomTabParamList) => {
  return ({focused}: {focused: boolean}) => {
    switch (tabName) {
      case HOME_TAB:
        return focused ? <HomeSelected /> : <Home />;
      default:
        return null;
    }
  };
};

const AppTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_TAB}
      screenOptions={(): BottomTabNavigationOptions => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'none',
        },
        tabBarActiveTintColor: '#000', // Define active color
        tabBarInactiveTintColor: '#666', // Define inactive color
        headerShown: false,
        tabBarShowLabel: false, // Hide labels if not needed
      })}>
      <Tab.Screen
        name={HOME_TAB}
        component={HomeStack}
        options={{
          tabBarIcon: tabIcons(HOME_TAB),
          unmountOnBlur: true,
          tabBarLabel: HOME_TAB,
        }}
      />
    </Tab.Navigator>
  );
};

interface AppStackProps {
  initialRouteName: keyof RootStackParamList;
}

export default function AppStack({initialRouteName}: AppStackProps) {
  return (
    <RootStack.Navigator initialRouteName={initialRouteName}>
      <RootStack.Screen
        name={LANDING_SCREEN}
        component={LandingScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <RootStack.Screen
        name={APP_TAB}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          ...slideFromRight,
        }}>
        {props => <AppTab {...props} />}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
}
