"use server";

import { SortDirection } from "@/types";
import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Orders
export const fetchOrders = async () => {
  const { data: orders, errors } = await cookieBasedClient.models.Order.list();

  if (errors) {
    console.error("Error fetching the list of orders", errors);
    throw new Error("Failed to fetch the list of orders");
  }

  return orders;
};

// Fetch Orders by Owner ID
export const fetchOrdersByOwnerId = async (ownerId: string, sortDirection: SortDirection = "DESC") => {
  const { data: orders, errors } = await cookieBasedClient.models.Order.listOrderByOwnerIdAndOrderDate(
    { ownerId: ownerId },
    { sortDirection: sortDirection },
  );

  if (errors) {
    console.error("Error fetching the list of orders using Owner ID", errors);
    throw new Error("Failed to fetch the list of orders using Owner ID");
  }

  return orders;
};

// Fetch Order by Order ID
export const fetchOrderByOrderId = async (orderId: string) => {
  const { data: order, errors } = await cookieBasedClient.models.Order.get({
    id: orderId,
  });

  if (errors) {
    console.error("Error fetching the order using Order ID", errors);
    throw new Error("Failed to fetch the order using Order ID");
  }

  return order;
};
