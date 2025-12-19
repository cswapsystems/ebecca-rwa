"use server";

import { SortDirection } from "@/types";
import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Notifications
export const fetchNotifications = async () => {
  const { data: notifications, errors } = await cookieBasedClient.models.Notification.list();

  if (errors) {
    console.error("Error fetching the list of notifications", errors);
    throw new Error("Failed to fetch the list of notifications");
  }

  return notifications;
};

// Fetch Notifications By Owner ID
export const fetchNotificationsByOwnerId = async (ownerId: string, topic?: string, sortDirection: SortDirection = "DESC") => {
  const inputs = { ownerId, topic } as const;

  const { data: notifications, errors } = topic
    ? await cookieBasedClient.models.Notification.listNotificationByOwnerIdAndTopicAndNotificationDate( // Grouped by Topic, Sorted by Notification Date
      inputs,
      { sortDirection: sortDirection },
    ) : await cookieBasedClient.models.Notification.listNotificationByOwnerIdAndNotificationDate( // Sorted by Notification Date
      { ownerId: ownerId },
      { sortDirection: sortDirection },
    );

  if (errors) {
    console.error("Error fetching the list of notifications using Owner ID", errors);
    throw new Error("Failed to fetch the list of notifications using Owner ID");
  }

  return notifications;
};

// Fetch Notification by Notification ID
export const fetchNotificationByNotificationId = async (notificationId: string) => {
  const { data: notification, errors } = await cookieBasedClient.models.Notification.get({
    id: notificationId,
  });

  if (errors) {
    console.error("Error fetching the notification using Notification ID", errors);
    throw new Error("Failed to fetch the notification using Notification ID");
  }

  return notification;
};
