import type { FC, JSX } from "react";

import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";
import { CustomTextAreaInput } from "../../common/StyledElements";

import type { ProductDetailsComponentType } from "../../ProductDetails";

interface DetailsPageTypeProps {
  type: "details-page";
}

interface AssetWizardTypeProps {
  type: "asset-wizard";
  productDetailsValue: string;
  onProductDetailsValueChange: (value: string) => void;
}
type Props = DetailsPageTypeProps | AssetWizardTypeProps;

const ProductInvestmentDataProductHighlights: FC<Props> = ({ type, ...rest }): JSX.Element => {
  if (type === "details-page") {
    return (
      <Flex.Column rowGap="16px" alignItems="flex-start">
        <Typography.H5
          weight={500}
          size="16px"
          lineHeight={22}
          color={(theme) => theme.colors.base950}
          texttransform="capitalize"
        >
          highlights
        </Typography.H5>
        <ul style={{ marginLeft: "16px" }}>
          <li>
            <Typography.P weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
              Prime Los Angeles location
            </Typography.P>
          </li>
          <li>
            <Typography.P weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
              Contemporary architecture with high-quality finishes
            </Typography.P>
          </li>
          <li>
            <Typography.P weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
              Strong rental demand in surrounding area
            </Typography.P>
          </li>
          <li>
            <Typography.P weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
              Potential for long-term appreciation
            </Typography.P>
          </li>
        </ul>
      </Flex.Column>
    );
  }

  return (
    <CustomTextAreaInput
      label="Product details"
      labelColor={(theme) => theme.colors.base950}
      labelWeight={600}
      value={(rest as AssetWizardTypeProps)?.productDetailsValue}
      onChange={(evt) => (rest as AssetWizardTypeProps)?.onProductDetailsValueChange(evt?.target?.value)}
    />
  );
};

export default ProductInvestmentDataProductHighlights;
