"use client";

import type { FC, JSX } from "react";
import { useMemo, useEffect } from "react";

import { AssetTypeCard, AssetTypeIconWrapper, AssetTypeItemButton } from "./StyledElements";
import { Typography } from "@/components/common";

import { useAssetWizardContext } from "../context/AssetWizardProvider";

import type { AssetTypeModel } from "./types";

interface Props {
  data: AssetTypeModel;
}

const AssetTypeItem: FC<Props> = ({ data }): JSX.Element => {
  const { selectedAssetTypeId, setSelectedAssetTypeIds, updateField } = useAssetWizardContext();
  const isSelected = useMemo<boolean>(
    () => (data.id && selectedAssetTypeId ? Boolean(selectedAssetTypeId === data.id) : false),
    [selectedAssetTypeId, data?.id]
  );

  const onButtonClick = (): void => {
    setSelectedAssetTypeIds(data?.id ?? null);
    updateField("subcategoryAssetType", data?.label ?? "", true);
  };

  return (
    <AssetTypeItemButton type="button" name="subcategory-asset-type" onClick={onButtonClick}>
      <AssetTypeCard
        display="flex"
        flexDirection="row"
        alignItems="center"
        padding="12px 16px"
        backgroundColor={(theme) => theme.colors.white}
        gap="24px"
        border="none"
        borderRadius="20px"
        width="100%"
        $isSelected={isSelected}
      >
        <AssetTypeIconWrapper $isSelected={isSelected} />
        <Typography.H4
          size="20px"
          lineHeight={26}
          color={(theme) => theme.colors.base950}
          weight={600}
          texttransform="capitalize"
        >
          {data?.label}
        </Typography.H4>
      </AssetTypeCard>
    </AssetTypeItemButton>
  );
};

export default AssetTypeItem;
