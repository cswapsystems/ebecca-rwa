export interface MintingRequestFilesDTO {
  mediaType: string;
  name: string;
  src: string;
}

export interface MintingRequestMetadataDTO {
  k: string;
  v: string;
}

export interface MintingRequestDTO {
  JobId: string;
  AssetId: string;
  AssetName: string;
  Files: Array<MintingRequestFilesDTO>;
  Metadata: Array<MintingRequestMetadataDTO>;
}

export interface MintingResponseDTO {
  message: string;
}
