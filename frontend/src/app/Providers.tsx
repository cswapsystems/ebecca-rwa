"use client";

import React from "react";
import { getTheme } from "@/utils";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { store, persistor } from "@/state/store";
import { StyledComponentsRegistry } from "@/styles";
import { Provider as StoreProvider } from "react-redux";
import "@/lib/amplifyAuthClient";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const mode = "light";
  const theme = getTheme(mode);

  return (
    <StyledComponentsRegistry>
      <StoreProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
