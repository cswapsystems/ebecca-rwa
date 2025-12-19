import { Admin } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAdmins,
  fetchAdminsByUsername,
  fetchAdminsByEmailAddress,
  fetchAdminByAdminId,
} from "../data/adminData";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchAdmins: builder.query<Admin[], void>({
      queryFn: async () => {
        try {
          const admins = await fetchAdmins();

          return { data: admins };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of admins",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAdminsByUsername: builder.query<Admin[], string>({
      queryFn: async (username: string) => {
        try {
          const admins = await fetchAdminsByUsername(username);

          return { data: admins };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of admins using Username",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAdminsByEmailAddress: builder.query<Admin[], string>({
      queryFn: async (emailAddress: string) => {
        try {
          const admins = await fetchAdminsByEmailAddress(emailAddress);

          return { data: admins };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of admins using Email Address",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAdminByAdminId: builder.query<Admin | null, string>({
      queryFn: async (adminId: string) => {
        try {
          const admin = await fetchAdminByAdminId(adminId);

          return { data: admin };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the admin using Admin ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchAdminsQuery,
  useFetchAdminsByUsernameQuery,
  useFetchAdminsByEmailAddressQuery,
} = adminApi;
