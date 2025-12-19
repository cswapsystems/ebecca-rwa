"use client";

import type { FC, JSX } from "react";
import { useMemo } from "react";

import { Grid } from "@/components/primitives";
import { FormGridItem } from "./AssetMetadataFormStyledElements";
import FormInputByType from "./FormInputByType";
import type { FormGridInputApiResponseDTO, GridLayout } from "./types";

type Props = {
  formData: Array<FormGridInputApiResponseDTO>;
  gridLayout: GridLayout;
};

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
};

// TODO: Replace manual label later with TextInput's label prop
const FormGridInputs: FC<Props> = ({ formData, gridLayout }): JSX.Element => {
  const gridContainerColumns = useMemo<number>(() => {
    const word = gridLayout.split("-")[0] as keyof typeof numberWords;
    return numberWords[word] || 0;
  }, [gridLayout]);

  return (
    <Grid.Container
      numColumns={gridContainerColumns}
      mobileNumColumns={gridContainerColumns > 1 ? gridContainerColumns - 1 : 1}
      width="100%"
      gap="12px"
    >
      {formData?.length > 0 &&
        formData?.map((fd, idx) => {
          return (
            <FormGridItem key={`${fd.label}-${idx}`} colSpan={fd.column ?? 1} mobileColSpan={1}>
              <FormInputByType data={fd} />
            </FormGridItem>
          );
        })}
    </Grid.Container>
  );
};

export default FormGridInputs;
