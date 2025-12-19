"use client";

import { useEffect, useRef } from "react";
import type { DependencyList } from "react";

type UseDidUpdateEffect = (effect: () => void | (() => void), deps: DependencyList) => void;

export const useDidUpdateEffect: UseDidUpdateEffect = (effect, deps) => {
  const effectCallCountRef = useRef(0);

  useEffect(() => {
    effectCallCountRef.current += 1;

    const minCallsBeforeRun = process.env.NODE_ENV === "development" ? 2 : 1;

    if (effectCallCountRef.current <= minCallsBeforeRun) {
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
