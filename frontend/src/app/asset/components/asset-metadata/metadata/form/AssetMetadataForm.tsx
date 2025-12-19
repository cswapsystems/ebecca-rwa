import type { FC, JSX } from "react";
import FormGridInputs from "./FormGridInputs";
import type { FormGridInputApiResponseDTO, GridLayout } from "./types";

interface Props {
  formInputData: Array<FormGridInputApiResponseDTO>;
  gridLayout: GridLayout;
}

const AssetMetaDataForm: FC<Props> = ({ formInputData, gridLayout }): JSX.Element => {
  return <FormGridInputs formData={formInputData} gridLayout={gridLayout} />;
};

export default AssetMetaDataForm;
