import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const SearchBarContainer = styled.div<{ $width?: string | number }>`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width)};
  max-width: 100%;
  min-width: 0; /* Allow flex item to shrink below content size */
  flex-shrink: 1; /* Allow shrinking in flex containers */
  background: ${({ theme }) => theme.colors.backgrounds.secondary};
  border-radius: 16px;

  @media (max-width: ${breakpoints.s}px) {
    padding: 10px 16px;
  }

  input {
    padding: 12px 12px 12px 45px;
  }
`;

export const SearchIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  user-select: none;
  pointer-events: none;
  left: 16px;
  color: ${({ theme }) => theme.colors.base600};
`;

export const SearchInput = styled.input`
  height: 100%;
  border: none;
  font-size: 18px;
  font-weight: 400;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.texts.primary};
  flex: 1;
  min-width: 0; /* Allow input to shrink below content size */

  &::placeholder {
    color: ${({ theme }) => theme.colors.texts.secondary};
    font-size: 18px;
    font-weight: 400;
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;
