import { ActivityLog, SortDirection } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchActivityLogs,
  fetchActivityLogsByOwnerId,
  fetchActivityLogByActivityLogId,
} from "../data/activityLogData";

export const activityLogApi = createApi({
  reducerPath: "activityLogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchActivityLogs: builder.query<ActivityLog[], void>({
      queryFn: async () => {
        try {
          const activityLogs = await fetchActivityLogs();

          return { data: activityLogs };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of activity logs",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchActivityLogsByOwnerId: builder.query<ActivityLog[], { ownerId: string; recordType?: string; sortDirection?: SortDirection }>({
      queryFn: async ({ ownerId, recordType, sortDirection }) => {
        try {
          const activityLogs = await fetchActivityLogsByOwnerId(ownerId, recordType, sortDirection);

          return { data: activityLogs };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of activity logs using Owner ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchActivityLogByActivityLogId: builder.query<ActivityLog | null, string>({
      queryFn: async (activityLogId: string) => {
        try {
          const activityLog = await fetchActivityLogByActivityLogId(activityLogId);

          return { data: activityLog };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the activity log using Activity Log ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchActivityLogsQuery,
  useFetchActivityLogsByOwnerIdQuery,
  useFetchActivityLogByActivityLogIdQuery,
} = activityLogApi;
