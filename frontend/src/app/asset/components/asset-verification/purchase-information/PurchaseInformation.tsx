"use client";

import type { FC, JSX } from "react";
import { useCallback } from "react";

import { Typography, Button } from "@/components/common";
import PurchaseInformationStepper from "./Stepper";
import TransactionHashDetails from "./TransactionHashDetails";
import { PurchaseInformationWrapperCard } from "./PurchaseInformationStyledElements";

import { useAsset } from "@/state/hooks";
import { useMint } from "@/state/hooks";
import { useGetMintingStatusByJobIdQuery } from "@/lib/services/mintApi";

const PurchaseInformation: FC<object> = (): JSX.Element => {
  const { mintJobId } = useMint();
  const { generatedCertificateUrl } = useAsset();

  const { data: mintingStatus } = useGetMintingStatusByJobIdQuery(mintJobId ?? "", {
    skip: !mintJobId || mintJobId === "",
  });

  const onDownloadCertificate = useCallback((): void => {
    if (!generatedCertificateUrl) return;
    const a = document.createElement("a");
    a.href = generatedCertificateUrl;
    a.download = "asset-certificate.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [generatedCertificateUrl]);

  return (
    <PurchaseInformationWrapperCard
      display="flex"
      gap="32px"
      flexDirection="column"
      borderRadius="16px"
      padding="24px"
      border="none"
      backgroundColor={(theme) => theme.colors.white}
      boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
    >
      <Typography.H3 weight={700} size="24px" lineHeight="30px" color="#2D3648" texttransform="capitalize">
        Asset tokenization status
      </Typography.H3>
      <TransactionHashDetails txHash={mintingStatus?.TxHash ?? null} policyId={mintingStatus?.PolicyId ?? null} />
      <PurchaseInformationStepper mintingStatus={mintingStatus} />
      <Button type="button" onClick={onDownloadCertificate} variant="secondary">
        Download Certificate
      </Button>
    </PurchaseInformationWrapperCard>
  );
};

export default PurchaseInformation;
