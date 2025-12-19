import styled, { keyframes } from "styled-components";

import { Flex } from "@/components/primitives";
import Typography from "../typography/Typography";

import { breakpoints } from "@/constants";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const prixClipFix = keyframes`
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
`;

export const StyledLoader = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;

  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background: ${({ theme }) => `conic-gradient(${theme.colors.white} 0.01%, ${theme.colors.black} 100%)`};

    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));

    animation: ${prixClipFix} 2s linear infinite;
  }
`;

export const LoaderWrapper = styled(Flex.Column)`
  @media only screen and (max-width: ${breakpoints.xs}px) {
    padding: 24px 16px;
  }
`;

export const LoaderTextDesktop = styled(Typography.H1)`
  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

export const LoaderTextMobile = styled(Typography.H4)`
  @media only screen and (min-width: ${breakpoints.xs + 1}px) {
    display: none;
  }
`;
