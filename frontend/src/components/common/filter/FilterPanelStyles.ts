import styled from 'styled-components';
import { colors } from '@/styles';

export const Panel = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Row = styled.div`
  display: inline-flex;
  width: fit-content;
  align-items: center;
`;

export const Header = styled(Row)`
  padding-bottom: 20px;
`;

export const Title = styled.div`
  flex: 1;
  color: ${colors.base900};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
`;

export const SectionRow = styled(Row)`
  display: flex;
  padding: 8px 0px;
  justify-content: space-between;
  gap: 8px;
  width: 100% !important;
  cursor: pointer;
`;

export const SectionLabel = styled.div`
  color: ${colors.primary950};
  font-size: 16px;
  line-height: 22px;
  cursor: default;
`;

export const OptionRow = styled(Row)`
  display: flex;
  width: 100%;
  padding: 8px 0;
  gap: 12px;
  justify-content: flex-start;
  cursor: pointer;
`;

export const Checkbox = styled.span<{ $checked?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${({ $checked }) => ($checked ? colors.primary500 : colors.white)};
  outline: 1px solid ${({ $checked }) => ($checked ? colors.primary500 : colors.base300)};
  position: relative;
  transition:
    background 0.2s ease,
    outline-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: ${({ $checked }) => ($checked ? `0 0 0 2px rgba(59, 130, 246, 0.15)` : 'none')};
  &::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 10px;
    border: solid ${colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  }
`;

export const OptionText = styled.div`
  color: ${colors.primary950};
  font-size: 16px;
  line-height: 22px;
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SliderWrap = styled.div`
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Track = styled.div`
  position: relative;
  width: 100%; /* default */
  height: 4px; /* h-1 */
  background: ${colors.base100};
  display: flex;
  align-items: center;
`;

export const ActiveTrack = styled.div<{ $widthPx: number }>`
  width: ${({ $widthPx }) => `${$widthPx}px`};
  height: 100%;
  background: ${colors.primary500};
  border: 1px solid ${colors.primary500};
`;

export const Knob = styled.div<{ $leftPx: number }>`
  position: absolute;
  left: ${({ $leftPx }) => `${$leftPx - 10}px`}; /* offset by radius to align start of active track with knob edge */
  top: -8px;
  width: 20px; /* w-5 */
  height: 20px; /* h-5 */
  background: ${colors.white};
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid ${colors.primary500};
`;

export const RangeRow = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;

export const RangeText = styled.div`
  color: ${colors.primary950};
  font-size: 16px;
  line-height: 22px;
  user-select: none;
`;

export const CollapseButton = styled.button<{ $open?: boolean }>`
  all: unset;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transform: rotate(${({ $open }) => ($open ? '0deg' : '180deg')});
  transition: transform 0.2s ease;
  pointer-events: none; /* allow whole header row to be clickable */
`;

export const SectionContainer = styled.div`
  width: 100%;
`;

export const CaretIcon = styled.img`
  width: 14px;
  height: 15px;
`;
