"use client";

import type { FC, JSX } from "react";
import styled from "styled-components";
import { useEffect, useMemo } from "react";

import { Flex } from "@/components/primitives";
import PageBackButton from "@/components/common/buttons/PageBackButton";
import Metadata from "./metadata";
import Documents from "./documents";
import { Loader } from "@/components/common";

import { useAssetWizardContext } from "../context/AssetWizardProvider";
import {
  useFetchAssetTypesBySubcategoryIdQuery,
  useFetchAssetTypeByAssetTypeIdQuery,
} from "@/lib/services/assetTypeApi";

import { breakpoints } from "@/constants";
import { toCamelCase, arrayToObject } from "@/utils";
import type { FormGridInputApiResponseDTO, GridLayout } from "./metadata/form/types";

import type { AssetType } from "@/types";
import type { DocumentsInfo } from "./documents/DocumentsInfoGridLayout";

export interface MetadataFormData {
  gridLayout: GridLayout;
  formData: Array<FormGridInputApiResponseDTO>;
}

export type MetadataForms = Array<MetadataFormData>;

const AssetMetadataWrapper = styled(Flex.Column)`
  width: 100%;
  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    padding: 60px 0px;
  }
`;

const ComponentsWrapper = styled(Flex.Row)`
  @media only screen and (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`;

const AssetMetaData: FC<object> = (): JSX.Element => {
  const {
    makePreviousStep,
    selectedSubcategoryId,
    data,
    selectedAssetTypeId,
    assetWizardMetadataFields,
    setAssetWizardMetadataFields,
    updateAllStateDatas,
  } = useAssetWizardContext();
  const {
    data: assetTypesBySubcategoryIdData,
    isLoading: isAssetTypesBySubcategoryIdQueryLoading,
    isFetching: isAssetTypesBySubcategoryIdQueryFetching,
  } = useFetchAssetTypesBySubcategoryIdQuery(selectedSubcategoryId ?? "", {
    skip: !selectedSubcategoryId || !!selectedAssetTypeId,
    refetchOnFocus: false,
  });
  const {
    data: assetTypesByAssetTypeIdData,
    isLoading: isAssetTypesByAssetTypeIdQueryLoading,
    isFetching: isAssetTypesByAssetTypeIdQueryFetching,
  } = useFetchAssetTypeByAssetTypeIdQuery(selectedAssetTypeId ?? "", {
    skip: !selectedAssetTypeId,
    refetchOnFocus: false,
  });

  const assetTypesByAssetTypeIdQueryLoadingState = useMemo<boolean>(
    () => isAssetTypesByAssetTypeIdQueryLoading || isAssetTypesByAssetTypeIdQueryFetching,
    [isAssetTypesByAssetTypeIdQueryLoading, isAssetTypesByAssetTypeIdQueryFetching]
  );

  const assetTypesBySubcategoryIdQueryLoadingState = useMemo<boolean>(
    () => isAssetTypesBySubcategoryIdQueryLoading || isAssetTypesBySubcategoryIdQueryFetching,
    [isAssetTypesBySubcategoryIdQueryLoading, isAssetTypesBySubcategoryIdQueryFetching]
  );

  const isLoading = useMemo<boolean>(
    () => assetTypesByAssetTypeIdQueryLoadingState || assetTypesBySubcategoryIdQueryLoadingState,
    [assetTypesByAssetTypeIdQueryLoadingState, assetTypesBySubcategoryIdQueryLoadingState]
  );

  const fieldDefinitions = useMemo<AssetType["fieldDefinitions"] | null>(() => {
    if (
      (!assetTypesBySubcategoryIdData || assetTypesBySubcategoryIdData?.length === 0) &&
      !assetTypesByAssetTypeIdData
    ) {
      return null;
    }

    const baseAssetType = assetTypesByAssetTypeIdData ?? assetTypesBySubcategoryIdData?.[0];

    return baseAssetType?.fieldDefinitions ? JSON.parse(JSON.parse(baseAssetType?.fieldDefinitions as string)) : null;
  }, [assetTypesBySubcategoryIdData, assetTypesByAssetTypeIdData]);

  const metadataForms = useMemo<MetadataForms>(() => {
    if (!fieldDefinitions) {
      return [];
    }

    if (Array.isArray(fieldDefinitions)) {
      const forms = fieldDefinitions?.filter((fd) => fd?.section === "left");

      if (!forms || forms?.length === 0) {
        return [];
      }

      return forms?.map((form) => ({
        gridLayout: form?.layout ?? "one-column",
        formData: form?.fields ?? [],
      }));
    }

    return [];
  }, [fieldDefinitions]);

  const metadataDocuments = useMemo<Array<DocumentsInfo>>(() => {
    if (!fieldDefinitions) {
      return [];
    }

    if (Array.isArray(fieldDefinitions)) {
      const files = fieldDefinitions?.find((fd) => fd?.section === "right");

      if (!files) {
        return [];
      }

      return files?.fields
        ?.filter((field: Record<string, string>) => field?.type === "file")
        ?.map((field: Record<string, unknown>) => {
          const existingAssetDocuments = data?.assetDocuments
            ? (data?.assetDocuments as DocumentsInfo[])?.find(
                (document) => document.title?.toLowerCase() === (field?.label as string)?.toLowerCase()
              )?.document
            : undefined;

          return {
            title: field?.label,
            documentUploaded: Boolean(!!existingAssetDocuments),
            document: existingAssetDocuments ?? null,
            maxFileCount: field?.maxFileCount ?? 1,
            assetFieldId: field?.assetFieldId ?? "",
          };
        });
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldDefinitions]);

  const filterFormDataListByType = (type: string): Array<string> => {
    const allFormData = metadataForms?.flatMap((mf) => mf.formData ?? []) ?? [];

    return allFormData?.filter((data) => data?.type === type).map((data) => toCamelCase(data?.label));
  };

  useEffect(() => {
    if (metadataForms?.length > 0 && !!metadataForms) {
      const allFormData = metadataForms?.flatMap((mf) => mf.formData ?? []) ?? [];
      const switchFormDataList = filterFormDataListByType("switch");
      const dropdownFormDataList = filterFormDataListByType("select");
      const textFormDataList = filterFormDataListByType("text");
      const radioFormDataList = filterFormDataListByType("radio");
      const dateFormDataList = filterFormDataListByType("date");
      const checkboxFormDataList = filterFormDataListByType("checkbox");
      const textAreaFormDataList = filterFormDataListByType("textarea");

      const otherFormDataList = allFormData
        .filter(
          (data) =>
            data?.type !== "select" &&
            data?.type !== "switch" &&
            data?.type !== "text" &&
            data?.type !== "radio" &&
            data?.type !== "date"
        )
        .map((data) => toCamelCase(data?.label));

      const existingFields = (data as Record<string, unknown>)?.metadataFields ?? {};

      updateAllStateDatas({
        ...data,
        metadataFields: {
          ...(switchFormDataList.length > 0
            ? arrayToObject(switchFormDataList, false, existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(dropdownFormDataList.length > 0
            ? arrayToObject(dropdownFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(textFormDataList.length > 0
            ? arrayToObject(textFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(radioFormDataList.length > 0
            ? arrayToObject(radioFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(dateFormDataList.length > 0
            ? arrayToObject(dateFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(checkboxFormDataList.length > 0
            ? arrayToObject(checkboxFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(textAreaFormDataList.length > 0
            ? arrayToObject(textAreaFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
          ...(otherFormDataList.length > 0
            ? arrayToObject(otherFormDataList, "", existingFields as unknown as Record<string, unknown>)
            : {}),
        },
        ...(metadataDocuments
          ? {
              assetDocuments: metadataDocuments,
            }
          : { assetDocuments: [] }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadataForms, metadataDocuments, updateAllStateDatas]);

  useEffect(() => {
    const metadataFields: string[] = ["assetDocuments"];
    metadataForms?.map((mf) => {
      if (mf?.formData?.length > 0) {
        mf?.formData.map((form) => {
          metadataFields.push(toCamelCase(form.label));
        });
      }
    });
    setAssetWizardMetadataFields([...metadataFields]);
  }, [metadataForms, setAssetWizardMetadataFields]);

  const onPageBackClick = (): void => {
    makePreviousStep();
  };

  return (
    <AssetMetadataWrapper rowGap="16px">
      <Loader isLoading={isLoading} title="Loading asset metadata..." />
      {!isLoading && (
        <>
          <PageBackButton onClick={onPageBackClick} />
          <ComponentsWrapper alignItems="flex-start" columnGap="12px" rowGap="16px">
            <Metadata metadataForms={metadataForms} />
            <Documents metadataForms={metadataForms} />
          </ComponentsWrapper>
        </>
      )}
    </AssetMetadataWrapper>
  );
};

export default AssetMetaData;
