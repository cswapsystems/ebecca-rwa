export interface FormGridOptionsDTO {
  label: string;
  value: string;
}

export interface BaseFormGridInputApiResponseDTO {
  label: string;
  column: number;
}

interface FormGridInputApiCommonResponseDTO {
  assetFieldId: string;
}

export interface SelectFormGridInputApiResponseDTO
  extends BaseFormGridInputApiResponseDTO,
    FormGridInputApiCommonResponseDTO {
  type: "select";
  options: Array<FormGridOptionsDTO>;
}

export interface NonSelectGridInputApiResponseDTO
  extends BaseFormGridInputApiResponseDTO,
    FormGridInputApiCommonResponseDTO {
  type: string;
  options?: never;
}

export type FormGridInputApiResponseDTO = SelectFormGridInputApiResponseDTO | NonSelectGridInputApiResponseDTO;

export type GridLayout = "one-column" | "two-column" | "three-column" | "four-column" | "five-column";
