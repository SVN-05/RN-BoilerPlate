import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {slideFromRight} from '../styles/commonsStyles';
import {LANDING_SCREEN, APP_TAB, HOME_TAB, HOME_SCREEN} from './ScreenNames';
import LandingScreen from '../screen/auth/LandingScreen/LandingScreen';
import HomeScreen from '../screen/app/BottomTab/Home/HomeScreen/HomeScreen';

// Define Stack and Tab types
export type RootStackParamList = {
  [LANDING_SCREEN]: undefined;
  [APP_TAB]: undefined;
};

export type BottomTabParamList = {
  [HOME_TAB]: undefined;
};

interface AppStackProps {
  initialRouteName: keyof RootStackParamList;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const screenOptions: NativeStackNavigationOptions = {
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

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={HOME_SCREEN}
      screenOptions={screenOptions}>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: true,
          header: props => <AppHeader {...props} />,
          ...slideFromRight,
        }}
      />
    </Stack.Navigator>
  );
};

const AppTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_TAB}
      screenOptions={(): BottomTabNavigationOptions => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '',
        },
        tabBarActiveTintColor: '', // Define active color
        tabBarInactiveTintColor: '', // Define inactive color
        headerShown: false,
      })}>
      <Tab.Screen
        name={HOME_TAB}
        component={HomeStack}
        options={{
          tabBarIcon: tabIcons(HOME_TAB),
          tabBarLabel: HOME_TAB,
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppStack({initialRouteName}: AppStackProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}>
      <Stack.Screen
        name={LANDING_SCREEN}
        component={LandingScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={APP_TAB}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          ...slideFromRight,
        }}>
        {props => <AppTab {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
