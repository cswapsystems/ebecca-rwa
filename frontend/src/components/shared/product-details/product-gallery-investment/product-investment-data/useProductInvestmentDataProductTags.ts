"use client";

import { useMemo } from "react";
export interface ProductTagDTO {
  tag: string;
  icon?: string;
}

type UseProductInvestmentDataProductTags = () => Array<ProductTagDTO>;

const useProductInvestmentDataProductTags: UseProductInvestmentDataProductTags = () => {
  const productTags = useMemo<ProductTagDTO[]>(() => {
    return [
      {
        tag: "Real Estate",
        icon: "/icons/real-estate.svg",
      },
      {
        tag: "KYC",
        icon: "/icons/kyc.svg",
      },
      {
        tag: "Fractionalized",
        icon: "/icons/fractionalized.svg",
      },
      {
        tag: "Brinks",
        icon: "/icons/brinks.svg",
      },
    ];
  }, []);

  return productTags;
};

export default useProductInvestmentDataProductTags;
