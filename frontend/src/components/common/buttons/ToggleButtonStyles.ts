import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const ToggleContainer = styled.button<{
  $checked: boolean;
  $disabled: boolean;
  $width: string | number;
  $height: string | number;
  $knobSize: string | number;
}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  outline: none;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;

  /* Track */
  &::before {
    content: '';
    display: inline-block;
    width: ${({ $width }) => (typeof $width === 'string' ? $width : `${$width}px`)};
    height: ${({ $height }) => (typeof $height === 'string' ? $height : `${$height}px`)};
    border-radius: 999px;
    background-color: ${({ $checked, $disabled }) =>
      $disabled
        ? 'var(--button-background-disabled)'
        : $checked
          ? 'var(--brand)'
          : 'var(--button-background-disabled)'};
    transition: background-color 200ms ease;
    position: relative;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 6px;
  }
`;

export const ToggleKnob = styled.span<{
  $checked: boolean;
  $knobSize: string | number;
}>`
  position: relative;
  /* knob sits on top of ::before track using negative margin */
  margin-left: -100%;
  display: inline-block;
  width: ${({ $knobSize }) => (typeof $knobSize === 'string' ? $knobSize : `${$knobSize}px`)};
  height: ${({ $knobSize }) => (typeof $knobSize === 'string' ? $knobSize : `${$knobSize}px`)};
  border-radius: 50%;
  background: #fff;
  box-shadow:
    0 1px 2px rgba(16, 24, 40, 0.1),
    0 1px 3px rgba(16, 24, 40, 0.1);
  transform: translateX(${({ $checked }) => ($checked ? 'calc(100% - 2px)' : '2px')});
  transition: transform 200ms ease;
`;

export const ToggleLabel = styled.span`
  font-family: var(--inter), Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--button-text);
`;
