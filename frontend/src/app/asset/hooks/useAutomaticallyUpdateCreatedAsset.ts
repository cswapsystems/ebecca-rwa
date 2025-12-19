"use client";

import { useRef, useEffect } from "react";
import { useDidUpdateEffect } from "@/hooks";
import { useAsset } from "@/state/hooks";

import { useCreateUpdateAssetMutation } from "@/lib/services/assetApi";

const useAutomaticallyUpdateCreatedAsset = (): void => {
  const skipNextEffectRef = useRef(false);
  const { createdAssetData, updateAssetCreatedData } = useAsset();
  const [createUpdateAsset] = useCreateUpdateAssetMutation();

  useDidUpdateEffect(() => {
    if (skipNextEffectRef.current) {
      skipNextEffectRef.current = false;
      return;
    }

    (async () => {
      const res = await createUpdateAsset({
        ...createdAssetData,
        ...(createdAssetData?.assetId ? { id: createdAssetData?.assetId } : {}),
      }).unwrap();

      if (res?.assetId && res?.success && !createdAssetData?.assetId) {
        skipNextEffectRef.current = true;

        updateAssetCreatedData({
          assetId: res?.assetId,
        });
      }
    })();
  }, [createdAssetData, createUpdateAsset, updateAssetCreatedData]);
};

export default useAutomaticallyUpdateCreatedAsset;
