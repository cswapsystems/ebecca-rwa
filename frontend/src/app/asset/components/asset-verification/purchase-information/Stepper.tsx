"use client";

import type { FC, JSX } from "react";
import { useMemo, useCallback } from "react";
import Image from "next/image";

import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";

import { StepperIndicator, StepperLine } from "./PurchaseInformationStyledElements";
import type { GetMintStatusDTO } from "@/blockchain/types";

interface StepperItem {
  title: string;
  description: string;
}

const PurchaseInformationStepper: FC<{ mintingStatus: GetMintStatusDTO | undefined }> = ({
  mintingStatus,
}): JSX.Element => {
  const stepperItems = useMemo<Array<StepperItem>>(
    () => [
      {
        title: "Asset Submission",
        description: "Asset details and documents submitted.",
      },
      {
        title: "Asset Verification",
        description: "Authenticity, ownership, and documentation review.",
      },
      {
        title: "Compliance Check",
        description: "KYC/AML and regulatory validation.",
      },
      {
        title: "Mint Completed",
        description: "Asset successfully minted on-chain; certificate generated.",
      },
    ],
    []
  );

  const numSteps = useMemo<number>(() => stepperItems.length, [stepperItems]);

  const isMinted = useMemo<boolean>(() => {
    if (!mintingStatus) return false;

    return Boolean(
      mintingStatus?.Status?.toLowerCase() === "minted" && mintingStatus?.PolicyId && mintingStatus?.TxHash
    );
  }, [mintingStatus]);

  const stepperIndicatorByIsMinted = useCallback(
    (index: number): { isComplete: boolean; isInactive: boolean } => {
      if (!isMinted) {
        return {
          isComplete: Boolean(index + 1 < numSteps),
          isInactive: Boolean(index + 1 === numSteps),
        };
      }

      return {
        isComplete: true,
        isInactive: false,
      };
    },
    [isMinted, numSteps]
  );

  return (
    <Flex.Column>
      {stepperItems.map((value, idx) => {
        const _isMinted = stepperIndicatorByIsMinted(idx);
        return (
          <Flex.Column rowGap="0px" key={String(idx)}>
            {/* TODO: Change variant logic later via state management */}
            <Flex.Row alignItems="center" columnGap="50px">
              <StepperIndicator $variant={_isMinted?.isComplete ? "complete" : "inactive"}>
                {_isMinted?.isComplete ? (
                  <Image src="/icons/checkmark.svg" alt="checkmark" width={19.83} height={14} objectFit="cover" />
                ) : (
                  <Typography.H6 weight={500} size="20px" texttransform="uppercase" color="#2D3648">
                    {idx + 1}
                  </Typography.H6>
                )}
              </StepperIndicator>
              <Flex.Column rowGap="12px">
                <Typography.Span
                  weight={600}
                  size="20px"
                  color={(theme) => theme.colors.base950}
                  style={{
                    opacity: _isMinted?.isComplete ? 1 : 0.5,
                  }}
                >
                  {value?.title}
                </Typography.Span>
                <Typography.P
                  weight={400}
                  size="14px"
                  color={(theme) => theme.colors.base800}
                  style={{
                    opacity: _isMinted?.isComplete ? 1 : 0.5,
                  }}
                >
                  {value?.description}
                </Typography.P>
              </Flex.Column>
            </Flex.Row>
            {idx + 1 < numSteps && <StepperLine />}
          </Flex.Column>
        );
      })}
    </Flex.Column>
  );
};

export default PurchaseInformationStepper;
