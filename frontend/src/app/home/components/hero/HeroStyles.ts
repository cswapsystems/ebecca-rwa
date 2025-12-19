import styled from "styled-components";
import { breakpoints } from "@/constants";

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 60px 56px 60px; // 56px accounts for the Dot Navigation Controls of the Carousel

  @media only screen and (max-width: ${breakpoints.m}px) {
    padding: 24px 48px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    padding: 24px 32px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    padding: 24px;
  }

  @media only screen and (max-width: ${breakpoints.xxs}px) {
    padding: 24px 16px;
  }
`;
