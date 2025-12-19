"use client";

import type { FC, JSX, PropsWithChildren } from "react";
import { createContext, useContext, useState, useCallback } from "react";

import type { ProductGalleryDataDTO } from "../types";

interface ProductGalleryContextValue {
  activeImage: ProductGalleryDataDTO | null;
  modalActiveImage: ProductGalleryDataDTO | null;
}

interface ProductGalleryContextActions {
  setActiveImage: (image: ProductGalleryContextValue["activeImage"]) => void;
  setModalActiveImage: (image: ProductGalleryContextValue["modalActiveImage"]) => void;
}

type ProductGalleryContextType = ProductGalleryContextValue & ProductGalleryContextActions;

const initState = {
  activeImage: null,
  setActiveImage: () => {},

  modalActiveImage: null,
  setModalActiveImage: () => {},
} satisfies ProductGalleryContextType;

export const ProductGalleryContext = createContext<ProductGalleryContextType>(initState);

const ProductGalleryProvider: FC<PropsWithChildren<object>> = ({ children }): JSX.Element => {
  const [values, setValues] = useState<ProductGalleryContextValue>({
    activeImage: initState.activeImage,
    modalActiveImage: initState.modalActiveImage,
  });

  const setActiveImage = useCallback((data: ProductGalleryDataDTO | null): void => {
    setValues((prevState) => ({
      ...prevState,
      activeImage: data,
    }));
  }, []);

  const setModalActiveImage = useCallback((data: ProductGalleryDataDTO | null): void => {
    setValues((prevState) => ({
      ...prevState,
      modalActiveImage: data,
    }));
  }, []);

  return (
    <ProductGalleryContext.Provider value={{ ...values, setActiveImage, setModalActiveImage }}>
      {children}
    </ProductGalleryContext.Provider>
  );
};

export const useProductGalleryContext = (): ProductGalleryContextType => {
  try {
    const context = useContext(ProductGalleryContext);

    if (!context) {
      throw new Error("useProductGalleryContext must be used within a ProductGalleryProvider");
    }

    return context;
  } catch (error) {
    throw new Error("useProductGalleryContext must be used within a ProductGalleryProvider");
  }
};

export default ProductGalleryProvider;
