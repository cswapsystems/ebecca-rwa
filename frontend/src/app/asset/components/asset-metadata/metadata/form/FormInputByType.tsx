"use client";

import type { FC, JSX } from "react";

import {
  FormTextInput,
  FormInputWrapper,
  FormYearBuiltDropdownInputWrapper,
  FormLabel,
  FormDropdownInput,
  FormTextArea,
} from "./AssetMetadataFormStyledElements";
import FormSwitchGroup from "./FormSwitchGroup";
import { RadioGroup, DatePicker, CheckboxGroup } from "@/components/common";
import type { FormGridInputApiResponseDTO } from "./types";

import { useAssetWizardContext } from "../../../context/AssetWizardProvider";

import { toCamelCase } from "@/utils";
import { colors } from "@/styles/colors";

interface Props {
  data: FormGridInputApiResponseDTO;
}

type HasMetadataFields = {
  metadataFields?: Record<string, string>;
};

const AUTOMATIC_SYNC_METADATA_FIELDS = ["description"];

const FormInputByType: FC<Props> = ({ data }): JSX.Element => {
  const { type } = data;
  const { data: assetFormData, updateField, updateAllStateDatas } = useAssetWizardContext();

  const mdFields = (assetFormData as HasMetadataFields).metadataFields ?? {};

  const automaticSyncMetadataFields = AUTOMATIC_SYNC_METADATA_FIELDS;

  switch (type) {
    case "select":
      return (
        <FormYearBuiltDropdownInputWrapper rowGap="8px">
          <FormLabel weight={500} texttransform="capitalize" color={(theme) => theme.colors.base300}>
            {data?.label}
          </FormLabel>
          <FormDropdownInput
            options={data?.options || []}
            value={{
              label: mdFields?.[toCamelCase(data?.label)] ?? "",
              value: mdFields?.[toCamelCase(data?.label)] ?? "",
            }}
            name={toCamelCase(data?.label)}
            onOptionSelect={(val) => updateField(`metadataFields.${toCamelCase(data?.label)}`, val, true)}
            labelWidth="70%"
            fontSize="inherit"
            labelGap="16px"
            placeholder="Select"
            borderRadius={12}
            border={`1px solid ${colors.base200}`}
            padding="8px 12px"
          />
        </FormYearBuiltDropdownInputWrapper>
      );
    case "switch":
      return <FormSwitchGroup switchItems={[data?.label]} />;
    case "radio":
      return (
        <RadioGroup
          title={data?.label}
          value={mdFields?.[toCamelCase(data?.label)] ?? ""}
          options={data?.options ?? []}
          onChange={(val) => updateField(`metadataFields.${toCamelCase(data?.label)}`, val, true)}
        />
      );
    case "checkbox":
      return (
        <CheckboxGroup
          title={data?.label}
          value={(mdFields?.[toCamelCase(data?.label)] as unknown as string[]) ?? []}
          options={data?.options ?? []}
          onChange={(val) => updateField(`metadataFields.${toCamelCase(data?.label)}`, val, true)}
        />
      );
    case "date":
      return (
        <DatePicker
          title={data?.label}
          selectedDate={mdFields?.[toCamelCase(data?.label)] ? new Date(mdFields[toCamelCase(data.label)]) : undefined}
          onDateChange={(date) =>
            date && updateField(`metadataFields.${toCamelCase(data?.label)}`, date.toISOString(), true)
          }
        />
      );
    case "textarea":
      return (
        <FormTextArea
          value={mdFields?.[toCamelCase(data?.label)] ?? ""}
          label={data?.label ?? ""}
          onChange={(evt) => {
            const dataLabelLowerCase = data.label?.toLowerCase();
            if (dataLabelLowerCase === "description" && automaticSyncMetadataFields.includes(dataLabelLowerCase)) {
              updateAllStateDatas({ ...assetFormData, assetDescription: evt?.target?.value });
            }
            updateField(`metadataFields.${toCamelCase(data?.label)}`, evt?.target?.value, true);
          }}
          borderRadius={12}
          padding="8px 12px"
          placeholder={`Input ${data?.label.toLowerCase()}`}
        />
      );
    default:
      return (
        <FormInputWrapper rowGap="8px">
          <FormLabel weight={500} texttransform="capitalize" color={(theme) => theme.colors.base300}>
            {data?.label}
          </FormLabel>
          <FormTextInput
            value={mdFields?.[toCamelCase(data?.label)] || ""}
            name={data.label}
            onChange={(evt) => {
              const dataLabelLowerCase = data.label?.toLowerCase();
              if (dataLabelLowerCase === "description" && automaticSyncMetadataFields.includes(dataLabelLowerCase)) {
                updateAllStateDatas({ ...assetFormData, assetDescription: evt?.target?.value });
              }
              updateField(`metadataFields.${toCamelCase(data?.label)}`, evt?.target?.value, true);
            }}
            type={type === "number" ? "number" : "text"}
            borderRadius={12}
            padding="8px 12px"
            placeholder={`Input ${data?.label.toLowerCase()}`}
            inputBorder="none"
            inputOutline="none"
          />
        </FormInputWrapper>
      );
  }
};

export default FormInputByType;
