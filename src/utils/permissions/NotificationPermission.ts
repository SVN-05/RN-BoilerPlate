import {Platform, PermissionsAndroid} from 'react-native';
import {requestNotifications} from 'react-native-permissions';

export async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    // Handle Android 13+ notification permission
    if (Platform.Version >= 33) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // For older Android versions, notification permission is automatically granted
      return true;
    }
  } else if (Platform.OS === 'ios') {
    const status = await requestNotifications(['alert', 'sound']);
    if (status?.status === 'granted') {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
