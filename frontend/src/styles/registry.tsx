"use client";

import React, { useState, useEffect } from "react";
import type { PropsWithChildren, JSX } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: PropsWithChildren<object>): JSX.Element {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());


  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // cleanup
  useEffect(() => {
    return () => {
      try {
        styledComponentsStyleSheet.seal();
      } catch (error) {
        console.warn("Failed to seal styled-components stylesheet:", error);
      }
    };
  }, [styledComponentsStyleSheet]);

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }


  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
