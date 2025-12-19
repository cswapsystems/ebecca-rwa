"use server";

import type { ServerFormState } from "./mintAssetServerValues";

import type { MintingRequestDTO, MintingRequestFilesDTO, MintingRequestMetadataDTO, MintingResponseDTO } from "@/types";
import type { CustomFileModel } from "@/app/asset/components/asset-metadata/documents/DocumentUploadTagPerStatus";
import type { DocumentsInfo } from "@/app/asset/components/asset-metadata/documents/DocumentsInfoGridLayout";

import { MINT_BASE_API_URL } from "../constants";

function transformToMintingMetadata(obj: Record<string, string>): MintingRequestMetadataDTO[] {
  return Object.entries(obj).map(([key, value]) => ({
    k: key,
    v: value != null ? String(value) : "",
  }));
}

const minterJobsApiUrl = `${MINT_BASE_API_URL}/minter/jobs`;

export async function mintAssetAction(prevState: ServerFormState, formData: FormData): Promise<ServerFormState> {
  const values = Object.fromEntries(formData.entries());

  const assetDocuments =
    typeof values?.assetDocuments === "string" ? JSON.parse(values?.assetDocuments) : (values?.assetDocuments ?? []);

  const files: Array<CustomFileModel> =
    assetDocuments && Array.isArray(assetDocuments)
      ? (assetDocuments as unknown as Array<DocumentsInfo>)?.flatMap(
          (doc) => (doc?.document as unknown as Array<CustomFileModel>) ?? []
        )
      : [];

  const metadataFromFields = transformToMintingMetadata(
    values?.metadataFields ? JSON.parse(values?.metadataFields as unknown as string) : {}
  );

  const firstImageMetadata = (assetDocuments as Array<DocumentsInfo>)?.find(
    (d) => d?.title?.toLowerCase() === "upload images"
  ) as unknown as Record<string, Record<string, string>[]>;

  const filesPayload: MintingRequestFilesDTO[] = [
    ...files?.map((file) => ({
      mediaType: file?.file_type,
      name: file?.file_name,
      src: file?.data,
    })),
  ];

  if (values?.certificate) {
    filesPayload.push({
      mediaType: "application/pdf",
      name: "generated-asset-certificate.pdf",
      src: values?.certificate as unknown as string,
    });
  }

  const payload = {
    JobId: crypto.randomUUID(),
    AssetId: (values?.asset_id as unknown as string) ?? "1234567890",
    AssetName: (values?.name as unknown as string) ?? "Tokenized Asset",
    Files: filesPayload,
    Metadata: [
      ...metadataFromFields,
      {
        k: "description",
        v: values?.description as string,
      },
      {
        k: "image",
        v: firstImageMetadata ? (firstImageMetadata?.document?.[0] as unknown as Record<string, string>)?.data : "",
      },
      {
        k: "mediaType",
        v: "image/png",
      },
      {
        k: "value",
        v: values?.value as string,
      },
    ],
  } satisfies MintingRequestDTO;

  // minting trigger
  const res = await fetch(minterJobsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const response = (await res.json()) as MintingResponseDTO;
    console.info("response: ", response);
    return {
      status: "success",
      data: payload,
    };
  }

  return {
    status: "success",
    data: null,
  };
}
