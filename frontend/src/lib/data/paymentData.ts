"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Payment Methods
export const fetchPaymentMethods = async () => {
  const { data: paymentMethods, errors } = await cookieBasedClient.models.PaymentMethod.list();

  if (errors) {
    console.error("Error fetching the list of payment methods", errors);
    throw new Error("Failed to fetch the list of payment methods");
  }

  return paymentMethods;
};

// Fetch Payment Methods by Owner ID
export const fetchPaymentMethodsByOwnerId = async (ownerId: string) => {
  const { data: paymentMethods, errors } = await cookieBasedClient.models.PaymentMethod.listPaymentMethodByOwnerId({
    ownerId: ownerId,
  });

  if (errors) {
    console.error("Error fetching the list of payment methods using Owner ID", errors);
    throw new Error("Failed to fetch the list of payment methods using Owner ID");
  }

  return paymentMethods;
};

// Fetch Payment Method by Payment Method ID
export const fetchPaymentMethodByPaymentMethodId = async (paymentMethodId: string) => {
  const { data: paymentMethod, errors } = await cookieBasedClient.models.PaymentMethod.get({
    id: paymentMethodId,
  });

  if (errors) {
    console.error("Error fetching the payment method using Payment Method ID", errors);
    throw new Error("Failed to fetch the payment method using Payment Method ID");
  }

  return paymentMethod;
};
