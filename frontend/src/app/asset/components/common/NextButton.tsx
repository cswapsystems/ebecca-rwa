"use client";

import type { FC, JSX, ButtonHTMLAttributes, MouseEvent } from "react";
import { useMemo } from "react";
import Image from "next/image";

import { Typography } from "@/components/common";
import { StyledNextCommonButton } from "./StyledElements";

import { useAssetWizardContext } from "../context/AssetWizardProvider";

interface Props extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "onClick"> {
  isLoading?: boolean;
}

const NextButton: FC<Props> = ({ style, isLoading, onClick }): JSX.Element => {
  const { makeNextStep, isCurrentStepComplete } = useAssetWizardContext();

  const isButtonDisabled = useMemo<boolean>(
    () => Boolean(!isCurrentStepComplete || isLoading),
    [isCurrentStepComplete, isLoading]
  );

  const onClickNext = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    onClick?.(evt);
    makeNextStep();
  };

  return (
    <StyledNextCommonButton type="button" onClick={onClickNext} disabled={isButtonDisabled} style={style}>
      <Typography.Span
        texttransform="capitalize"
        weight={500}
        size="18px"
        lineHeight="24px"
        color={(theme) => theme.colors.white}
      >
        next
      </Typography.Span>
      <Image src="/icons/arrow-right-white.svg" alt="Arrow Right" width={15} height={10.5} />
    </StyledNextCommonButton>
  );
};

export default NextButton;
