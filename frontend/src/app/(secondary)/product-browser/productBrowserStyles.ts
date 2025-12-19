import styled from "styled-components";
import { breakpoints } from "@/constants";
import { colors } from "@/styles";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 40px 60px 100px 60px;
  min-height: calc(100vh - 151px);
  background: ${colors.base50};

  @media only screen and (max-width: ${breakpoints.l}px) {
    padding: 24px 40px 100px 40px;
    gap: 50px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 30px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    padding: 20px 20px 100px 20px;
  }
`;

export const HeaderSection = styled.div`
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media only screen and (min-width: ${breakpoints.xxxxl}px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.xxxl}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.xxl}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${breakpoints.m + 1}px) {
    width: 260px;
    flex-shrink: 0;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    gap: 20px;
  }

  @media only screen and (min-width: ${breakpoints.m + 1}px) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: block;
  flex: 1;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;

  @media only screen and (min-width: ${breakpoints.m}px) {
    justify-content: space-between;
    margin-bottom: 15px;
  }
`;

export const ClearLink = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  color: #1f2937; /* neutral700 */
  text-decoration: underline;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`;

export const DesktopOnly = styled.div`
  @media only screen and (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

export const MobileFilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: ${colors.white};
  color: ${colors.primary950};
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;

  @media only screen and (min-width: ${breakpoints.m + 1}px) {
    display: none;
  }
`;

export const FilterIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const SidebarContent = styled.div`
  @media only screen and (max-width: ${breakpoints.m}px) {
    display: none;
  }
`;

export const MobileActiveFilters = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  margin-top: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  cursor: grab;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (min-width: ${breakpoints.m + 1}px) {
    display: none;
  }
`;

export const FilterTagPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  padding: 6px 12px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${colors.base100};
  background: ${colors.white};
  color: ${colors.base500};
  font-size: 14px;
  line-height: 20px;
`;

export const FilterTagLabel = styled.span`
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
`;

export const FilterTagRemove = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
`;

export const FilterTagRemoveIcon = styled.img`
  width: 14px;
  height: 14px;
  user-select: none;
  pointer-events: none;
`;

export const ModalClearRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.base600};
  background: ${colors.white};
  border-radius: 16px;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const ModalActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 18px;
  font-family: Inter, sans-serif;
  line-height: 22px;
  font-weight: 500;
  cursor: pointer;
  border: ${({ $variant }) => ($variant === "secondary" ? `1px solid ${colors.base200}` : "none")};
  background: ${({ $variant }) => ($variant === "primary" ? colors.primary500 : colors.white)};
  color: ${({ $variant }) => ($variant === "primary" ? colors.white : colors.primary950)};
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: ${({ $variant }) => ($variant === "primary" ? colors.primary600 : colors.base100)};
  }

  &:active {
    background: ${({ $variant }) => ($variant === "primary" ? colors.primary700 : colors.base200)};
  }
`;
