"use client";

import type { FC, JSX, ChangeEvent } from "react";
import { useEffect, useCallback, useActionState, useMemo, useTransition, useRef, useState } from "react";

import AssetWizardProvider, { useAssetWizardContext } from "./context/AssetWizardProvider";
import { Flex } from "@/components/primitives";
import { AssetWizardContainer } from "./StyledElements";
import CategorySelect from "./category-select/CategorySelect";
import SubcategorySelect from "./subcategory-select";
import KeywordsSelect from "./keywords-select";
import AssetMetaData from "./asset-metadata";
import AssetVerification from "./asset-verification";
import ProductDetails from "@/components/shared/product-details/ProductDetails";
import ConfirmVerificationModal from "./modals/ConfirmVerificationModal";
import { MAX_FILE_SIZE_BYTES } from "@/constants";
import type { UploadImageSuccessResult } from "@/app/api/upload-image/route";
import type { CustomFileModel } from "./asset-metadata/documents/DocumentUploadTagPerStatus";
import type { ProductTagDTO } from "@/components/shared/product-details/product-gallery-investment/product-investment-data/useProductInvestmentDataProductTags";

import useSetDraftAssetFormValues from "../hooks/useSetDraftAssetFormValues";
import useAutomaticallyUpdateCreatedAsset from "../hooks/useAutomaticallyUpdateCreatedAsset";
import useUploadImageToS3Mutation from "./useUploadImageToS3Mutation";
import { useGenerateAssetCertificateMutation } from "@/lib/services/assetApi";
import { useMint, useAsset } from "@/state/hooks";

import { mintAssetAction } from "@/blockchain/actions/mintAssetAction";
import { initialServerState, ServerFormState } from "@/blockchain/actions/mintAssetServerValues";

import type { Category, AssetField } from "@/types";

interface AssetWizardProps {
  categoryData: Array<Category>;
  assetFields: Array<AssetField>;
}

interface AssetWizardChildrenProps extends AssetWizardProps {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  serverState: ServerFormState;
}

enum FormScreenByCurrentStep {
  CATEGORY_SELECT = 1,
  SUBCATEGORY_SELECT = 2,
  KEYWORDS_SELECT = 3,
  ASSET_METADATA = 4,
  PRODUCT_DETAILS = 5,
  ASSET_VERIFICATION = 6,
}

const AssetWizardChildren: FC<AssetWizardChildrenProps> = ({
  formAction,
  categoryData,
  serverState,
  isPending,
}): JSX.Element => {
  const {
    imageGalleryData,
    currentStep,
    data,
    isFormComplete,
    selectedKeywords,
    setConfirmVerificationModalOpen,
    makeNextStep,
    makePreviousStep,
    validateAll,
    updateAllImagesGalleryData,
    updateAllStateDatas,
  } = useAssetWizardContext();
  const [generateAssetCertificateMutate, { isLoading: isGeneratingAssetCertificate }] =
    useGenerateAssetCertificateMutation();
  const [_, startSubmitTransition] = useTransition();
  const hasHandledRef = useRef(false);
  const [isGeneratingCertificateLocal, setIsGeneratingCertificateLocal] = useState(false);

  const { updateJobId } = useMint();
  const { createdAssetData, updateCertificateUrl, updateAssetCreatedData } = useAsset();

  useSetDraftAssetFormValues();
  useAutomaticallyUpdateCreatedAsset();
  const { mutateMultiple, mutate } = useUploadImageToS3Mutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStep]);

  const certificateData = useMemo<Array<string>>(() => {
    if (!data) return [];

    const category = `Category: ${data?.category || ""}`;
    const subcategory = `Subcategory: ${data?.subcategory || ""}`;
    const subcategoryType = `Subcategory type: ${data?.subcategoryAssetType || ""}`;
    const keywords = `Keywords: ${Array.isArray(data?.keywords) ? data?.keywords?.map((keyword) => keyword?.keyword).join(", ") : ""}`;
    const assetDocuments = Array.isArray(data?.assetDocuments)
      ? `Files: ${"\n"} ${data?.assetDocuments?.flatMap((ad) => ad?.document?.map((doc: CustomFileModel) => doc?.data)).join("\n")}`
      : "";

    return [category, subcategory, subcategoryType, keywords, assetDocuments];
  }, [data]);

  const isConfirmationLoading = useMemo(() => {
    return isPending || isGeneratingAssetCertificate || isGeneratingCertificateLocal;
  }, [isPending, isGeneratingAssetCertificate, isGeneratingCertificateLocal]);

  const productDetailsProductTags = useMemo<Array<ProductTagDTO>>(() => {
    return selectedKeywords?.map((keyword) => ({
      tag: keyword.keyword,
    }));
  }, [selectedKeywords]);

  const onBack = useCallback((): void => {
    makePreviousStep();
  }, [makePreviousStep]);

  const handleFileChange = useCallback(
    async (evt: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const files = evt.target.files;
      if (!files || files?.length === 0) return;

      const filesArray = Array.from(files);

      const isValid = filesArray.every((file) => {
        const isImage = file.type.startsWith("image/");

        if (file.size > MAX_FILE_SIZE_BYTES) {
          evt.target.value = "";
          return false;
        }

        return Boolean(isImage);
      });

      if (!isValid) return;

      const uploadResults: UploadImageSuccessResult[] | null = await mutateMultiple(filesArray);

      if (uploadResults) {
        const updatedImageGalleryData = [
          ...(imageGalleryData ?? []),
          ...uploadResults.map((file) => ({
            id: file?.key ?? "",
            url: file?.fileUrl ?? "",
          })),
        ];

        updateAllImagesGalleryData(updatedImageGalleryData);

        const updatedAssetCreatedImages = updatedImageGalleryData?.map((item) => item?.url);
        updateAssetCreatedData({ images: updatedAssetCreatedImages });
      }
    },
    [imageGalleryData, updateAllImagesGalleryData, mutateMultiple, updateAssetCreatedData]
  );

  const onCloseCallback = useCallback((): void => {
    setConfirmVerificationModalOpen(false);
  }, [setConfirmVerificationModalOpen]);

  const generateCertificate = useCallback(async (): Promise<string> => {
    setIsGeneratingCertificateLocal(true);

    try {
      const blob = await generateAssetCertificateMutate({ data: [...certificateData] }).unwrap();

      if (!blob) return "";

      const file = new File([blob], "asset-certificate.pdf", {
        type: blob?.type ?? "application/pdf",
      });

      const result = await mutate(file);

      if (result?.fileUrl) {
        updateCertificateUrl(result.fileUrl);
        return result.fileUrl;
      }

      return "";
    } catch (err) {
      console.error("generateCertificate error:", err);
      return "";
    } finally {
      setIsGeneratingCertificateLocal(false);
    }
  }, [certificateData, generateAssetCertificateMutate, mutate, updateCertificateUrl]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    const isVerified = validateAll();
    if (!isVerified) {
      e.preventDefault();
    }
    const certificateRes = await generateCertificate();
    const formData = new FormData();

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value) || typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });
    }

    if (!!createdAssetData?.assetId) {
      formData.append("asset_id", createdAssetData?.assetId);
    }

    if (!!createdAssetData?.name) {
      formData.append("name", createdAssetData?.name);
    }

    if (!!data?.assetDescription) {
      formData.append("description", data?.assetDescription as string);
    }

    if (!!data?.assetValue) {
      formData.append("value", data?.assetValue as string);
    }

    if (!!certificateRes) {
      formData.append("certificate", certificateRes);
    }

    startSubmitTransition(() => {
      updateAssetCreatedData({
        price: (data?.assetValue as string | undefined) ?? "",
        description: (data?.assetDescription as string | undefined) ?? "",
        highlights: (data?.assetDetails as string[] | undefined) ?? [],
        name: (data?.name as string | undefined) ?? "",
      });

      formAction(formData);
    });
  };

  useEffect(() => {
    if (serverState?.status === "success" && !hasHandledRef.current) {
      hasHandledRef.current = true;

      (async () => {
        updateJobId((serverState?.data?.JobId as unknown as string) || null);
        makeNextStep();
        onCloseCallback();
      })();
    }
  }, [serverState, updateJobId, makeNextStep, onCloseCallback]);

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <Flex.Column as={AssetWizardContainer} justifyContent="center">
        {currentStep === FormScreenByCurrentStep.CATEGORY_SELECT && <CategorySelect categoryData={categoryData} />}
        {currentStep === FormScreenByCurrentStep.SUBCATEGORY_SELECT && (
          <SubcategorySelect categoryData={categoryData} />
        )}
        {currentStep === FormScreenByCurrentStep.KEYWORDS_SELECT && <KeywordsSelect />}
        {currentStep === FormScreenByCurrentStep.ASSET_METADATA && <AssetMetaData />}
        {currentStep === FormScreenByCurrentStep.PRODUCT_DETAILS && (
          <ProductDetails
            type="asset-wizard"
            imageGalleryData={imageGalleryData ?? undefined}
            valueText={data?.assetValue as string}
            onValueTextChange={(value) =>
              updateAllStateDatas({
                ...data,
                assetValue: value,
              })
            }
            nameText={data?.name as string}
            onNameTextChange={(value) =>
              updateAllStateDatas({
                ...data,
                name: value,
              })
            }
            descriptionText={data?.assetDescription as string}
            onDescriptionTextChange={(value) => updateAllStateDatas({ ...data, assetDescription: value })}
            detailsText={data?.assetDetails as string}
            onDetailsTextChange={(value) => updateAllStateDatas({ ...data, assetDetails: value })}
            productAddress={(data?.name as string) ?? ""}
            productDescriptionValue={(data?.assetDescription as string) ?? ""}
            productTotalPrice={data?.assetValue ? Number((data?.assetValue as string) ?? "0") : undefined}
            isPrimaryButtonDisabled={!isFormComplete}
            productPurchaseInformationPrimaryButtonOnClick={() => setConfirmVerificationModalOpen(true)}
            productPurchaseInformationSecondaryButtonOnClick={onBack}
            onBackButtonClick={onBack}
            onUploadImageChange={(e) => {
              handleFileChange(e);
            }}
            assetName={(data?.assetName as string) ?? ""}
            productTags={productDetailsProductTags}
          />
        )}
        {currentStep === FormScreenByCurrentStep.ASSET_VERIFICATION && <AssetVerification />}
      </Flex.Column>
      <ConfirmVerificationModal isLoading={isConfirmationLoading} />
    </form>
  );
};

const AssetWizard: FC<AssetWizardProps> = ({ categoryData, assetFields }): JSX.Element => {
  const [serverState, formAction, isPending] = useActionState(mintAssetAction, initialServerState);

  return (
    <AssetWizardProvider>
      <AssetWizardChildren
        {...{ categoryData, assetFields }}
        formAction={formAction}
        isPending={isPending}
        serverState={serverState}
      />
    </AssetWizardProvider>
  );
};

export default AssetWizard;
