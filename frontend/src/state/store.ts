import storage from "redux-persist/lib/storage";
import userReducer from "@/state/slices/userSlice";
import assetReducer from "@/state/slices/assetSlice";
import mintReducer from "@/state/slices/mintSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { adminApi } from "@/lib/services/adminApi";
import { userApi } from "@/lib/services/userApi";
import { categoryApi } from "@/lib/services/categoryApi";
import { subcategoryApi } from "@/lib/services/subcategoryApi";
import { tagApi } from "@/lib/services/tagApi";
import { assetTypeApi } from "@/lib/services/assetTypeApi";
import { assetFieldApi } from "@/lib/services/assetFieldApi";
import { assetMetadataApi } from "@/lib/services/assetMetadataApi";
import { assetImageApi } from "@/lib/services/imageUploadApi";
import { assetApi } from "@/lib/services/assetApi";
import { assetFractionApi } from "@/lib/services/assetFractionApi";
import { cartApi } from "@/lib/services/cartApi";
import { paymentApi } from "@/lib/services/paymentApi";
import { orderApi } from "@/lib/services/orderApi";
import { transactionApi } from "@/lib/services/transactionApi";
import { notificationApi } from "@/lib/services/notificationApi";
import { activityLogApi } from "@/lib/services/activityLogApi";
import { mintApi } from "@/lib/services/mintApi";
import { persistStore, persistReducer, PersistedState } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
// import userReducer from '@/state/slices/userSlice';
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { adminApi } from '@/lib/services/adminApi';
// import { userApi } from '@/lib/services/userApi';
// import { categoryApi } from '@/lib/services/categoryApi';
// import { subcategoryApi } from '@/lib/services/subcategoryApi';
// import { tagApi } from '@/lib/services/tagApi';
// import { assetTypeApi } from '@/lib/services/assetTypeApi';
// import { assetFieldApi } from '@/lib/services/assetFieldApi';
// import { assetMetadataApi } from '@/lib/services/assetMetadataApi';
// import { assetApi } from '@/lib/services/assetApi';
// import { assetFractionApi } from '@/lib/services/assetFractionApi';
// import { cartApi } from '@/lib/services/cartApi';
// import { paymentApi } from '@/lib/services/paymentApi';
// import { orderApi } from '@/lib/services/orderApi';
// import { transactionApi } from '@/lib/services/transactionApi';
// import { notificationApi } from '@/lib/services/notificationApi';
// import { activityLogApi } from '@/lib/services/activityLogApi';
// import { persistStore, persistReducer, PersistedState } from 'redux-persist';

// Combine the reducers
const rootReducer = combineReducers({
  // All Reducers go here
  user: userReducer,
  asset: assetReducer,
  mint: mintReducer,
  // All API Reducers go here
  [adminApi.reducerPath]: adminApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [subcategoryApi.reducerPath]: subcategoryApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [assetImageApi.reducerPath]: assetImageApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [assetFieldApi.reducerPath]: assetFieldApi.reducer,
  [assetMetadataApi.reducerPath]: assetMetadataApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [assetFractionApi.reducerPath]: assetFractionApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [activityLogApi.reducerPath]: activityLogApi.reducer,
  [mintApi.reducerPath]: mintApi.reducer,
});

// Configure the persistence settings
const persistConfig = {
  key: "ebecca",
  storage, // Storage engine (Default: "localStorage")
  whitelist: ["user", "asset", "mint"], // Whitelisted reducers to persist
  migrate: (state: PersistedState | undefined) => {
    // Migrate old state that doesn't have the auth property
    if (state && typeof state === "object" && "user" in state) {
      const userState = state.user as Record<string, unknown>;
      if (userState && !userState.auth) {
        // Add default auth structure for old persisted state
        userState.auth = {
          user: null,
          isLoading: true,
          session: null,
        };
      }
    }
    return Promise.resolve(state);
  },
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [assetApi.reducerPath, "user.auth.session"],
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
          assetApi.reducerPath + "/executeMutation/fulfilled",
          assetApi.reducerPath + "/executeMutation/pending",
          assetApi.reducerPath + "/executeMutation/rejected",
          "user/setAuthSession",
        ],
        ignoredActionPaths: ["payload"],
      },
    })
      // All API Middlewares go here
      .concat(adminApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(subcategoryApi.middleware)
      .concat(tagApi.middleware)
      .concat(assetTypeApi.middleware)
      .concat(assetFieldApi.middleware)
      .concat(assetMetadataApi.middleware)
      .concat(assetApi.middleware)
      .concat(assetFractionApi.middleware)
      .concat(cartApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware)
      .concat(transactionApi.middleware)
      .concat(notificationApi.middleware)
      .concat(activityLogApi.middleware)
      .concat(mintApi.middleware),
});

// Create the persistor
export const persistor = persistStore(store);

// Export "RootState" and "AppDispatch" types for Hooks
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
