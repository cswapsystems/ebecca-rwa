"use client";

import type { FC, JSX } from "react";
import { useMemo } from "react";

import { Typography } from "@/components/common";
import { Flex } from "@/components/primitives";

import {
  DocumentThumbnailImgWrapper,
  DocumentThumbnailImageStyle,
  DocumentThumbnailImagesWrapper,
} from "./VerificationStyledElements";

interface Props {
  images: Array<string>;
}

const DocumentThumbnails: FC<Props> = ({ images }): JSX.Element => {
  return (
    <Flex.Column rowGap="34px">
      <Typography.H4 texttransform="capitalize" size="24px" weight={700} lineHeight="26px" color="#2D3648">
        document thumbnails
      </Typography.H4>

      <DocumentThumbnailImagesWrapper columnGap="34px" flexWrap="wrap">
        {images.map((img) => (
          <DocumentThumbnailImgWrapper key={img}>
            <DocumentThumbnailImageStyle src={img} alt="Document" fill />
          </DocumentThumbnailImgWrapper>
        ))}
      </DocumentThumbnailImagesWrapper>
    </Flex.Column>
  );
};

export default DocumentThumbnails;
