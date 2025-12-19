"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Users
export const fetchUsers = async () => {
  const { data: users, errors } = await cookieBasedClient.models.User.list();

  if (errors) {
    console.error("Error fetching the list of users", errors);
    throw new Error("Failed to fetch the list of users");
  }

  return users;
};

// Fetch Users by Username
export const fetchUsersByUsername = async (username: string) => {
  const { data: users, errors } = await cookieBasedClient.models.User.listUserByUsername({
    username: username,
  });

  if (errors) {
    console.error("Error fetching the list of users using Username", errors);
    throw new Error("Failed to fetch the list of users using Username");
  }

  return users;
};

// Fetch Users by Email Address
export const fetchUsersByEmailAddress = async (emailAddress: string) => {
  const { data: users, errors } = await cookieBasedClient.models.User.listUserByEmailAddress({
    emailAddress: emailAddress,
  });

  if (errors) {
    console.error("Error fetching the list of users using Email Address", errors);
    throw new Error("Failed to fetch the list of users using Email Address");
  }

  return users;
};

// Fetch User by User ID
export const fetchUserByUserId = async (userId: string) => {
  const { data: user, errors } = await cookieBasedClient.models.User.get({
    id: userId,
  });

  if (errors) {
    console.error("Error fetching the user using User ID", errors);
    throw new Error("Failed to fetch the user using User ID");
  }

  return user;
};

// Create User record in DynamoDB
export const createUser = async (email: string, fullName: string, userId: string) => {
  const { data: user, errors } = await cookieBasedClient.models.User.create({
    id: userId,
    emailAddress: email,
    username: email,
    fullName: fullName,
    isVerified: true,
    kycStatus: "NotSubmitted",
  });

  if (errors) {
    console.error("Error creating user record", errors);
    throw new Error("Failed to create user record in database");
  }

  return user;
};
