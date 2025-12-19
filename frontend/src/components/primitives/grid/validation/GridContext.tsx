'use client';

import { createContext, useContext } from 'react';

const GridContext = createContext<boolean | null>(null);

const errorHandler = (component: string): void => {
  throw new Error(`${component} must be used inside a Grid.Container`);
};

// TODO: Avoid throwing error in Production
export const useInvariantInsideContainer = (component: string): void => {
  const context = useContext(GridContext);

  if (!context) {
    errorHandler(component);
  }
};

export default GridContext;
