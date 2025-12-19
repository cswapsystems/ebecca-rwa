"use client";

import type { FC, JSX } from "react";
import { useMemo } from "react";

import { CategoryTag } from "@/components/common";
import { Flex } from "@/components/primitives";

import type { ProductTagDTO } from "./useProductInvestmentDataProductTags";

import useProductInvestmentDataProductTags from "./useProductInvestmentDataProductTags";

interface DetailsPageProps {
  type: "details-page";
}

interface AssetWizardProps {
  type: "asset-wizard";
  products: Array<ProductTagDTO>;
}

type Props = DetailsPageProps | AssetWizardProps;

const ProductInvestmentDataProductTags: FC<Props> = ({ type, ...rest }): JSX.Element => {
  const productTags = useProductInvestmentDataProductTags();

  const products = useMemo<Array<ProductTagDTO>>(() => {
    return type === "details-page" ? productTags : (rest as AssetWizardProps)?.products;
  }, [type, rest, productTags]);

  return (
    <Flex.Row columnGap="8px" rowGap="8px" flexWrap="wrap">
      {products?.map(
        (tag, idx): JSX.Element => (
          <CategoryTag key={String(`${tag?.tag}-${idx}`)} icon={tag?.icon} tag={tag?.tag} />
        )
      )}
    </Flex.Row>
  );
};

export default ProductInvestmentDataProductTags;
