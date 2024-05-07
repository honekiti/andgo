import * as Notifications from 'expo-notifications';
import type { NOTIFICATION_TYPE } from '../models';
import { logFactory } from '../utils/logger';

const logger = logFactory('notification-service');

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

export const cancelScheduledNotification = async (notificationId: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (e) {
    logger.error({ msg: 'notification cancel failed', errMsg: (e as Error).message });
  }
};

export const scheduleNotification = async (props: {
  title?: string;
  body?: string;
  type: NOTIFICATION_TYPE;
  dateInUtc: number; // unix timestamp [milli seconds]
}): Promise<string | undefined> => {
  const hasPermission = await grantPermissions();

  if (!hasPermission) {
    return;
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: props.title,
      body: props.body,
      data: {
        type: props.type,
      },
    },
    // 1000ms程度遅らせないとエラーになる
    trigger: { date: new Date(props.dateInUtc + 1000) } as Notifications.DateTriggerInput,
  });

  return notificationId;
};
