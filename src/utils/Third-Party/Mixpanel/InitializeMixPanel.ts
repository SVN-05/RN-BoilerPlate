import {Mixpanel} from 'mixpanel-react-native';
import {mixpanel_property_names} from './data.ts';
import {getDeviceType} from 'react-native-device-info';
import {Platform} from 'react-native';
import {APP_ENVIRONMENT, appVersion} from '../../../constants/constants';

let mixpanel: Mixpanel | undefined; // Declare mixpanel globally so it can be exported

export const initializeMixPanel = () => {
  try {
    const trackAutomaticEvents = true; // disable legacy autotrack mobile events
    const optOutTrackingDefault = true; // opt users into tracking by default

    // If mixpanel is already initialized, return early
    if (mixpanel) {
      return;
    }

    // Create an instance of Mixpanel using your project token and the configuration options above
    mixpanel = new Mixpanel(
      '', // Project Token
      trackAutomaticEvents,
      optOutTrackingDefault,
    );

    // Initialize Mixpanel
    mixpanel.init();
  } catch (e) {
    console.error('Error in initializing mixpanel:', e);
  }
};

export const trackMixpanel = (name: string, obj: object) => {
  try {
    mixpanel?.track(name, obj);
  } catch (e) {
    console.error('Error in tracking mixPanel:', e);
  }
};

interface SuperProperties {
  [key: string]: any;
}

export const registerSuperPropertiesMixpanel = (obj: SuperProperties): void => {
  try {
    mixpanel?.registerSuperProperties(obj);
  } catch (e) {
    console.error('Error in setting super properties in mixPanel:', e);
  }
};

export const defaultSuperProperties = (phone_number: string) => {
  const device_type = getDeviceType();
  const platform = Platform.OS;

  const obj = {
    [mixpanel_property_names.phone_number]: phone_number,
    [mixpanel_property_names.device_type]: device_type,
    [mixpanel_property_names.platform]: platform,
    [mixpanel_property_names.app_version]: appVersion,
    [mixpanel_property_names.enviroinment]: APP_ENVIRONMENT,
  };
  registerSuperPropertiesMixpanel(obj);
};

export const resetMixPanel = () => {
  try {
    mixpanel?.reset();
  } catch (e) {
    console.error('Error in resetting mixpanel:', e);
  }
};
