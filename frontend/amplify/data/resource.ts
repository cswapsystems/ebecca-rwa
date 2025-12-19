import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Admin: a
    .model({
      id: a.id().required(),
      emailAddress: a.email().required(),
      username: a.string().required(),
      fullName: a.string().required(),
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [index("emailAddress"), index("username")])
    .authorization((allow) => [allow.groups(["Admin"]).to(["create", "read", "update", "delete"])]),

  User: a
    .model({
      id: a.id().required(),
      emailAddress: a.email().required(),
      username: a.string().required(),
      fullName: a.string().required(),
      isVerified: a.boolean().default(false).required(),
      kycStatus: a.enum(["NotSubmitted", "Pending", "Approved", "Rejected"]),
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [index("emailAddress"), index("username")])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["read", "update", "delete"]),
      allow.owner().to(["read", "update"]),
    ]),

  Category: a
    .model({
      categoryId: a.string().required(),
      categoryName: a.string().required(), // Display Name
      categoryCode: a.string().required(), // Human-readable code for internal clients
      image: a.string().required(),
      description: a.string(),
    })
    .identifier(["categoryId"])
    .secondaryIndexes((index) => [index("categoryCode")])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),

  Subcategory: a
    .model({
      subcategoryId: a.string().required(),
      subcategoryName: a.string().required(), // Display Name
      subcategoryCode: a.string().required(), // Human-readable code for internal clients
      categoryId: a.string().required(), // Reference to Category
      image: a.string().required(),
      description: a.string(),
    })
    .identifier(["subcategoryId"])
    .secondaryIndexes((index) => [index("categoryId"), index("subcategoryCode")])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),

  Tag: a
    .model({
      tagId: a.string().required(),
      tagName: a.string().required(), // Display Name
    })
    .identifier(["tagId"])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),

  // Join Model for Subcategory and Tag for easier querying
  SubcategoryTag: a
    .model({
      subcategoryId: a.string().required(), // Reference to Subcategory
      tagId: a.string().required(), // Reference to Tag
      tagName: a.string().required(),
    })
    .identifier(["subcategoryId", "tagId"])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),

  AssetType: a
    .model({
      assetTypeId: a.string().required(),
      assetTypeName: a.string().required(), // Display Name
      categoryId: a.string(), // Reference to Category
      subcategoryId: a.string(), // Reference to Subcategory
      icon: a.string(),
      active: a.boolean().default(true),
      fieldDefinitions: a.json(),
      /*
        [
          {
            "section": "left" | "right",
            "layout": "one-column" | "two-column",
            "column": number | null,
            "fields": [
              Asset_Field_1,
              Asset_Field_2, ...
            ],
          }, ...
        ]
      */
    })
    .identifier(["assetTypeId"])
    .secondaryIndexes((index) => [index("categoryId"), index("subcategoryId")])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),

  AssetField: a
    .model({
      id: a.id().required(),
      assetTypeId: a.string().required(), // Reference to Asset Type
      type: a.string().default("text").required(), // Type: text, number, email, checkbox, radio, select, file
      label: a.string(),
      maxFileCount: a.integer(), // For uploads
      options: a.json(), // For dropdowns
      /*
        [
          { label: 'Fractionalize', value: 'fractionalize' },
          { label: 'Liquidate', value: 'liquidate' },
          { label: 'Combine', value: 'combine' }, ...
        ]
      */
    })
    .identifier(["id"])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),

  AssetMetadata: a
    .model({
      id: a.id().required(),
      metadataKey: a.string().required(), // Examples: "Karat", "Origin", "Grams", "Type"
      metadataValue: a.string().required(), // Examples: "24K",   "Saudi",  "100g",  "Yellow Gold"
      assetFieldId: a.id().required(), // Reference to Asset Field ("AssetMetadata.metadataKey" should always match with its corresponding "AssetField.label")
      assetId: a.id().required(), // Reference to Asset
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [index("assetId")])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read", "create", "update"]),
      allow.guest().to(["read", "create", "update"]),
    ]),

  Asset: a
    .model({
      id: a.id().required(),
      name: a.string().required(), // Display Name
      price: a.json().required(),
      /*
        [
          { "amount": 100, "currency": "USD", },
          { "amount": 500, "currency": "ADA", }, ...
        ]
      */
      categoryId: a.string().required(), // Reference to Category
      subcategoryId: a.string().required(), // Reference to Subcategory
      assetTypeId: a.string().required(), // Reference to Asset Type
      tags: a.json().required(),
      /*
        [
          { "tagId": "Tag_ID_1", "tagName": "Tag Name 1" },
          { "tagId": "Tag_ID_2", "tagName": "Tag Name 2" }, ...
        ]
      */
      images: a.string().array().required(),
      description: a.string(),
      highlights: a.string().array(),
      featured: a.boolean().default(false),
      status: a.enum(["Active", "Inactive", "Fractionalized", "Fraction"]),
      assetId: a.string(), // On-chain Asset Policy ID + Asset Name
      assetPolicyId: a.string(), // On-chain Asset Policy ID
      assetName: a.string(), // On-chain Asset Name
      mintingStatus: a.enum(["InProgress", "Success", "Failed", "Rejected", "Cancelled"]),
      mintingResult: a.string(),
      mintingTxHash: a.string(),
      isFractionalized: a.boolean(), // Is asset fractionalized?
      totalFractions: a.integer(), // Total number of fractions created (Example: 12)
      fractionSequence: a.integer(), // Which fraction does the asset represent (Example: 3 of 12)
      parentAssetId: a.id(), // If asset is fractionalized, reference to the Parent Asset
      ownerId: a.id(), // Reference to User
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [
      index("categoryId"),
      index("subcategoryId"),
      index("assetTypeId"),
      index("parentAssetId"),
      index("ownerId"),
    ])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.authenticated().to(["read", "create", "update"]),
      allow.guest().to(["read", "create", "update"]),
    ]),

  AssetFraction: a
    .model({
      id: a.id().required(),
      totalFractions: a.integer().required(), // Total number of fractions created (Example: 12)
      fractionSequence: a.integer().required(), // Which fraction does the asset represent (Example: 3 of 12)
      parentAssetId: a.id().required(), // Parent Asset
      ownerId: a.id().required(), // Reference to User
      fractionalizationDate: a.datetime().required(),
      action: a.enum(["Minted", "Fractionalized", "Recombined"]),
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [index("parentAssetId").sortKeys(["fractionalizationDate"]), index("ownerId")])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["read"]),
    ]),

  CartItem: a
    .model({
      ownerId: a.id().required(), // Reference to User
      assetId: a.id().required(), // Reference to Asset
      name: a.string().required(), // Denormalized for quick access
      currency: a.string().required(),
      price: a.float().required(), // Denormalized for quick access
      quantity: a.integer().required(),
      total: a.float().required(),
      image: a.string(), // Denormalized for quick access
    })
    .identifier(["ownerId", "assetId"])
    .authorization((allow) => [allow.owner()]),

  PaymentMethod: a
    .model({
      id: a.id().required(),
      ownerId: a.id().required(), // Reference to User
      type: a.enum(["CardanoWallet", "Mastercard", "Visa", "PayPal"]),
      isDefault: a.boolean().default(false),
      nickname: a.string(), // User-defined nickname (Example: "My AmericanExpress Card")
      identifier: a.string(), // Wallet Address, Masked Card Number, PayPal Email, etc.
      expiry: a.string(), // For Mastercard and Visa
      metadata: a.json(), // For Cardano Wallets
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [index("ownerId")])
    .authorization((allow) => [allow.owner()]),

  Order: a
    .model({
      id: a.id().required(),
      ownerId: a.id().required(), // Reference to User
      cartItems: a.json().required(),
      /*
        [
          {
            "assetId": "Asset_ID_1",
            "name": "Asset Display Name",
            "currency": "ADA",
            "price": 312.1994,
            "quantity": 6,
            "total": 1873.1964,
            "image": "s3_link_to_image",
          }, ...
        ]
      */
      orderDate: a.datetime().required(),
      subtotal: a.float().required(),
      total: a.float().required(),
      paymentMethod: a.string().required(),
      status: a.enum(["Pending", "Success", "Failed", "Cancelled"]),
      tax: a.float(),
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [index("ownerId").sortKeys(["orderDate"])])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["create", "read"]),
    ]),

  Transaction: a
    .model({
      id: a.id().required(),
      orderId: a.id().required(), // Reference to Order
      ownerId: a.id().required(), // Reference to User
      paymentMethod: a.enum(["CardanoWallet", "Mastercard", "Visa", "PayPal"]),
      paymentStatus: a.enum(["Pending", "Success", "Failed", "Cancelled"]),
      transactionDate: a.datetime().required(),
      currency: a.string().required(),
      amount: a.float().required(),
      referenceNumber: a.string(), // Transaction Reference Number from Payment Gateways
      metadata: a.json(), // Blockchain Transaction Info
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [
      index("orderId").sortKeys(["transactionDate"]),
      index("ownerId").sortKeys(["transactionDate"]),
      index("ownerId").sortKeys(["orderId", "transactionDate"]),
    ])
    .authorization((allow) => [allow.groups(["Admin"]).to(["read"]), allow.owner().to(["read"])]),

  Notification: a
    .model({
      id: a.id().required(),
      ownerId: a.id().required(), // Reference to User
      title: a.string().required(),
      message: a.string().required(),
      notificationDate: a.datetime().required(),
      isRead: a.boolean().default(false),
      topic: a.enum(["Account", "Asset", "PaymentMethod", "Order", "Transaction"]),
      action: a.enum([
        // Account Actions
        "Account_Email_Updated",
        "Account_Username_Updated",
        "Account_Full_Name_Updated",
        "Account_KYC_Status_Pending",
        "Account_KYC_Status_Approved",
        "Account_KYC_Status_Rejected",
        "Account_Verified",
        // Asset Actions
        "Asset_Mint_InProgress",
        "Asset_Mint_Successful",
        "Asset_Mint_Failed",
        "Asset_Mint_Rejected",
        "Asset_Mint_Cancelled",
        "Asset_Bought",
        "Asset_Sold",
        "Asset_Fractionalized",
        "Asset_Recombined",
        // Payment Method Actions
        "PaymentMethod_Added",
        "PaymentMethod_Nicknamed",
        "PaymentMethod_Expired",
        "PaymentMethod_Deleted",
        // Order Actions
        "Order_Pending",
        "Order_Successful",
        "Order_Failed",
        "Order_Cancelled",
        // Transaction Actions
        "Transaction_Pending",
        "Transaction_Successful",
        "Transaction_Failed",
        "Transaction_Cancelled",
      ]),
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [
      index("ownerId").sortKeys(["notificationDate"]),
      index("ownerId").sortKeys(["topic", "notificationDate"]),
    ])
    .authorization((allow) => [allow.owner().to(["read", "update"])]),

  ActivityLog: a
    .model({
      id: a.id().required(),
      timestamp: a.datetime().required(),
      ownerId: a.id().required(), // Reference to User
      recordId: a.string().required(), // Primary Key of the affected Record
      recordType: a.enum(["Account", "Asset", "PaymentMethod", "Order", "Transaction", "CartItem", "Notification"]),
      recordAction: a.enum([
        // Account Actions
        "Account_Email_Updated",
        "Account_Username_Updated",
        "Account_Full_Name_Updated",
        "Account_KYC_Status_Pending",
        "Account_KYC_Status_Approved",
        "Account_KYC_Status_Rejected",
        "Account_Verified",
        // Asset Actions
        "Asset_Mint_InProgress",
        "Asset_Mint_Successful",
        "Asset_Mint_Failed",
        "Asset_Mint_Rejected",
        "Asset_Mint_Cancelled",
        "Asset_Bought",
        "Asset_Sold",
        "Asset_Fractionalized",
        "Asset_Recombined",
        // Payment Method Actions
        "PaymentMethod_Added",
        "PaymentMethod_Nicknamed",
        "PaymentMethod_Expired",
        "PaymentMethod_Deleted",
        // Order Actions
        "Order_Pending",
        "Order_Successful",
        "Order_Failed",
        "Order_Cancelled",
        // Transaction Actions
        "Transaction_Pending",
        "Transaction_Successful",
        "Transaction_Failed",
        "Transaction_Cancelled",
        // Cart Item Actions
        "CartItem_Added",
        "CartItem_Removed",
        // Notification Actions
        "Notification_Read",
      ]),
    })
    .identifier(["id"])
    .secondaryIndexes((index) => [
      index("ownerId").sortKeys(["timestamp"]),
      index("ownerId").sortKeys(["recordType", "timestamp"]),
    ])
    .authorization((allow) => [
      allow.groups(["Admin"]).to(["read"]), // Admins can only read, but not create, update, or delete
      allow.authenticated().to(["create"]), // Users  can only create, but not read, update, or delete
    ]),
});

// https://docs.amplify.aws/react/build-a-backend/data/customize-authz/grant-lambda-function-access-to-api/

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
