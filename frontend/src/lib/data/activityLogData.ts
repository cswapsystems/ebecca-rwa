"use server";

import { SortDirection } from "@/types";
import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Activity Logs
export const fetchActivityLogs = async () => {
  const { data: activityLogs, errors } = await cookieBasedClient.models.ActivityLog.list();

  if (errors) {
    console.error("Error fetching the list of activity logs", errors);
    throw new Error("Failed to fetch the list of activity logs");
  }

  return activityLogs;
};

// Fetch Activity Logs by Owner ID
export const fetchActivityLogsByOwnerId = async (ownerId: string, recordType?: string, sortDirection: SortDirection = "DESC") => {
  const inputs = { ownerId, recordType } as const;

  const { data: activityLogs, errors } = recordType
    ? await cookieBasedClient.models.ActivityLog.listActivityLogByOwnerIdAndRecordTypeAndTimestamp( // Grouped by Record Type, Sorted by Timestamp
      inputs,
      { sortDirection: sortDirection },
    ) : await cookieBasedClient.models.ActivityLog.listActivityLogByOwnerIdAndTimestamp( // Sorted by Timestamp
      { ownerId: ownerId },
      { sortDirection: sortDirection },
    );

  if (errors) {
    console.error("Error fetching the list of activity logs using Owner ID", errors);
    throw new Error("Failed to fetch the list of activity logs using Owner ID");
  }

  return activityLogs;
};

// Fetch Activity Log by Activity Log ID
export const fetchActivityLogByActivityLogId = async (activityLogId: string) => {
  const { data: activityLog, errors } = await cookieBasedClient.models.ActivityLog.get({
    id: activityLogId,
  });

  if (errors) {
    console.error("Error fetching the activity log using Activity Log ID", errors);
    throw new Error("Failed to fetch the activity log using Activity Log ID");
  }

  return activityLog;
};
