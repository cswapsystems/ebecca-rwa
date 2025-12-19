import type { Schema } from "../../amplify/data/resource";

type SchemaModel<M extends keyof Schema> = Schema[M]["type"];

export type Admin = SchemaModel<"Admin">;
export type User = SchemaModel<"User">;
export type Category = SchemaModel<"Category">;
export type Subcategory = SchemaModel<"Subcategory">;
export type Tag = SchemaModel<"Tag">;
export type SubcategoryTag = SchemaModel<"SubcategoryTag">;
export type AssetType = SchemaModel<"AssetType">;
export type AssetField = SchemaModel<"AssetField">;
export type AssetMetadata = SchemaModel<"AssetMetadata">;
export type Asset = SchemaModel<"Asset">;
export type AssetFraction = SchemaModel<"AssetFraction">;
export type CartItem = SchemaModel<"CartItem">;
export type PaymentMethod = SchemaModel<"PaymentMethod">;
export type Order = SchemaModel<"Order">;
export type Transaction = SchemaModel<"Transaction">;
export type Notification = SchemaModel<"Notification">;
export type ActivityLog = SchemaModel<"ActivityLog">;
