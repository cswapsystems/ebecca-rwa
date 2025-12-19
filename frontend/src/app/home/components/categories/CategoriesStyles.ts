import styled from "styled-components";
import { breakpoints } from "@/constants";

export const CategoriesSection = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 60px;
  gap: 32px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    padding: 24px 48px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    padding: 24px 32px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    padding: 24px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    padding: 24px 16px;
  }
`;

export const Card = styled.div`
  flex: 1; // Take up the available space;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 20%;
  height: 428px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px;
  border-radius: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 21, 0.08);

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    min-width: 46%;
  }

  @media only screen and (min-width: ${breakpoints.xl + 1}px) and (max-width: ${breakpoints.xxl}px) {
    height: 420px;
  }

  @media only screen and (min-width: 695px) and (max-width: ${breakpoints.s}px),
         only screen and (min-width: 727px) and (max-width: ${breakpoints.m}px) {
    height: 444px;
  }

  @media only screen and (min-width: 630px) and (max-width: 694px),
         only screen and (min-width: ${breakpoints.s + 1}px) and (max-width: 726px) {
    height: 484px;
  }

  @media only screen and (max-width: 629px) {
    height: 505px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    min-width: 100%;
    height: fit-content;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    gap: 32px;
  }

  @media only screen and (min-width: ${breakpoints.m + 1}px) and (max-width: 883px) {
    gap: 16px;
  }
`;

export const CardOverview = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  font-family: Inter, sans-serif;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  white-space: nowrap;

  @media only screen and (max-width: 726px) {
    white-space: wrap;
  }

  @media only screen and (min-width: ${breakpoints.xs + 1}px) and (max-width: 694px),
         only screen and (min-width: ${breakpoints.s + 1}px) and (max-width: 726px) {
    height: 48px;
    line-height: 24px;
  }
`;

export const CardDescription = styled.p`
  font-size: 16px;
  line-height: 22px  
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
  white-space: nowrap;
  cursor: pointer;
`;

export const ViewLink = styled.span`
  color: #2F5BF9;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
