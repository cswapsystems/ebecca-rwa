import styled from "styled-components";
import { breakpoints } from "@/constants";

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #161A55;
  padding: 24px 80px;
  color: #FFFFFF;
  font-family: var(--inter), sans-serif;
  font-size: 16px;
  line-height: 22px;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;

  * {
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: ${breakpoints.xxl}px) {
    padding: 24px 64px;
  }

  @media (max-width: ${breakpoints.xl}px) {
    padding: 24px 48px;
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    padding: 20px 32px;
    gap: 20px;
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: 16px 32px;
    gap: 16px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

export const RightSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LeftSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 40px;

  @media (max-width: ${breakpoints.m}px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 8px;
    column-gap: 32px;
  }

  @media (max-width: ${breakpoints.s}px) {
    column-gap: 24px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    column-gap: 16px;
  }
`;
