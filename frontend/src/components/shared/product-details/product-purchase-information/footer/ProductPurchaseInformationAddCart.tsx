import type { FC, JSX, MouseEventHandler } from "react";

import { StyledAddToCartButton } from "./StyledElements";
import { Typography } from "@/components/common";

interface Props {
  onAddToCart?: MouseEventHandler<HTMLButtonElement>;
}

const ProductPurchaseInformationAddCart: FC<Props> = ({ onAddToCart }): JSX.Element => {
  return (
    <StyledAddToCartButton onClick={onAddToCart} type="button">
      <Typography.Span weight={500} size="16px" lineHeight={22} color={(theme) => theme.colors.base700}>
        Add to Cart
      </Typography.Span>
    </StyledAddToCartButton>
  );
};

export default ProductPurchaseInformationAddCart;
