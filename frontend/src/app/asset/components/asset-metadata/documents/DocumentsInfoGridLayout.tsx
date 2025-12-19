"use client";

import type { FC, JSX } from "react";
import { useMemo, Fragment, useCallback } from "react";
import Image from "next/image";
import styled from "styled-components";

import { Grid, Flex } from "@/components/primitives";
import { Typography } from "@/components/common";
import DocumentUploadTagPerStatus from "./DocumentUploadTagPerStatus";
import { useAssetWizardContext } from "../../context/AssetWizardProvider";

import { breakpoints } from "@/constants";

export interface DocumentsInfo {
  title: string;
  documentUploaded: boolean;
  document: Record<string, string> | Array<Record<string, string>> | null;
  maxFileCount?: number;
  assetFieldId: string;
}

const StyledGridContainer = styled(Grid.Container)`
  align-items: center;
  width: 100%;

  @media only screen and (min-width: 600px) and (max-width: ${breakpoints.s}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 60%;
  }
`;

const StyledGridItemMiddle = styled(Grid.Item)`
  justify-self: center;
`;

const StyledGridItemEnd = styled(Grid.Item)`
  justify-self: end;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    grid-column: span 1 !important;
    width: 100%;
  }
`;

const ExtraGridItemMobile = styled(Grid.Item)`
  display: none;
  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: block;
    grid-column: span 1 !important;
    width: 100%;
  }
`;

const StyledDocumentTitle = styled(Typography.Span)`
  text-decoration: underline;
`;

const StyledDocumentRemoveButtonContainer = styled.button`
  cursor: pointer;
  border: none;
  background: none;
`;

const DocumentsInfoGridLayout: FC<object> = (): JSX.Element => {
  const { data, updateField } = useAssetWizardContext();

  const documentsInfo = useMemo<DocumentsInfo[]>(
    () => (data?.assetDocuments as unknown as Array<DocumentsInfo>) ?? [],
    [data?.assetDocuments]
  );

  const removeUploadedDocument = useCallback(
    (document: DocumentsInfo | Record<string, string>): void => {
      if (!document?.title) {
        const documentObject = document as Record<string, string>;

        if (!documentsInfo) {
          return;
        }

        const newAssetDocumentsInfo = documentsInfo.map((docInfo) => {
          const docs = docInfo.document;
          if (!Array.isArray(docs)) return docInfo;

          const containsTarget = docs.some((d) => d.file_name === documentObject.file_name);

          if (!containsTarget) return docInfo;

          const updatedDocs = docs.filter((d) => d.file_name !== documentObject.file_name);

          return {
            ...docInfo,
            documentUploaded: updatedDocs.length > 0,
            document: updatedDocs.length > 0 ? updatedDocs : null,
          };
        });

        updateField("assetDocuments", newAssetDocumentsInfo, true);

        return;
      }
      const newDocumentsInfo = documentsInfo?.map((doc) => {
        if (doc.title === document.title) {
          return {
            ...doc,
            documentUploaded: false,
            document: null,
          };
        }
        return doc;
      });
      updateField("assetDocuments", newDocumentsInfo, true);
    },
    [documentsInfo, updateField]
  );

  return (
    <StyledGridContainer numColumns={3} mobileNumColumns={2} gap="12px">
      {documentsInfo.map((document) => (
        <Fragment key={JSON.stringify(document)}>
          <Grid.Item>
            <Typography.Span weight={500} size="16px" lineHeight="22px" color={(theme) => theme.colors.base950}>
              {document.title}
            </Typography.Span>
          </Grid.Item>
          <StyledGridItemMiddle>
            <DocumentUploadTagPerStatus
              status={document.documentUploaded ? "uploaded" : "missing"}
              document={document}
            />
          </StyledGridItemMiddle>
          <StyledGridItemEnd>
            {!!document?.document ? (
              !!document?.document && Array.isArray(document?.document) ? (
                <Flex.Column rowGap="12px">
                  {document?.document?.map((doc) => (
                    <Flex.Row columnGap="8px" key={String(doc?.file_name)}>
                      <StyledDocumentTitle
                        weight={500}
                        size="16px"
                        lineHeight="22px"
                        color={(theme) => theme.colors.primary400}
                      >
                        {doc?.file_name}
                      </StyledDocumentTitle>
                      <StyledDocumentRemoveButtonContainer type="button" onClick={() => removeUploadedDocument(doc)}>
                        <Image src="/icons/close.svg" alt="remove-document-icon" width={10} height={10} />
                      </StyledDocumentRemoveButtonContainer>
                    </Flex.Row>
                  ))}
                </Flex.Column>
              ) : (
                !!document?.document &&
                !Array.isArray(document?.document) &&
                !!document.document?.file_name && (
                  <Flex.Row columnGap="8px">
                    <StyledDocumentTitle
                      weight={500}
                      size="16px"
                      lineHeight="22px"
                      color={(theme) => theme.colors.primary400}
                    >
                      {document?.document?.file_name}
                    </StyledDocumentTitle>
                    <StyledDocumentRemoveButtonContainer type="button" onClick={() => removeUploadedDocument(document)}>
                      <Image src="/icons/close.svg" alt="remove-document-icon" width={10} height={10} />
                    </StyledDocumentRemoveButtonContainer>
                  </Flex.Row>
                )
              )
            ) : (
              <DocumentUploadTagPerStatus status="processing" document={document} />
            )}
          </StyledGridItemEnd>
          <ExtraGridItemMobile />
        </Fragment>
      ))}
    </StyledGridContainer>
  );
};

export default DocumentsInfoGridLayout;
