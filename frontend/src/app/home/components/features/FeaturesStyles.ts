import styled, { keyframes } from "styled-components";
import { breakpoints } from "@/constants";

export const FeaturesSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 48px 60px;
  transition: all 0.3s ease-in-out;

  * {
    transition: all 0.3s ease-in-out;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 32px 48px;
  }

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

export const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 428px;
  height: 100%;
  gap: 60px;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    max-width: none;
    width: 50%;
  }

  @media only screen and (max-width: ${breakpoints.xl}px) {
    gap: 48px;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    width: 100%;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 32px;
  }
`;

export const FeaturesTitle = styled.h2`
  color: var(--text-heading);
  font-size: 36px;
  font-weight: 600;
  line-height: 48px;

  @media only screen and (min-width: ${breakpoints.l + 1}px) and (max-width: ${breakpoints.xxl}px) {
    font-size: 36px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    font-size: 40px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 428px;
  gap: 24px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    max-width: 100%;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  &.active {
    color: var(--text-body);
  }

  &.inactive {
    color: #B0B0B0;
  }
`;

export const Feature = styled.h3`
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    font-size: 28px;
    line-height: 36px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  &.visible {
    display: block;
  }

  &.hidden {
    display: none;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const fillAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #D9D9D9;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  &.visible {
    display: block;
  }

  &.hidden {
    display: none;
  }
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(
    to right,
    #687cff 12%,
    var(--brand) 55%,
    #293df1
  );
  animation: ${fillAnimation} 5s linear forwards;
  border-radius: 20px;
`;

export const ImageContainer = styled.div`
  width: 1009px; // Defines the width of the image
  height: 699px; // Defines the height of the image
  border-radius: 24px;
  box-shadow:
    0 48px 32 px 0 rgba(0, 0, 0, 0.01),
    0 36px 28px 0 rgba(0, 0, 0, 0.05),
    0 24px 16px 0 rgba(0, 0, 0, 0.09),
    0 12px 48px 0 rgba(0, 0, 0, 0.10),
    0 0 0 0 rgba(0, 0, 0, 0.10);
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
    position: absolute
  }

  @media only screen and (max-width: ${breakpoints.xxxl}px) {
    width: 706px;
    height: 490px;
    border-radius: 20px;
  }

  @media only screen and (max-width: 1150px) {
    width: 605px;
    height: 420px;
    border-radius: 16px;
  }

  @media only screen and (max-width: ${breakpoints.xl}px) {
    width: 505px;
    height: 350px;
    border-radius: 12px;
  }

  @media only screen and (max-width: 1050px) {
    width: 404px;
    height: 280px;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    width: 706px;
    height: 490px;
    border-radius: 20px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    width: 605px;
    height: 420px;
    border-radius: 16px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 505px;
    height: 350px;
    border-radius: 12px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 404px;
    height: 280px;
  }

  @media only screen and (max-width: ${breakpoints.xxs}px) {
    width: 353px;
    height: 245px;
    border-radius: 8px;
  }

  @media only screen and (max-width: 400px) {
    width: 252px;
    height: 175px;
  }

  @media only screen and (max-width: 320px) {
    width: 100%;
    height: 175px;
  }
`;
