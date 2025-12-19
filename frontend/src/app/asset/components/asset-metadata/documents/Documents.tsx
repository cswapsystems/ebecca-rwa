"use client";

import type { FC, JSX } from "react";
import styled from "styled-components";
import { useCallback, useMemo, useEffect } from "react";

import { Card, Typography } from "@/components/common";
import { Flex } from "@/components/primitives";
import DocumentsInfoGridLayout from "./DocumentsInfoGridLayout";
import NextButton from "../../common/NextButton";
import { useAssetWizardContext } from "../../context/AssetWizardProvider";
import { useAsset } from "@/state/hooks";
import type { MetadataForms } from "../AssetMetadata";
import type { AssetInputMetadata } from "@/lib/data/assetData";
import type { DocumentsInfo } from "./DocumentsInfoGridLayout";

import { toCamelCase } from "@/utils";

import { breakpoints } from "@/constants";

const NextButtonContainer = styled.div`
  align-self: flex-end;
  @media only screen and (max-width: ${breakpoints.xs}px) {
    align-self: flex-start;
  }
`;

type LabelMap = Record<string, unknown>;
type AssetFieldIdMap = Record<string, string>;

const UPLOAD_IMAGE_KEY_VALUE = "upload images";

interface Props {
  metadataForms: MetadataForms;
}

const Documents: FC<Props> = ({ metadataForms }): JSX.Element | null => {
  const { data } = useAssetWizardContext();
  const { updateAssetCreatedData } = useAsset();

  const buildMaps = (
    metadataForms: Array<{ formData?: Array<{ label?: string; assetFieldId?: string }> }>
  ): { labelMap: LabelMap; assetFieldIdMap: AssetFieldIdMap } => {
    return (metadataForms ?? [])
      .flatMap((mf) => mf.formData ?? [])
      .reduce(
        (acc, field) => {
          if (!field?.label) return acc;

          const camel = toCamelCase(field.label);

          acc.labelMap[camel] = field.label;

          if (field.assetFieldId && !acc.assetFieldIdMap[camel]) {
            acc.assetFieldIdMap[camel] = field.assetFieldId;
          }

          return acc;
        },
        { labelMap: {} as LabelMap, assetFieldIdMap: {} as AssetFieldIdMap }
      );
  };

  const transformMetadataFieldsToAssetInput = (
    metadataFields: Record<string, unknown>,
    labelMap: LabelMap,
    assetFieldIdMap: AssetFieldIdMap
  ): AssetInputMetadata[] => {
    return Object.entries(metadataFields ?? {}).map(([camelKey, value]) => {
      const metadataKey = (labelMap[camelKey] as string) || (camelKey as unknown as string);

      return {
        metadataKey,
        metadataValue: value == null ? "" : String(value),
        assetFieldId: assetFieldIdMap[camelKey] || "",
      };
    });
  };

  const transformAssetDocumentsToMetadata = useCallback((): AssetInputMetadata[] => {
    const assetDocuments = data?.assetDocuments;
    if (!Array.isArray(assetDocuments)) return [];

    return assetDocuments
      ?.filter((doc) => !!doc?.documentUploaded && Array.isArray(doc?.document) && doc?.document?.length > 0)
      ?.map((doc) => {
        const urls = (doc?.document ?? [])?.map((d: Record<string, string>) => d?.data);

        return {
          metadataKey: doc?.title,
          metadataValue: urls?.length === 1 ? urls?.at(0) : JSON.stringify(urls),
          assetFieldId: doc?.assetFieldId,
        };
      });
  }, [data?.assetDocuments]);

  const transformAssetDocumentsToImagesFormat = useCallback((): Array<string> => {
    const assetDocuments = data?.assetDocuments;
    if (!Array.isArray(assetDocuments)) return [];

    const findByUploadImages = assetDocuments?.find((doc) => doc?.title?.toLowerCase() === UPLOAD_IMAGE_KEY_VALUE);

    if (!findByUploadImages) return [];

    if (findByUploadImages?.document && Array.isArray(findByUploadImages?.document)) {
      return findByUploadImages?.document?.map((doc: Record<string, string>) => doc?.data);
    }

    return [];
  }, [data?.assetDocuments]);

  const { labelMap, assetFieldIdMap } = useMemo(() => buildMaps(metadataForms ?? []), [metadataForms]);

  const onClickNext = useCallback((): void => {
    const metadataFields = (data as { metadataFields?: Record<string, unknown> })?.metadataFields ?? {};
    const metadataApiPayload = transformMetadataFieldsToAssetInput(metadataFields, labelMap, assetFieldIdMap);
    const documentMetadataPayload = transformAssetDocumentsToMetadata();
    const images = transformAssetDocumentsToImagesFormat();

    updateAssetCreatedData({ metadata: [...metadataApiPayload, ...documentMetadataPayload], images });
  }, [
    data,
    labelMap,
    assetFieldIdMap,
    updateAssetCreatedData,
    transformAssetDocumentsToMetadata,
    transformAssetDocumentsToImagesFormat,
  ]);

  if (!data?.assetDocuments) {
    return null;
  }

  return (
    <Flex.Column rowGap="20px" width="100%">
      <Card
        padding="24px"
        display="flex"
        flexDirection="column"
        gap="16px"
        border="none"
        borderRadius="16px"
        backgroundColor={(theme) => theme.colors.white}
        width="100%"
        boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
      >
        <Typography.H4
          weight={600}
          size="20px"
          lineHeight="26px"
          color={(theme) => theme.colors.base950}
          texttransform="capitalize"
        >
          Documents
        </Typography.H4>
        <Typography.P weight={400} size="16px" lineHeight="22px" color={(theme) => theme.colors.base700}>
          Upload required files to verify the asset.
        </Typography.P>
        <DocumentsInfoGridLayout />
      </Card>
      <NextButtonContainer>
        <NextButton onClick={onClickNext} />
      </NextButtonContainer>
    </Flex.Column>
  );
};

export default Documents;
