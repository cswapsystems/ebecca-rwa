import styled from "styled-components";
import { breakpoints } from "@/constants";

export const NextEraSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  transition: all 0.3s ease-in-out;

  * {
    transition: all 0.3s ease-in-out;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    padding: 32px 48px;
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

export const NextEraContainer = styled.div`
  width: 100%;
  height: 406px;
  background: #F6F6F6;
  padding: 80px;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    padding: 60px 0 44px 60px;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    padding: 48px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    height: 375px;
    padding: 32px;
    border-radius: 24px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    height: 425px;
    padding: 32px 24px;
  }

  @media only screen and (max-width: ${breakpoints.xxs}px) {
    height: 575px;
  }
`;

export const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;

  button {
    z-index: 20;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 32px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 24px;
  }
`;

export const TaglineContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  gap: 16px;
  z-index: 20;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    width: 70%;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    width: 75%;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    width: 80%;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 85%;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 95%;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const Tagline = styled.h2`
  color: var(--text-heading);
  font-size: 48px;
  font-weight: 700;

  @media only screen and (max-width: ${breakpoints.xl}px) {
    font-size: 44px;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    font-size: 40px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    font-size: 36px;
    font-weight: 700;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

export const Paragraph = styled.p`
  color: var(--text-body);
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const ImageContainer = styled.div`
  width: 600px;  // Defines the width of the image
  height: 600px; // Defines the height of the image
  position: absolute;
  top: -100px;
  right: 10%;
  z-index: 10;

  img {
    object-fit: contain;
  }

  img:nth-of-type(1) {
    display: block;
  }

  img:nth-of-type(2) {
    display: none;
  }

  @media only screen and (max-width: ${breakpoints.xl}px) {
    right: 5%;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    right: -5%;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    width: 550px;
    height: 550px;
    top: -75px;
    right: -20%;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 100%;
    height: 100%;
    top: 35%;
    right: 50%;
    left: 50%;
    transform: translateX(-50%);

    img:nth-of-type(1) {
      display: none;
    }

    img:nth-of-type(2) {
      display: block;
    }
  }

  @media only screen and (max-width: ${breakpoints.xxxs}px) {
    top: 40%;
  }
`;
