import type { FC, JSX } from "react";
import styled from "styled-components";

import { Typography } from "@/components/common";

const StyledDescription = styled(Typography.P)`
  width: fit-content;
`;

const ProductInvestmentDataProductDescription: FC<object> = (): JSX.Element => {
  return (
    <StyledDescription weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
      Located in the heart of Los Angeles, this modern residential property offers both long-term value and stable
      rental potential. With its prime location, contemporary design, and proximity to key business districts, it
      represents a strong real estate asset for investors seeking reliable returns.
    </StyledDescription>
  );
};

export default ProductInvestmentDataProductDescription;
