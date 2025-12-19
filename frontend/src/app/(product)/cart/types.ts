interface ProductTagDTO {
  tag: string;
  icon: string;
}

export interface CartItemDTO {
  cart_product_id: string;
  cart_product_name: string;
  cart_product_image?: string;
  cart_product_tags: Array<ProductTagDTO>;
  cart_product_summary?: string;
  cart_product_description?: string;
  cart_product_quantity: number;
  cart_product_price_per_item: number;
  cart_product_item_price: number;
}
