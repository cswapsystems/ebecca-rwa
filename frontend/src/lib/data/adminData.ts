"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Admins
export const fetchAdmins = async () => {
  const { data: admins, errors } = await cookieBasedClient.models.Admin.list();

  if (errors) {
    console.error("Error fetching the list of admins", errors);
    throw new Error("Failed to fetch the list of admins");
  }

  return admins;
};

// Fetch Admins by Username
export const fetchAdminsByUsername = async (username: string) => {
  const { data: admins, errors } = await cookieBasedClient.models.Admin.listAdminByUsername({
    username: username,
  });

  if (errors) {
    console.error("Error fetching the list of admins using Username", errors);
    throw new Error("Failed to fetch the list of admins using Username");
  }

  return admins;
};

// Fetch Admins by Email Address
export const fetchAdminsByEmailAddress = async (emailAddress: string) => {
  const { data: admins, errors } = await cookieBasedClient.models.Admin.listAdminByEmailAddress({
    emailAddress: emailAddress,
  });

  if (errors) {
    console.error("Error fetching the list of admins using Email Address", errors);
    throw new Error("Failed to fetch the list of admins using Email Address");
  }

  return admins;
};


// Fetch Admin by Admin ID
export const fetchAdminByAdminId = async (adminId: string) => {
  const { data: admin, errors } = await cookieBasedClient.models.Admin.get({
    id: adminId,
  });

  if (errors) {
    console.error("Error fetching the admin using Admin ID", errors);
    throw new Error("Failed to fetch the admin using Admin ID");
  }

  return admin;
};
