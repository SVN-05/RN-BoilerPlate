import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast, {ToastConfig, ToastType} from 'react-native-toast-message';
import AppToast from '../components/AppToast/AppToast';
import {setNavigationRef} from '../utils/functions/navigation';
import {LANDING_SCREEN} from './ScreenNames';
import linking from '../linking/linking';
import {Linking} from 'react-native';
import AppStack from './appStack';

interface toastProp {
  text1?: string;
  text2?: string;
  type: ToastType;
}

const toastConfig: ToastConfig = {
  success: ({text1, text2, type}: toastProp) => (
    <AppToast text1={text1} text2={text2} type={type} />
  ),
  error: ({text1, text2, type}: toastProp) => (
    <AppToast text1={text1} text2={text2} type={type} />
  ),
};

export default function NavigationIndex() {
  useEffect(() => {
    interface DeepLinkEvent {
      url: string;
    }

    const handleDeepLink = async (event: DeepLinkEvent) => {
      try {
        const url = event?.url;
        if (url) {
          Linking.openURL(url);
        }
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    };

    const handleInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          handleDeepLink({url});
        }
      } catch (error) {
        console.error('Error getting initial URL:', error);
      }
    };

    handleInitialURL();

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={ref => setNavigationRef(ref)} linking={linking}>
      <AppStack initialRouteName={LANDING_SCREEN} />
      <Toast config={toastConfig} position={'bottom'} />
    </NavigationContainer>
  );
}
