import styled from "styled-components";
import { breakpoints } from "@/constants";
import { DropdownContainer, DropdownViewport, GraphicsSection } from "@/components/common/inputs/DropdownInputStyles";

export const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 80px;
  min-height: calc(100vh - 195px);
  background: ${({ theme }) => theme.colors.backgrounds.primary};

  @media (max-width: ${breakpoints.xxl}px) {
    padding: 30px;
  }

  @media (max-width: ${breakpoints.m}px) {
    padding: 20px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    button {
      padding: 8px 12px;
      border-radius: 12px;

      span {
        font-size: 14px;
      }
    }
  }

  @media only screen and (max-width: ${breakpoints.xxxs + 20}px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }
`;

export const SummaryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.backgrounds.secondary};
  flex: 1 1 260px;

  &:first-child {
    flex: 2 1 360px;
    min-width: 430px;
    max-width: 500px;

    @media (max-width: ${breakpoints.s}px) {
      min-width: 100%;
    }

    @media (max-width: ${breakpoints.l}px) {
      max-width: 100%;
    }
  }

  @media (max-width: ${breakpoints.l}px) {
    &:first-child {
      flex: 1 1 320px;
    }
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-basis: 100%;
  }

  @media (min-width: ${breakpoints.m}px) {
    padding: 24px;
  }
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.texts.secondary};
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
`;

export const SummaryValue = styled.span`
  font-size: 32px;
  line-height: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.texts.primary};
  white-space: nowrap;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.xs}px) {
    gap: 24px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    flex-direction: row-reverse; /* show pie chart on the right on mobile */
    align-items: center;
    justify-content: space-between;
    text-align: left;
    width: 100%;
  }
`;

export const Legend = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
  width: fit-content;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: ${breakpoints.xs}px) {
    align-items: flex-start;
    text-align: left;
    justify-content: flex-start;
  }
`;

export const LegendItem = styled.li`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
  color: ${({ theme }) => theme.colors.texts.secondary};
  font-size: 14px;

  @media (max-width: ${breakpoints.s}px) {
    gap: 12px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.m}px) {
    align-items: center;
    text-align: left;
    justify-content: flex-start;
  }
`;

export const Dot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  max-width: 760px;
  min-width: 0; /* Prevent flex items from overflowing */

  @media (max-width: ${breakpoints.m}px) {
    gap: 16px;
    justify-content: start;
    max-width: 100%; /* Remove max-width constraint on mobile */
  }

  @media (max-width: ${breakpoints.xs}px) {
    gap: 10px;
    max-width: 100%; /* Ensure no max-width on extra small screens */
  }

  /* Ensure children can shrink properly */
  > * {
    min-width: 0;
  }

  /* SearchBar should take available space, DropdownInput should fit content */
  > *:first-child {
    flex: 1 1 auto;
  }

  > *:last-child {
    flex: 0 1 auto; /* Allow dropdown to shrink if needed but prefer content size */
    min-width: 110px; /* Minimum width for sort by dropdown */
  }
`;

export const AssetsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`;

export const AssetItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 24px;
  background: ${({ theme }) => theme.colors.backgrounds.secondary};
  border-radius: 16px;
  justify-content: space-between;
  border: 1px solid transparent;
  transition: border 0.3s ease;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.borders.primary};
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 16px;
    overflow: hidden;
  }
`;

export const AssetImage = styled.div`
  display: none;

  @media (max-width: ${breakpoints.m}px) {
    display: block;
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.backgrounds.primary};

    img {
      object-fit: cover;
    }
  }
`;

export const AssetLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: fit-content;

  @media (max-width: ${breakpoints.m}px) {
    align-items: flex-start;
    gap: 16px;
    flex-wrap: nowrap;
  }
`;

export const AssetIcon = styled.div`
  position: relative;
  width: 66px;
  height: 66px;
  min-width: 66px;
  min-height: 66px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: ${breakpoints.m}px) {
    display: none;
  }

  img {
    object-fit: cover;
  }
`;

export const StatusPillContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusPill = styled.span<{ $badge?: "G" | "F" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ theme, $badge }) =>
    $badge === "F"
      ? theme.colors.pills.negative.background
      : $badge === "G"
        ? theme.colors.pills.positive.background
        : theme.colors.pills.info.background};
  color: ${({ theme, $badge }) =>
    $badge === "F"
      ? theme.colors.pills.negative.text
      : $badge === "G"
        ? theme.colors.pills.positive.text
        : theme.colors.pills.info.text};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

export const MobileDropdown = styled.div`
  display: none;

  @media (max-width: ${breakpoints.s}px) {
    display: block;

    ${DropdownContainer} {
      width: 32px;
      height: 32px;
      padding: 0;
      justify-content: center;
      border: none;
      border-radius: 6px;
      box-shadow: none;
      background: ${({ theme }) => theme.colors.backgrounds.primary};
      color: ${({ theme }) => theme.colors.texts.primary};
    }

    ${DropdownViewport} {
      justify-content: center;
      gap: 0;
    }

    ${GraphicsSection} {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ${GraphicsSection} img {
      filter: brightness(0) saturate(100%) invert(11%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%)
        contrast(100%);
    }
  }
`;

export const DesktopDropdown = styled.div`
  display: block;

  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

export const AssetTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${breakpoints.s}px) {
    gap: 12px;
    justify-content: space-between;
    align-items: center;
  }
`;

export const AssetTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.texts.primary};

  @media (max-width: ${breakpoints.s}px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const AssetMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px 60px;
  color: ${({ theme }) => theme.colors.texts.secondary};
  width: "fit-content";
  font-size: 14px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.l}px) {
    flex-wrap: wrap;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    gap: 12px;
  }
`;

export const Gain = styled.span`
  color: ${({ theme }) => theme.colors.texts.positive};
  font-weight: 600;
`;

export const AssetMetaValue = styled.span`
  color: ${({ theme }) => theme.colors.texts.primary};
  font-weight: 600;
  width: "fit-content";
`;

export const AssetMetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: "fit-content";
  white-space: nowrap;
  font-size: 16px;

  @media (max-width: ${breakpoints.xs}px) {
    font-size: 14px;
  }
`;

export const YieldRow = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
  gap: 60px;

  @media (max-width: ${breakpoints.l}px) {
    gap: 32px;
  }

  @media (max-width: ${breakpoints.m}px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${breakpoints.m}px) {
    width: "fit-content";
  }
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borders.primary};
  background: ${({ theme }) => theme.colors.backgrounds.secondary};
  cursor: pointer;
`;

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.texts.primary};
  font-size: 40px;
  line-height: 40px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: ${breakpoints.m}px) {
    font-size: 28px;
    line-height: 32px;
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

export const LegendPercent = styled.h4`
  font-size: 32px;
  line-height: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.texts.primary};

  @media (max-width: ${breakpoints.s}px) {
    font-size: 32px;
    line-height: 28px;
  }

  @media (max-width: ${breakpoints.m}px) {
    text-align: left;
    width: 100%;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 28px;
  line-height: 28px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

export const LabelSmall = styled.span`
  color: ${({ theme }) => theme.colors.texts.secondary};
  font-size: 12px;
  line-height: 14px;
`;

export const Amount = styled.h5`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.texts.primary};

  @media (max-width: ${breakpoints.xs}px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const LegendLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.texts.secondary};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: ${breakpoints.m}px) {
    justify-content: center;
    width: 100%;
    text-align: center;
  }
`;

export const AssetDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: "fit-content";

  @media (max-width: ${breakpoints.xs}px) {
    gap: 20px;
  }
`;

export const YieldItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  height: fit-content;
`;

export const YieldLabel = styled.span`
  color: ${({ theme }) => theme.colors.texts.secondary};
  font-size: 16px;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 14px;
  }
`;

// Empty state styles for when there are no assets to display
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.backgrounds.secondary};
  color: ${({ theme }) => theme.colors.texts.secondary};
  min-height: 260px;

  @media (max-width: ${breakpoints.s}px) {
    padding: 32px 16px;
  }
`;

export const EmptyTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.texts.primary};
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.texts.secondary};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;
