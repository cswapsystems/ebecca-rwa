import styled from "styled-components";
import { breakpoints } from "@/constants";

export const WhyEbeccaSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 60px 80px;
  transition: all 0.3s ease-in-out;

  * {
    transition: all 0.3s ease-in-out;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    padding: 32px 48px 72px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    padding: 24px 48px 60px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    padding: 24px 32px 40px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    padding: 24px 24px 32px;
  }

  @media only screen and (max-width: ${breakpoints.xxs}px) {
    padding: 24px 16px 24px;
  }
`;

export const WhyEbeccaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 80px;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    gap: 72px;
  }

  @media only screen and (max-width: ${breakpoints.xl}px) {
    gap: 64px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 56px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 28px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    width: 100%;
    gap: 24px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    gap: 20px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 16px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 228px;
  gap: 16px;

  @media only screen and (min-width: ${breakpoints.s + 1}px) and (max-width: ${breakpoints.xxl}px) {
    align-items: stretch;
    height: auto;
  }

  @media only screen and (min-width: ${breakpoints.s + 1}px) and (max-width: ${breakpoints.l}px) {
    flex-wrap: wrap;
    justify-content: flex-start;

    > div:nth-of-type(2) {
      order: 3;
    }

    > div:nth-of-type(3) {
      order: 2;
    }

    > div:nth-of-type(1),
    > div:nth-of-type(3) {
      width: calc(50% - 10px);
    }

    > div:nth-of-type(2) {
      width: 100%;
    }
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    gap: 32px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: #F6F6F6;
  gap: 36px;
  padding: 36px;
  border-radius: 24px;

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    height: auto;
    gap: 24px;
    padding: 24px;
  }

  @media only screen and (max-width: ${breakpoints.l}px) {
    justify-content: flex-start;
    gap: 20px;
    padding: 20px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    height: 175px;
    gap: 16px;
    padding: 16px;
  }

  @media only screen and (max-width: ${breakpoints.xxs}px) {
    height: 206px;
  }
`;

export const Title = styled.h2`
  font-weight: 600;

  &.section {
    font-size: 48px;
    color: var(--text-heading);

    @media only screen and (max-width: ${breakpoints.m}px) {
      font-size: 44px;
    }

    @media only screen and (max-width: ${breakpoints.s}px) {
      font-size: 40px;
    }

    @media only screen and (max-width: ${breakpoints.xs}px) {
      font-size: 36px;
      font-weight: 700;
    }

    @media only screen and (max-width: ${breakpoints.xxs}px) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  &.card {
    font-size: 32px;
    line-height: 40px;
    user-select: none;
    background: linear-gradient(48deg, #2F5BF9 0%, #1C278C 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media only screen and (min-width: ${breakpoints.s + 1}px) and (max-width: ${breakpoints.xxxl}px) {
      font-size: 28px;
    }
  }
`;

export const Description = styled.p`
  font-size: 20px;
  line-height: 28px;

  &.section {
    color: var(--text-body);
    font-weight: 400;
    text-align: center;

    @media only screen and (max-width: ${breakpoints.s}px) {
      font-size: 18px;
    }

    @media only screen and (max-width: ${breakpoints.xs}px) {
      font-size: 16px;
      text-align: left;
      line-height: 22px;
    }
  }

  &.card {
    color: var(--text-heading);
    font-weight: 500;

    @media only screen and (max-width: ${breakpoints.m}px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;
