import type { RefObject } from "react";

export type PieStore = {
  lastPos: { x: number; y: number };
  idleTimer: number | null;
  raf: number | null;
};

export type UsePieInternals = () => {
  pieContainerRef: RefObject<HTMLDivElement | null>;
  tooltipRef: RefObject<HTMLDivElement | null>;
  storeRef: RefObject<PieStore>;
};
