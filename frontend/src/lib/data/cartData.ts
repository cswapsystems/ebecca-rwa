"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Cart Items
export const fetchCartItems = async () => {
  const { data: cartItems, errors } = await cookieBasedClient.models.CartItem.list();

  if (errors) {
    console.error("Error fetching the list of cart items", errors);
    throw new Error("Failed to fetch the list of cart items");
  }

  return cartItems;
};

// Fetch Cart Item by Owner ID and Asset ID
export const fetchCartItemByOwnerIdAndAssetId = async (ownerId: string, assetId: string) => {
  const { data: cartItem, errors } = await cookieBasedClient.models.CartItem.get({
    ownerId: ownerId,
    assetId: assetId,
  });

  if (errors) {
    console.error("Error fetching the cart item using Owner ID and Asset ID", errors);
    throw new Error("Failed to fetch the cart item using Owner ID and Asset ID");
  }

  return cartItem;
};
