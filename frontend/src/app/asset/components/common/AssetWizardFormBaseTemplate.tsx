"use client";

import type { FC, JSX, PropsWithChildren } from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";
import PageBackButton from "@/components/common/buttons/PageBackButton";
import { BaseTemplateMainTitleDesktop, BaseTemplateMainTitleMobile } from "./StyledElements";

import { useAssetWizardContext } from "../context/AssetWizardProvider";

interface AssetWizardFormBaseTemplateProps {
  withBack?: boolean;
  mainTitle?: string;
  subTitle?: string;
  isLoading?: boolean;
}

const AssetWizardFormBaseTemplate: FC<PropsWithChildren<AssetWizardFormBaseTemplateProps>> = ({
  children,
  mainTitle,
  subTitle,
  withBack,
  isLoading = false,
}): JSX.Element => {
  const router = useRouter();
  const { makePreviousStep, currentStep } = useAssetWizardContext();

  const onPageBackClick = useCallback((): void => {
    if (currentStep === 1) {
      router.replace("/portfolio");
      return;
    }
    makePreviousStep();
  }, [currentStep, makePreviousStep, router]);

  return (
    <>
      {!isLoading && (
        <>
          {withBack && <PageBackButton onClick={onPageBackClick} />}
          {(mainTitle || subTitle) && (
            <Flex.Column rowGap="10px">
              {mainTitle && (
                <>
                  <BaseTemplateMainTitleDesktop
                    weight={700}
                    color={(theme) => theme.colors.base950}
                    lineHeight="30px"
                    size="24px"
                  >
                    {mainTitle}
                  </BaseTemplateMainTitleDesktop>
                  <BaseTemplateMainTitleMobile
                    weight={700}
                    color={(theme) => theme.colors.base950}
                    lineHeight="26px"
                    size="20px"
                  >
                    {mainTitle}
                  </BaseTemplateMainTitleMobile>
                </>
              )}
              {subTitle && (
                <Typography.H6 weight={500} color={(theme) => theme.colors.base500} lineHeight="22px" size="16px">
                  {subTitle}
                </Typography.H6>
              )}
            </Flex.Column>
          )}
        </>
      )}

      {children}
    </>
  );
};

export default AssetWizardFormBaseTemplate;
