import * as Notifications from 'expo-notifications';
import type { NOTIFICATION_TYPE } from '../models';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const addNotificationListener = (callback: (notification: Notifications.NotificationResponse) => void) => {
  const subscription = Notifications.addNotificationResponseReceivedListener(callback);

  return () => {
    subscription.remove();
  };
};

export const grantPermissions = async () => {
  const settings = await Notifications.getPermissionsAsync();

  if (settings.granted) {
    return settings.granted;
  }

  const r = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true, allowAnnouncements: true },
  });

  return r.granted;
};

export const scheduleNotification = async (props: {
  title?: string;
  body?: string;
  type: NOTIFICATION_TYPE;
  date: number; // unix timestamp [seconds]
}) => {
  const hasPermission = await grantPermissions();

  if (!hasPermission) {
    return;
  }

  // 既に登録されている予約通知をキャンセルする
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: props.title,
      body: props.body,
      data: {
        type: props.type,
      },
    },
    trigger: { date: new Date(props.date * 1000) } as Notifications.DateTriggerInput,
  });
};
