"use client";

import type { FC, JSX } from "react";
import {} from "react";

import { Card } from "@/components/common";
import AssetOverview from "./overview/Overview";
import { Line, MetadataHeaderDesktop, MetadataHeaderMobile, MetadataDescription } from "./MetadataStyledElements";
import AssetMetaDataForm from "./form/AssetMetadataForm";
import type { MetadataForms } from "../AssetMetadata";

interface Props {
  metadataForms: MetadataForms;
}

const Metadata: FC<Props> = ({ metadataForms }): JSX.Element => {
  return (
    <Card
      padding="18px"
      display="flex"
      flexDirection="column"
      gap="16px"
      border="none"
      borderRadius="16px"
      backgroundColor={(theme) => theme.colors.white}
      width="100%"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
    >
      <MetadataHeaderDesktop
        weight={600}
        size="32px"
        lineHeight="40px"
        color={(theme) => theme.colors.base950}
        texttransform="capitalize"
      >
        Asset metadata
      </MetadataHeaderDesktop>
      <MetadataHeaderMobile
        size="20px"
        lineHeight="26px"
        weight={600}
        color={(theme) => theme.colors.base950}
        texttransform="capitalize"
      >
        Asset metadata
      </MetadataHeaderMobile>
      <MetadataDescription weight={400} color={(theme) => theme.colors.base700}>
        Review category details and enter key information about the asset.
      </MetadataDescription>
      <AssetOverview />
      <Line />
      {metadataForms?.map((mf, idx) => (
        <AssetMetaDataForm key={String(idx)} formInputData={mf?.formData} gridLayout={mf?.gridLayout} />
      ))}
    </Card>
  );
};

export default Metadata;
