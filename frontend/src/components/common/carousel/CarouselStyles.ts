import styled from "styled-components";
import { breakpoints } from "@/constants";

interface CarouselProps {
  $withOverlay?: boolean;
}

export const CarouselWrapper = styled.div<{
  $width: string | number;
  $height: string | number;
}>`
  width: ${({ $width }) => (typeof $width === "string" ? $width : `${$width}px`)};
  height: "fit-content";
  position: relative;

  @media only screen and (max-width: ${breakpoints.m}px) {
    height: fit-content;
  }
`;

export const CarouselViewport = styled.section<{
  $borderRadius: string | number;
}>`
  width: 100%;
  height: 100%;
  border-radius: ${({ $borderRadius }) => (typeof $borderRadius === "string" ? $borderRadius : `${$borderRadius}px`)};
  overflow: hidden;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    border-radius: 20px;
  }
`;

export const CarouselContainer = styled.div`
  height: 100%;
  display: flex;
  touch-action: pan-y pinch-zoom;
`;

export const CarouselItem = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 100%;
  min-width: 100%;
  position: relative;
`;

export const CarouselBackground = styled.div<CarouselProps>`
  text-align: right;
  position: absolute;
  inset: 0; /* shorthand for top: 0; right: 0; bottom: 0; left: 0; */
  overflow: hidden;
  z-index: -20;

  img {
    width: ${({ $withOverlay }) => ($withOverlay ? "75%" : "100%")};
    height: 100%;
    object-fit: cover;
  }
`;

export const CarouselOverlay = styled.div<{
  $overlay?: string;
}>`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, ${({ $overlay }) => $overlay || "#1C278C"} 32.59%, rgba(0, 0, 0, 0.2) 94.07%);
  z-index: -10;
`;

export const CarouselContents = styled.div<{
  $padding: string | number;
}>`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding: ${({ $padding }) => (typeof $padding === "string" ? $padding : `${$padding}px`)};
  color: white;
  font-family: Inter, sans-serif;
  user-select: none;
  z-index: 10;

  @media only screen and (max-width: ${breakpoints.l}px) {
    width: 80%;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    width: 86%;
    gap: 28px;
    padding: 44px 40px 52px 40px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    padding: 44px 32px 52px 32px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 100%;
    gap: 20px;
    padding: 20px 20px 40px 20px;

    button {
      width: auto;
      padding: 12px 16px;
      border-radius: 12px;

      span {
        font-size: 14px !important;
      }
    }
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.p`
  width: 70%;
  font-size: 48px;
  font-weight: 600;

  @media only screen and (max-width: ${breakpoints.l}px) {
    font-size: 40px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    font-size: 36px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

export const Body = styled.p`
  font-size: 20px;
  line-height: 26px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    font-size: 18px;
    line-height: 24px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const ControlsViewport = styled.section`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 40;

  &.arrows {
    width: calc(100% + 80px); // Same size as the Arrow Buttons
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media only screen and (max-width: ${breakpoints.l}px) {
      width: calc(100% + 70px);
    }

    @media only screen and (max-width: ${breakpoints.s}px) {
      display: none;
    }
  }

  &.dots {
    width: 100%;
    bottom: -32px;

    @media only screen and (max-width: ${breakpoints.m}px) {
      bottom: 16px;
      left: 0;
      right: 0;
      justify-content: center;
    }
  }
`;

export const ArrowsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    @media only screen and (max-width: ${breakpoints.l}px) {
      width: 60px !important;
      height: 60px !important;
      padding: 15px !important;
    }

    @media only screen and (max-width: ${breakpoints.xs}px) {
      width: 48px !important;
      height: 48px !important;
      padding: 12px !important;
    }
  }
`;

export const DotsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    justify-content: center;
  }
`;

export const Dot = styled.button`
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  background: white;
  border: 1px solid #d1d1d1;
  border-radius: 50%;
  cursor: pointer;
  touch-action: manipulation;

  &.selected {
    background: var(--brand);
    border: var(--brand);
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 10px;
    height: 10px;
    opacity: 0.5;

    &.selected {
      background: white;
      border: white;
      opacity: 1;
    }
  }
`;
