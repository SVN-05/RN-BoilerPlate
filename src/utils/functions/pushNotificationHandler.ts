import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {isAndroid} from '../../constants/constants';

type NotificationMessage = {
  collapseKey?: string;
  userInteraction?: boolean;
  notification?: {
    android?: {imageUrl?: string};
    title?: string;
    body?: string;
  };
  messageId?: string;
  channelId?: string;
  bigPictureUrl?: string;
  id?: string;
  title?: string;
  message?: string;
};

export const triggerLocalNotifications = (
  message: NotificationMessage | null,
) => {
  if (message) {
    const {
      collapseKey,
      notification,
      messageId,
      channelId,
      bigPictureUrl,
      id,
      title,
      message: notificationMsg,
    } = message;
    const {android, title: nTitle, body} = notification || {};
    const {imageUrl} = android || {};

    if (isAndroid) {
      PushNotification.localNotification({
        channelId: channelId ?? collapseKey, // Required for Android
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        bigPictureUrl: bigPictureUrl ?? imageUrl,
        bigLargeIcon: 'ic_launcher',

        id: id ?? messageId,
        title: title ?? nTitle,
        message: notificationMsg ?? body ?? '',
        playSound: true,
        soundName: 'default',
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: id ?? messageId ?? 'default_id',
        title: title ?? nTitle ?? '',
        body: notificationMsg ?? body ?? '',
      });
    }
  }
};

export const pushNotificationHandler = () => {
  PushNotification.configure({
    onRegister: ({token}: {token: string}) => {
      console.log('TOKEN:', token);
    },
    onNotification: (notification: NotificationMessage | null) => {
      console.log('NOTIFICATION:', notification);
      if (notification?.userInteraction === false) {
        triggerLocalNotifications(notification as NotificationMessage);
      }
    },
    onAction: (notification: any) => {
      console.log('ACTION:', notification?.action);
      console.log('NOTIFICATION:', notification);
    },
    onRegistrationError: (err: any) => {
      console.error(err?.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'com.invest_school',
      channelName: 'Invest_School',
    },
    (created: boolean) => console.log(`createChannel returned '${created}'`),
  );
};
