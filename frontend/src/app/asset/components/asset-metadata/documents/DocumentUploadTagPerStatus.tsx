"use client";

import type { FC, JSX, ChangeEvent } from "react";
import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import { Card, Typography } from "@/components/common";
import { Flex } from "@/components/primitives";
import { MAX_FILE_SIZE_BYTES } from "@/constants";
import type { DocumentsInfo } from "./DocumentsInfoGridLayout";
import useUploadImageToS3Mutation from "../../useUploadImageToS3Mutation";
import type { UploadImageSuccessResult } from "@/app/api/upload-image/route";

import { useAssetWizardContext } from "../../context/AssetWizardProvider";
import { useGetMaxFileSizeMB } from "@/hooks";

import { colors } from "@/styles/colors";

type DocumentUploadStatus = "missing" | "uploaded" | "processing";

interface DocumentUploadTagPerStatusProps {
  status: DocumentUploadStatus;
  document: DocumentsInfo;
}

export interface CustomFileModel {
  file_id: string;
  file_name: string;
  data: string;
  file_type: string;
}

const DocumentUploadProcessing = styled.button`
  border: none;
  display: flex;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.base50};
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 16px;
`;

const DocumentUploadTagPerStatus: FC<DocumentUploadTagPerStatusProps> = ({ document, status }): JSX.Element => {
  const { data, updateAllStateFields, updateAllImagesGalleryData } = useAssetWizardContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { mutateMultiple, isLoading: isUploading } = useUploadImageToS3Mutation();

  const onProcessingStatusUploadClick = (): void => {
    inputRef.current?.click?.();
  };

  const maxFileSizeMB = useGetMaxFileSizeMB();

  const isDocumentAssetImages = useMemo<boolean>(() => {
    return Boolean(document?.title?.toLowerCase()?.match(/asset images|upload images/));
  }, [document?.title]);

  const isUploadMultiple = useMemo<boolean>(() => {
    return typeof document?.maxFileCount === "number" ? Boolean(document?.maxFileCount > 1) : false;
  }, [document?.maxFileCount]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      const files = event.target.files;
      if (!files || files?.length === 0) return;

      const filesArray = Array.from(files);

      if (document?.maxFileCount && filesArray.length > document?.maxFileCount) {
        setUploadError(`You can upload a maximum of ${document?.maxFileCount} file(s).`);
        event.target.value = "";
        return;
      }

      const isValid = filesArray.every((file) => {
        const isImage = file.type.startsWith("image/");
        const isPdf = file.type === "application/pdf";

        const hasSpace = file.name.includes(" ");
        if (hasSpace) {
          setUploadError("File name must not contain spaces.");
          event.target.value = "";
          return false;
        }

        if (!isDocumentAssetImages && !isImage && !isPdf) {
          setUploadError("Please upload an image or PDF file only.");
          event.target.value = "";
          return false;
        }

        if (isDocumentAssetImages && !isImage) {
          setUploadError("Please upload image files only.");
          event.target.value = "";
          return false;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
          setUploadError(`File size must not exceed ${maxFileSizeMB}.`);
          event.target.value = "";
          return false;
        }

        return true;
      });

      if (!isValid) return;

      const uploadResults: UploadImageSuccessResult[] | null = await mutateMultiple(filesArray);

      const assetDocuments = data?.assetDocuments as Array<DocumentsInfo>;
      const findAssetDocument = assetDocuments?.find((doc) => doc?.title === document?.title);

      if (findAssetDocument && uploadResults) {
        const uploadImageResult: Array<CustomFileModel> = uploadResults
          .filter((item, index) => {
            const file = filesArray[index];

            return !!item && item?.fileUrl && file;
          })
          .map((result, index) => {
            const file = filesArray[index];
            return {
              file_id: result?.key ?? "",
              file_name: file.name,
              data: result?.fileUrl ?? "",
              file_type: file.type,
            } satisfies CustomFileModel;
          });

        const updatedAssetDocuments = assetDocuments?.map((doc) => {
          if (doc?.title === document?.title) {
            const documentPayload = uploadImageResult.map((file) => ({
              ...file,
            }));
            return {
              ...doc,
              title: doc?.title,
              document: documentPayload,
              documentUploaded: true,
            };
          }
          return doc;
        });

        setUploadError(null);
        const filterAssetDocumentsByImagesData = updatedAssetDocuments?.find((doc) =>
          doc.title?.toLowerCase()?.match(/asset images|upload images/)
        );

        if (filterAssetDocumentsByImagesData) {
          updateAllImagesGalleryData(
            (filterAssetDocumentsByImagesData.document as Array<CustomFileModel>)?.map((doc) => ({
              id: doc.file_id,
              url: doc.data,
            })) ?? []
          );
        }

        updateAllStateFields("assetDocuments", updatedAssetDocuments);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload file(s). Please try again.");
    }
  };

  if (isUploading) {
    return (
      <Card
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        backgroundColor={(theme) => theme.colors.white}
        border={`1px solid ${colors.base600}`}
        padding="6px 12px"
        borderRadius="16px"
        width="fit-content"
      >
        <Typography.Span
          texttransform="capitalize"
          size="16px"
          lineHeight="22px"
          weight={400}
          color={(theme) => theme.colors.base600}
        >
          uploading...
        </Typography.Span>
      </Card>
    );
  }

  if (status === "missing") {
    return (
      <Card
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        backgroundColor={(theme) => theme.colors.white}
        border={`1px solid ${colors.base600}`}
        padding="6px 12px"
        borderRadius="16px"
        width="fit-content"
      >
        <Image src="/icons/warning.svg" width={20} height={17.5} alt="document-missing-icon" objectFit="contain" />
        <Typography.Span
          texttransform="capitalize"
          size="16px"
          lineHeight="22px"
          weight={400}
          color={(theme) => theme.colors.base600}
        >
          missing
        </Typography.Span>
      </Card>
    );
  }

  if (status === "uploaded") {
    return (
      <Card
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        backgroundColor={(theme) => theme.colors.base50}
        border="none"
        padding="6px 12px"
        borderRadius="16px"
        width="fit-content"
      >
        <Image
          src="/icons/checkmark-primary.svg"
          width={14.17}
          height={10}
          alt="document-uploaded-icon"
          objectFit="contain"
        />
        <Typography.Span
          texttransform="capitalize"
          weight={400}
          size="16px"
          lineHeight="22px"
          color={(theme) => theme.colors.primary900}
        >
          uploaded
        </Typography.Span>
      </Card>
    );
  }

  return (
    <Flex.Column rowGap="4px" alignItems="flex-end" justifyContent="flex-end">
      <div>
        <DocumentUploadProcessing type="button" onClick={onProcessingStatusUploadClick}>
          <Image
            src="/icons/upload.svg"
            width={18.63}
            height={15.83}
            alt="document-processing-icon"
            objectFit="contain"
          />
          <Typography.Span
            texttransform="capitalize"
            weight={400}
            size="16px"
            lineHeight="22px"
            color={(theme) => theme.colors.primary900}
          >
            upload
          </Typography.Span>
        </DocumentUploadProcessing>

        <input
          ref={inputRef}
          type="file"
          accept={isDocumentAssetImages ? "image/*" : ["image/*", "application/pdf"].join(", ")}
          multiple={!!isUploadMultiple}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      {!!uploadError && (
        <Typography.Span size="10px" weight={500} color={(theme) => theme.colors.negative500}>
          {uploadError}
        </Typography.Span>
      )}
    </Flex.Column>
  );
};

export default DocumentUploadTagPerStatus;
