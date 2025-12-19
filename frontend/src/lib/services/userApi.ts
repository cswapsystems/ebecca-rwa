import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchUsers,
  fetchUsersByUsername,
  fetchUsersByEmailAddress,
  fetchUserByUserId,
} from "../data/userData";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const users = await fetchUsers();

          return { data: users };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of users",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchUsersByUsername: builder.query<User[], string>({
      queryFn: async (username: string) => {
        try {
          const users = await fetchUsersByUsername(username);

          return { data: users };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of users using Username",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchUsersByEmailAddress: builder.query<User[], string>({
      queryFn: async (emailAddress: string) => {
        try {
          const users = await fetchUsersByEmailAddress(emailAddress);

          return { data: users };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of users using Email Address",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchUserByUserId: builder.query<User | null, string>({
      queryFn: async (userId: string) => {
        try {
          const user = await fetchUserByUserId(userId);

          return { data: user };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the user using User ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUsersByUsernameQuery,
  useFetchUsersByEmailAddressQuery,
  useFetchUserByUserIdQuery,
} = userApi;
