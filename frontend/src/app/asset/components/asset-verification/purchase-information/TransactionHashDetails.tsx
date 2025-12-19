"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC, JSX } from "react";

import { Typography } from "@/components/common";
import { Flex } from "@/components/primitives";

interface Props {
  txHash: string | null;
  policyId: string | null;
}

const transactionHyperLink = "https://preprod.cardanoscan.io/";

const TransactionHashDetails: FC<Props> = ({ txHash, policyId }): JSX.Element | null => {
  const shortenedHash = (value: string): string => {
    return `${value.slice(0, 4)}....${value.slice(-4)}`;
  };

  if (!txHash && !policyId) {
    return null;
  }

  return (
    <Flex.Column width="100%" rowGap="8px">
      {txHash && txHash?.length > 0 && (
        <Flex.Row width="100%" alignItems="center" justifyContent="space-between">
          <Typography.Span size="14px" weight={500} color={(theme) => theme.colors.base800} texttransform="capitalize">
            transaction hash
          </Typography.Span>
          <Link href={String(transactionHyperLink + `transaction/${txHash}`)} target="_blank" passHref>
            <Flex.Row alignItems="center" columnGap="2px" style={{ cursor: "pointer" }}>
              <Typography.Span size="14px" weight={600} color={(theme) => theme.colors.primary500}>
                {shortenedHash(txHash)}
              </Typography.Span>
              <Image src="/icons/external-link-icon.svg" alt="External Link" width={12} height={12} />
            </Flex.Row>
          </Link>
        </Flex.Row>
      )}
      {policyId && policyId?.length > 0 && (
        <Flex.Row width="100%" alignItems="center" justifyContent="space-between" style={{ cursor: "pointer" }}>
          <Typography.Span size="14px" weight={500} color={(theme) => theme.colors.base800}>
            Policy ID
          </Typography.Span>
          <Link href={String(transactionHyperLink + `tokenPolicy/${policyId}`)} target="_blank" passHref>
            <Flex.Row alignItems="center" columnGap="2px">
              <Typography.Span size="14px" weight={600} color={(theme) => theme.colors.primary500}>
                {shortenedHash(policyId)}
              </Typography.Span>
              <Image src="/icons/external-link-icon.svg" alt="External Link" width={12} height={12} />
            </Flex.Row>
          </Link>
        </Flex.Row>
      )}
    </Flex.Column>
  );
};

export default TransactionHashDetails;
