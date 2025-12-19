"use server";

import { SortDirection } from "@/types";
import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Transactions
export const fetchTransactions = async () => {
  const { data: transactions, errors } = await cookieBasedClient.models.Transaction.list();

  if (errors) {
    console.error("Error fetching the list of transactions", errors);
    throw new Error("Failed to fetch the list of transactions");
  }

  return transactions;
};

// Fetch Transactions by Order ID
export const fetchTransactionsByOrderId = async (orderId: string, sortDirection: SortDirection = "DESC") => {
  const { data: transactions, errors } = await cookieBasedClient.models.Transaction.listTransactionByOrderIdAndTransactionDate(
    { orderId: orderId },
    { sortDirection: sortDirection },
  );

  if (errors) {
    console.error("Error fetching the list of transactions using Order ID", errors);
    throw new Error("Failed to fetch the list of transactions using Order ID");
  }

  return transactions;
};

// Fetch Transactions by Owner ID
export const fetchTransactionsByOwnerId = async (ownerId: string, orderId?: string, sortDirection: SortDirection = "DESC") => {
  const inputs = { ownerId, orderId } as const;

  const { data: transactions, errors } = orderId
    ? await cookieBasedClient.models.Transaction.listTransactionByOwnerIdAndOrderIdAndTransactionDate( // Grouped by Order ID, Sorted by Transaction Date
      inputs,
      { sortDirection: sortDirection },
    ) : await cookieBasedClient.models.Transaction.listTransactionByOwnerIdAndTransactionDate( // Sorted by Transaction Date
      { ownerId: ownerId },
      { sortDirection: sortDirection },
    );

  if (errors) {
    console.error("Error fetching the list of transactions using Owner ID", errors);
    throw new Error("Failed to fetch the list of transactions using Owner ID");
  }

  return transactions;
};

// Fetch Transaction by Transaction ID
export const fetchTransactionByTransactionId = async (transactionId: string) => {
  const { data: transaction, errors } = await cookieBasedClient.models.Transaction.get({
    id: transactionId,
  });

  if (errors) {
    console.error("Error fetching the transaction using Transaction ID", errors);
    throw new Error("Failed to fetch the transaction using Transaction ID");
  }

  return transaction;
};
