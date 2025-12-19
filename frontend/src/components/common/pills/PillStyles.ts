import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const PillContainer = styled.button<{
  $selected: boolean;
  $disabled: boolean;
  $padding: string | number;
  $borderRadius: string | number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--brand)' : 'var(--button-background-disabled)')};
  background-color: ${({ $selected }) => ($selected ? 'var(--brand-soft, rgba(16,110,234,0.1))' : 'transparent')};
  color: ${({ $selected }) => ($selected ? 'var(--brand)' : 'var(--button-text)')};
  padding: ${({ $padding }) => (typeof $padding === 'string' ? $padding : `${$padding}px`)};
  border-radius: ${({ $borderRadius }) => (typeof $borderRadius === 'string' ? $borderRadius : `${$borderRadius}px`)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  background-clip: padding-box;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? 'var(--brand)' : 'var(--button-background-hovered)')};
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 4px;
    padding: 4px 10px;
  }
`;

export const PillText = styled.span<{
  $fontSize: string | number;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: Inter, sans-serif;
  font-size: ${({ $fontSize }) => (typeof $fontSize === 'string' ? $fontSize : `${$fontSize}px`)};
  line-height: 20px;
`;

export const PillIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
`;
