import styled from "styled-components";
import Image from "next/image";

import { Flex } from "@/components/primitives";

import { breakpoints } from "@/constants";

export const DocumentThumbnailImgWrapper = styled.div`
  position: relative;
  width: 192px;
  height: 192px;
  border-radius: 8px;
`;

export const DocumentThumbnailImageStyle = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`;

export const DocumentThumbnailImagesWrapper = styled(Flex.Row)`
  flex-wrap: wrap;
  row-gap: 34px;
  @media only screen and (max-width: ${breakpoints.xs}px) {
    flex-wrap: nowrap !important;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    column-gap: 16px;

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      flex: 0 0 auto;
    }
  }
`;
