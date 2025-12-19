import { Notification, SortDirection } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchNotifications,
  fetchNotificationsByOwnerId,
  fetchNotificationByNotificationId,
} from "../data/notificationData";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchNotifications: builder.query<Notification[], void>({
      queryFn: async () => {
        try {
          const notifications = await fetchNotifications();

          return { data: notifications };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of notifications",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchNotificationsByOwnerId: builder.query<Notification[], { ownerId: string; topic?: string; sortDirection?: SortDirection }>({
      queryFn: async ({ ownerId, topic, sortDirection }) => {
        try {
          const notifications = await fetchNotificationsByOwnerId(ownerId, topic, sortDirection);

          return { data: notifications };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of notifications using Owner ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchNotificationByNotificationId: builder.query<Notification | null, string>({
      queryFn: async (notificationId: string) => {
        try {
          const notification = await fetchNotificationByNotificationId(notificationId);

          return { data: notification };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the notification using Notification ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchNotificationsQuery,
  useFetchNotificationsByOwnerIdQuery,
  useFetchNotificationByNotificationIdQuery,
} = notificationApi;
