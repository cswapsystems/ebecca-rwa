import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: var(--background-primary);
  border-bottom: 1px solid #d1d1d1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease-in-out;

  * {
    transition: all 0.3s ease-in-out;
  }
`;

export const TopRow = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 60px;
  /* gap: 56px; */

  @media only screen and (max-width: ${breakpoints.xl}px) {
    padding-left: 48px;
    padding-right: 48px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    padding: 12px 8px 12px 16px; /* Only 8px padding on the right. The bounding box of the hamburger button makes up the other 8px space on the right. */
  }
`;

export const BottomRow = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 60px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

export const LeftSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const MiddleSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--text-nav);

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: auto;
  }
`;

export const DesktopSearchInput = styled.div`
  display: flex;
  width: 100%;
  min-width: 100px;
  margin-right: 8px;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

export const RightSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 16px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 8px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: auto;
    gap: 0px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px; // Matches the height of the Header Button
  gap: 6px;
  cursor: pointer;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    height: 38px; // Matches the height of the Header Button
  }
`;

export const LogoEmblem = styled.div`
  width: 34px; // Defines the width of the Emblem Logo
  height: 40px; // Defines the height of the Emblem Logo
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    object-fit: contain;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 28px;
    height: 32px;
  }
`;

export const LogoText = styled.div`
  width: 93px; // Defines the width of the Text Logo
  height: 21px; // Defines the height of the Text Logo
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    object-fit: contain;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 76px;
    height: 18px;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17px 24px;
  gap: 12px;
  cursor: pointer;
`;

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const HamburgerButton = styled.button`
  display: none;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

export const MobileSearchButton = styled.div`
  display: none;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 8px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: none;
  }
`;

export const MobileSettingsButton = styled.div`
  display: none;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const UnderReviewText = styled.span`
  @media only screen and (max-width: ${breakpoints.m}px) {
    display: none;
  }

  @media only screen and (max-width: ${breakpoints.xl}px) {
    display: none;
  }
`;
