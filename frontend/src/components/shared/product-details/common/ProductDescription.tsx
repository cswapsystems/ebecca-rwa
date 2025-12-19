import type { FC, JSX } from "react";
import styled from "styled-components";

import { Typography } from "@/components/common";
import { CustomTextAreaInput } from "./StyledElements";

const StyledDescription = styled(Typography.P)`
  width: fit-content;
`;
interface DetailsPageProps {
  type: "details-page";
  isEditor?: never;
}

interface AssetWizardProps {
  type: "asset-wizard";
  isEditor?: boolean;
  productDescriptionValue: string;
  onProductDescriptionChange: (value: string) => void;
}
type Props = DetailsPageProps | AssetWizardProps;

const ProductDescription: FC<Props> = ({ type, isEditor = false, ...rest }): JSX.Element => {
  if (type === "details-page" || (type === "asset-wizard" && !isEditor)) {
    return (
      <StyledDescription weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
        {type === "details-page"
          ? `Located in the heart of Los Angeles, this modern residential property offers both long-term value and stable
        rental potential. With its prime location, contemporary design, and proximity to key business districts, it
        represents a strong real estate asset for investors seeking reliable returns.`
          : (rest as AssetWizardProps)?.productDescriptionValue}
      </StyledDescription>
    );
  }

  return (
    <CustomTextAreaInput
      label="Product description"
      labelColor={(theme) => theme.colors.base950}
      labelWeight={600}
      value={(rest as AssetWizardProps)?.productDescriptionValue}
      onChange={(evt) => (rest as AssetWizardProps)?.onProductDescriptionChange(evt?.target?.value)}
    />
  );
};

export default ProductDescription;
