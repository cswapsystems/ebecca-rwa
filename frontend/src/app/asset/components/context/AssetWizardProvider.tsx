"use client";

import type { FC, JSX, PropsWithChildren } from "react";
import { createContext, useContext, useState, useCallback, useMemo } from "react";

import { useAsset } from "@/state/hooks";

import type { AssetWizardCommonDataDTO } from "../data/types";
import type { KeywordItemDTO } from "../keywords-select/types";
import type { DocumentsInfo } from "../asset-metadata/documents/DocumentsInfoGridLayout";
import type { ProductGalleryDataDTO } from "@/components/shared/product-details/product-gallery-investment/product-gallery/types";

import type { AssetType } from "@/types";

export type AssetDocuments = Pick<DocumentsInfo, "document" | "documentUploaded">;

export interface AssetWizardFormData {
  category: string;
  subcategory: string;
  subcategoryAssetType: string;
  keywords: Array<KeywordItemDTO>;
  assetDocuments: Array<DocumentsInfo>;
  assetValue: string;
  assetDescription: string;
  assetDetails: string;
  assetName: string;
  name: string;
}

export type AssetWizardFormErrors = Partial<Record<keyof AssetWizardFormData, string>> | Record<string, unknown>;

interface AssetWizardContextValues {
  currentStep: number;
  data: AssetWizardFormData | Record<string, string | object | unknown>;
  errors: AssetWizardFormErrors;
  selectedCategoryId: AssetWizardCommonDataDTO["id"] | null;
  selectedCategory: AssetWizardCommonDataDTO["title"] | null;
  selectedSubcategory: AssetWizardCommonDataDTO["title"] | null;
  selectedSubcategoryId: AssetWizardCommonDataDTO["id"] | null;
  selectedKeywords: Array<KeywordItemDTO>;
  selectedAssetTypeId: AssetType["assetTypeId"] | null;
  isCurrentStepComplete: boolean;
  isFormComplete: boolean;
  isConfirmVerificationModalOpen: boolean;
  assetWizardMetadataFields: Array<string>;
  imageGalleryData: Array<ProductGalleryDataDTO> | null;
}

interface AssetWizardContextActions {
  setCurrentStep: (data: AssetWizardContextValues["currentStep"]) => void;
  makeNextStep: () => void;
  makePreviousStep: () => void;
  setSelectedCategoryId: (categoryId: AssetWizardContextValues["selectedCategoryId"]) => void;
  updateSelectedCategoryIds: (categoryId: AssetWizardContextValues["selectedCategoryId"]) => void;
  setSelectedCategory: (category: AssetWizardContextValues["selectedCategory"]) => void;
  setSelectedCategoryNames: (category: AssetWizardContextValues["selectedCategory"]) => void;
  setSelectedSubcategoryId: (categoryId: AssetWizardContextValues["selectedSubcategoryId"]) => void;
  setSelectedSubcategory: (category: AssetWizardContextValues["selectedSubcategory"]) => void;
  setSelectedSubcategoryNames: (category: AssetWizardContextValues["selectedSubcategory"]) => void;
  updateSelectedSubcategoryIds: (categoryId: AssetWizardContextValues["selectedSubcategoryId"]) => void;
  setSelectedKeywords: (keywords: AssetWizardContextValues["selectedKeywords"]) => void;
  updateAllSelectedStateKeywords: (keywords: AssetWizardContextValues["selectedKeywords"]) => void;
  setConfirmVerificationModalOpen: (open: AssetWizardContextValues["isConfirmVerificationModalOpen"]) => void;
  setAssetWizardMetadataFields: (data: AssetWizardContextValues["assetWizardMetadataFields"]) => void;
  setData: (data: AssetWizardContextValues["data"]) => void;
  setSelectedAssetTypeId: (data: AssetWizardContextValues["selectedAssetTypeId"]) => void;
  setSelectedAssetTypeIds: (data: AssetWizardContextValues["selectedAssetTypeId"]) => void;
  setImageGalleryData: (data: AssetWizardContextValues["imageGalleryData"]) => void;
  updateAllImagesGalleryData: (data: AssetWizardContextValues["imageGalleryData"]) => void;
  updateAllStateDatas: (data: AssetWizardContextValues["data"]) => void;
  updateAllStateFields: (
    name: keyof AssetWizardFormData | string,
    value: string | Array<KeywordItemDTO> | boolean | Array<DocumentsInfo>
  ) => void;
  updateField: (
    name: keyof AssetWizardFormData | string,
    value: string | Array<KeywordItemDTO> | boolean | Array<DocumentsInfo> | Array<string>,
    updateAllStates?: boolean
  ) => void;
  validateAll: () => boolean;
}

type AssetWizardContextType = AssetWizardContextValues & AssetWizardContextActions;

const initState: AssetWizardContextValues = {
  currentStep: 1,
  selectedCategoryId: null,
  selectedCategory: null,
  selectedSubcategoryId: null,
  selectedSubcategory: null,
  selectedAssetTypeId: null,
  data: {
    category: "",
    subcategory: "",
    subcategoryAssetType: "",
    keywords: [],
    assetDocuments: [],
    metadataFields: {},
    assetValue: "",
    assetDescription: "",
    assetDetails: "",
    assetName: "",
    name: "",
  },
  errors: {},
  selectedKeywords: [],
  isConfirmVerificationModalOpen: false,
  isCurrentStepComplete: false,
  isFormComplete: false,
  assetWizardMetadataFields: [],
  imageGalleryData: null,
};

export const MAX_STEP_COUNT: number = 6;

const AssetWizardContext = createContext<AssetWizardContextType | undefined>(undefined);

const AssetWizardProvider: FC<PropsWithChildren<object>> = ({ children }): JSX.Element => {
  const [values, setValues] = useState<AssetWizardContextValues>({
    currentStep: initState.currentStep,
    selectedCategoryId: initState.selectedCategoryId,
    selectedCategory: initState.selectedCategory,
    selectedSubcategoryId: initState.selectedSubcategoryId,
    selectedSubcategory: initState.selectedSubcategory,
    selectedKeywords: initState.selectedKeywords,
    isConfirmVerificationModalOpen: initState.isConfirmVerificationModalOpen,
    errors: initState.errors,
    data: initState.data,
    isCurrentStepComplete: initState.isCurrentStepComplete,
    isFormComplete: initState.isFormComplete,
    assetWizardMetadataFields: initState.assetWizardMetadataFields,
    selectedAssetTypeId: initState.selectedAssetTypeId,
    imageGalleryData: initState.imageGalleryData,
  });
  const {
    formDraftStep,
    updateAssetFormDraftStep,
    updateAssetFormDraftCategoryId,
    updateAssetFormDraftSubcategoryId,
    updateAssetFormDraftKeywords,
    updateAssetFormDraftCategoryName,
    updateAssetFormDraftSubcategoryName,
    updateAssetFormData,
    updateAssetFormDraftAssetTypeId,
    updateAssetFormDraftImageGalleryData,
  } = useAsset();

  const assetWizardFormStepFields = useMemo<(keyof AssetWizardFormData | string)[][]>(() => {
    return [
      ["category"], // step 1
      ["subcategory", "subcategoryAssetType"], // step 2
      ["keywords"], // step 3
      [...values.assetWizardMetadataFields], // step 4
      ["name", "assetValue", "assetDescription"], // step 5
      [], // step 6
    ];
  }, [values.assetWizardMetadataFields]);

  const setCurrentStep = useCallback((data: number): void => {
    setValues((prevState) => ({
      ...prevState,
      currentStep: data,
    }));
  }, []);

  const makeNextStep = useCallback((): void => {
    setValues((prevState) => ({
      ...prevState,
      currentStep: prevState.currentStep + 1 >= MAX_STEP_COUNT ? MAX_STEP_COUNT : prevState.currentStep + 1,
    }));
    updateAssetFormDraftStep(typeof formDraftStep !== "number" ? 2 : formDraftStep + 1);
  }, [updateAssetFormDraftStep, formDraftStep]);

  const makePreviousStep = useCallback((): void => {
    if (values.currentStep === 1) return;
    setValues((prevState) => ({
      ...prevState,
      currentStep: prevState.currentStep - 1,
    }));
    updateAssetFormDraftStep(formDraftStep! - 1);
  }, [values.currentStep, formDraftStep, updateAssetFormDraftStep]);

  const setSelectedCategoryId = useCallback((data: string | null): void => {
    setValues((prevState) => ({
      ...prevState,
      selectedCategoryId: data,
    }));
  }, []);

  const updateSelectedCategoryIds = useCallback(
    (data: string | null): void => {
      updateAssetFormDraftCategoryId(data);
      setSelectedCategoryId(data);
    },
    [updateAssetFormDraftCategoryId, setSelectedCategoryId]
  );

  const setSelectedCategory = useCallback((data: string | null): void => {
    setValues((prevState) => ({
      ...prevState,
      selectedCategory: data,
    }));
  }, []);

  const setSelectedCategoryNames = useCallback(
    (data: string | null): void => {
      setSelectedCategory(data);
      updateAssetFormDraftCategoryName(data);
    },
    [setSelectedCategory, updateAssetFormDraftCategoryName]
  );

  const setSelectedSubcategoryId = useCallback((data: string | null): void => {
    setValues((prevState) => ({
      ...prevState,
      selectedSubcategoryId: data,
    }));
  }, []);

  const setSelectedSubcategory = useCallback((data: string | null): void => {
    setValues((prevState) => ({
      ...prevState,
      selectedSubcategory: data,
    }));
  }, []);

  const setSelectedSubcategoryNames = useCallback(
    (data: string | null): void => {
      setSelectedSubcategory(data);
      updateAssetFormDraftSubcategoryName(data);
    },
    [setSelectedSubcategory, updateAssetFormDraftSubcategoryName]
  );

  const updateSelectedSubcategoryIds = useCallback(
    (data: string | null): void => {
      updateAssetFormDraftSubcategoryId(data);
      setSelectedSubcategoryId(data);
    },
    [updateAssetFormDraftSubcategoryId, setSelectedSubcategoryId]
  );

  const setSelectedKeywords = useCallback((data: KeywordItemDTO[]): void => {
    setValues((prevState) => ({
      ...prevState,
      selectedKeywords: data,
    }));
  }, []);

  const updateAllSelectedStateKeywords = useCallback(
    (data: KeywordItemDTO[]): void => {
      updateAssetFormDraftKeywords(data);
      setSelectedKeywords(data);
    },
    [setSelectedKeywords, updateAssetFormDraftKeywords]
  );

  const setConfirmVerificationModalOpen = useCallback((data: boolean): void => {
    setValues((prevState) => ({
      ...prevState,
      isConfirmVerificationModalOpen: data,
    }));
  }, []);

  const setAssetWizardMetadataFields = useCallback((data: Array<string>): void => {
    setValues((prevState) => ({
      ...prevState,
      assetWizardMetadataFields: data,
    }));
  }, []);

  const setData = useCallback((data: AssetWizardFormData | Record<string, string | object | unknown>): void => {
    setValues((prevState) => ({
      ...prevState,
      data,
    }));
  }, []);

  const setSelectedAssetTypeId = useCallback((data: string | null): void => {
    setValues((prevState) => ({
      ...prevState,
      selectedAssetTypeId: data,
    }));
  }, []);

  const setSelectedAssetTypeIds = useCallback(
    (data: string | null): void => {
      setSelectedAssetTypeId(data);
      updateAssetFormDraftAssetTypeId(data);
    },
    [setSelectedAssetTypeId, updateAssetFormDraftAssetTypeId]
  );

  const setImageGalleryData = useCallback((data: Array<ProductGalleryDataDTO> | null): void => {
    setValues((prevState) => ({
      ...prevState,
      imageGalleryData: data,
    }));
  }, []);

  const updateAllImagesGalleryData = useCallback(
    (data: Array<ProductGalleryDataDTO> | null): void => {
      setImageGalleryData(data);
      updateAssetFormDraftImageGalleryData(data);
    },
    [setImageGalleryData, updateAssetFormDraftImageGalleryData]
  );

  const updateAllStateDatas = useCallback(
    (data: AssetWizardFormData | Record<string, string | object | unknown>): void => {
      updateAssetFormData(data);
      setData(data);
    },
    [updateAssetFormData, setData]
  );

  const validateStep = useCallback(
    (stepIndex: number): AssetWizardFormErrors => {
      const requiredFields = assetWizardFormStepFields[stepIndex] ?? [];
      const stepErrors: Record<string, string | object> = {};

      const data = initState.data as Record<string, unknown>;

      for (const field of requiredFields) {
        const key = String(field);
        const value = data[key];

        const isEmpty =
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          stepErrors[key] = "This field is required";
        }
      }

      return stepErrors;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initState.data]
  );

  const validateAll = useCallback((): boolean => {
    const allErrors: AssetWizardFormErrors = {};
    assetWizardFormStepFields.forEach((_, idx) => {
      const stepErrors = validateStep(idx);
      Object.assign(allErrors, stepErrors);
    });

    setValues((prevState) => ({
      ...prevState,
      errors: allErrors,
    }));
    return Object.keys(allErrors).length === 0;
  }, [validateStep, assetWizardFormStepFields]);

  const updateField = useCallback(
    (
      name: keyof AssetWizardFormData | string,
      value: string | Array<KeywordItemDTO> | boolean | Array<DocumentsInfo> | Array<string>,
      updateAllStates?: boolean
    ): void => {
      const path = String(name).split(".");

      const setNestedValue = (obj: Record<string, unknown>, keys: string[], val: unknown): Record<string, unknown> => {
        if (keys.length === 0) return obj;

        const [key, ...rest] = keys;

        if (rest.length === 0) {
          return {
            ...obj,
            [key]: val,
          };
        }

        const current = obj[key];
        const currentObj = current && typeof current === "object" ? (current as Record<string, unknown>) : {};

        return {
          ...obj,
          [key]: setNestedValue(currentObj, rest, val),
        };
      };

      if (updateAllStates) {
        const newData = setNestedValue((values.data ?? {}) as Record<string, unknown>, path, value);

        if (Object.keys(newData).length > 0) {
          updateAssetFormData({ ...newData });
        }
      }

      setValues((prevState) => {
        const updatedErrors = { ...prevState.errors };
        delete (updatedErrors as Record<string, unknown>)[String(name)];

        const newData = setNestedValue(prevState.data as unknown as Record<string, unknown>, path, value);

        return {
          ...prevState,
          data: newData,
          errors: updatedErrors,
        };
      });
    },
    [updateAssetFormData, values.data]
  );

  const updateAllStateFields = useCallback(
    (
      name: keyof AssetWizardFormData | string,
      value: string | Array<KeywordItemDTO> | boolean | Array<DocumentsInfo>
    ): void => {
      updateField(name, value, true);
    },
    [updateField]
  );

  const isCurrentStepComplete = useMemo((): boolean => {
    const stepIndex = values.currentStep;
    const isKeywordsStep = Boolean(stepIndex === 3);
    const isMetaDataStep = Boolean(stepIndex === 4);

    if (isKeywordsStep) {
      const keywords = values.data?.keywords as KeywordItemDTO[];
      return keywords !== undefined && keywords.length > 0;
    }

    if (isMetaDataStep) {
      const requiredFields = assetWizardFormStepFields[stepIndex - 1];
      for (const field of requiredFields) {
        const data = values.data as Record<string, unknown>;
        const v = data[field];
        if (field === "assetDocuments") {
          const docs = v as Array<DocumentsInfo>;
          const allUploaded = docs.every((doc) => !!doc.documentUploaded);
          if (!allUploaded) {
            return false;
          }
        } else {
          const formField = (data as { metadataFields: Record<string, unknown> }).metadataFields[field];
          if (formField === undefined || (typeof formField === "string" && String(formField).trim().length === 0)) {
            return false;
          }
        }
      }
      return true;
    }

    return assetWizardFormStepFields[stepIndex - 1].every((field) => {
      const data = values.data as Record<string, unknown>;
      const v = data[field];
      return v !== undefined && String(v).trim().length > 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.currentStep, values.data]);

  const allRequiredFields = useMemo(() => assetWizardFormStepFields.flat(), []);

  const isFormComplete = useMemo((): boolean => {
    return allRequiredFields.every((field) => {
      const data = values.data as Record<string, unknown>;
      const v = data[field];
      return v !== undefined && String(v).trim().length > 0;
    });
  }, [allRequiredFields, values.data]);

  return (
    <AssetWizardContext.Provider
      value={{
        ...values,
        isCurrentStepComplete,
        isFormComplete,
        setCurrentStep,
        makeNextStep,
        makePreviousStep,
        setSelectedCategoryId,
        updateSelectedCategoryIds,
        setSelectedCategory,
        setSelectedCategoryNames,
        setSelectedSubcategoryId,
        setSelectedSubcategory,
        setSelectedSubcategoryNames,
        updateSelectedSubcategoryIds,
        setSelectedKeywords,
        updateAllSelectedStateKeywords,
        setConfirmVerificationModalOpen,
        setAssetWizardMetadataFields,
        setData,
        setSelectedAssetTypeId,
        setSelectedAssetTypeIds,
        setImageGalleryData,
        updateAllImagesGalleryData,
        updateAllStateDatas,
        updateField,
        updateAllStateFields,
        validateAll,
      }}
    >
      {children}
    </AssetWizardContext.Provider>
  );
};

export const useAssetWizardContext = (): AssetWizardContextType => {
  try {
    const context = useContext(AssetWizardContext);
    if (!context) {
      throw new Error("useAssetWizardContext must be used within an AssetWizardProvider");
    }
    return context;
  } catch {
    throw new Error("useAssetWizardContext must be used within an AssetWizardProvider");
  }
};

export default AssetWizardProvider;
