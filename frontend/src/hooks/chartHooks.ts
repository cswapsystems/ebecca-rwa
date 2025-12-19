import { useRef, useEffect } from "react";
import { PieStore, UsePieInternals } from "@/types";

export const usePieInternals: UsePieInternals = () => {
  const pieContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const storeRef = useRef<PieStore>({
    lastPos: { x: 0, y: 0 },
    idleTimer: null,
    raf: null,
  });

  useEffect(() => {
    const store = storeRef.current;
    return () => {
      if (store.idleTimer != null) {
        clearTimeout(store.idleTimer);
        store.idleTimer = null;
      }
      if (store.raf != null) {
        cancelAnimationFrame(store.raf);
        store.raf = null;
      }
    };
  }, []);

  return {
    pieContainerRef,
    tooltipRef,
    storeRef,
  };
};
