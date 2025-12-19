import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const PieContainer = styled.div<{ $size?: number }>`
  width: ${({ $size }) => ($size ? `${$size}px` : '100%')};
  height: ${({ $size }) => ($size ? `${$size}px` : '100%')};
  background: transparent;
  border-radius: 50%;
  position: relative;
  z-index: 5;
  transition: all 0.3s ease-in-out;

  @media (max-width: ${breakpoints.xs}px) {
    width: ${({ $size }) => ($size ? '140px' : '100%')};
    height: ${({ $size }) => ($size ? '140px' : '100%')};
  }
`;
