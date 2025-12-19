"use client";

import type { FC, JSX } from "react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import PageBackButton from "@/components/common/buttons/PageBackButton";
import { Flex } from "@/components/primitives";
import Verification, { type Tags } from "./verification/Verification";
import PurchaseInformation from "./purchase-information/PurchaseInformation";
import type { TagsDTO } from "@/lib/data/assetData";

import { useAsset } from "@/state/hooks";
import { useFetchAssetByAssetIdQuery } from "@/lib/services/assetApi";

const AssetVerification: FC<object> = (): JSX.Element => {
  const router = useRouter();
  const { createdAssetData } = useAsset();
  const { data: assetData } = useFetchAssetByAssetIdQuery(createdAssetData?.assetId ?? "", {
    skip: !createdAssetData?.assetId,
  });

  const assetTags = useMemo((): Array<Tags> => {
    if (!assetData) return [];

    if (assetData?.tags && typeof assetData?.tags === "string") {
      const tagData = JSON.parse(assetData?.tags) as Array<TagsDTO>;

      return tagData?.map((tag) => ({
        tag: tag?.tagName,
        icon: "",
      }));
    }
    return [];
  }, [assetData]);

  const onPageBackClick = (): void => {
    router.push("/");
  };

  return (
    <>
      <PageBackButton onClick={onPageBackClick} />
      <Flex.Row alignItems="flex-start" directionMobile="column" columnGap="12px" rowGap="16px">
        <Verification
          name={assetData?.name ?? null}
          submissionDate={assetData?.createdAt ?? null}
          tags={assetTags}
          images={(assetData?.images as string[]) ?? []}
        />
        <PurchaseInformation />
      </Flex.Row>
    </>
  );
};

export default AssetVerification;
