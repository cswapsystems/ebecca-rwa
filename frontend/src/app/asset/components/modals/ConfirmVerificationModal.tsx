"use client";

import type { FC, JSX } from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { Modal, Typography, Button, Loader } from "@/components/common";
import { Flex } from "@/components/primitives";

import { useAssetWizardContext } from "../context/AssetWizardProvider";
import { useGenerateAssetCertificateMutation } from "@/lib/services/assetApi";
import type { CustomFileModel } from "../asset-metadata/documents/DocumentUploadTagPerStatus";

import { breakpoints } from "@/constants";

const StyledModal = styled(Modal).attrs({ contentClassName: "content" })`
  .content {
    border-radius: 24px;
    padding: 32px !important;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    .content {
      padding: 24px 16px !important;
    }
  }
`;

const ModalTitleDesktop = styled(Typography.H2)`
  font-size: 28px;
  line-height: 34px;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

const ModalTitleMobile = styled(Typography.H4)`
  display: none;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: block;
    font-size: 20px;
    line-height: 26px;
  }
`;

const DescriptionText = styled(Typography.P)`
  font-size: 16px;
  line-height: 20px;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

const ConfirmVerificationModal: FC<{ isLoading: boolean }> = ({ isLoading }): JSX.Element => {
  const { data, isConfirmVerificationModalOpen, setConfirmVerificationModalOpen, makeNextStep } =
    useAssetWizardContext();
  const [generateAssetCertificateMutate] = useGenerateAssetCertificateMutation();

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

  const onCloseCallback = useCallback((): void => {
    setConfirmVerificationModalOpen(false);
  }, [setConfirmVerificationModalOpen]);

  const onConfirmCallback = useCallback(async (): Promise<void> => {
    const blob = await generateAssetCertificateMutate({ data: [...certificateData] }).unwrap();

    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asset-certificate.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      // makeNextStep();
      // onCloseCallback();
    }
  }, [onCloseCallback, makeNextStep, generateAssetCertificateMutate, data, certificateData]);

  return (
    <StyledModal open={isConfirmVerificationModalOpen} onClose={onCloseCallback} showHeader={false}>
      <Flex.Column rowGap="24px">
        <Loader isLoading={isLoading} title="Verifying asset..." />
        {!isLoading && (
          <>
            <ModalTitleDesktop weight={600} color={(theme) => theme.colors.base950}>
              Confirm Verification
            </ModalTitleDesktop>
            <ModalTitleMobile weight={600} color={(theme) => theme.colors.base950}>
              Confirm Verification
            </ModalTitleMobile>
            <DescriptionText weight={400} color={(theme) => theme.colors.base600}>
              Once you verify, you can’t modify the metadata or document uploads until verification completes.
            </DescriptionText>
          </>
        )}
        <Flex.Row alignItems="center" columnGap="16px">
          <Button variant="secondary" width="100%" type="button" onClick={onCloseCallback} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" width="100%" type="submit" disabled={isLoading}>
            Confirm
          </Button>
        </Flex.Row>
      </Flex.Column>
    </StyledModal>
  );
};

export default ConfirmVerificationModal;
