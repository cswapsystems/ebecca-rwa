import styled from 'styled-components';
import type { CSSProperties } from 'react';

interface ToggleContentStylesProps {
  $height: CSSProperties['height'];
  $animating: boolean;
  $open: boolean;
}

export const Shell = styled.div<Pick<ToggleContentStylesProps, '$height' | '$animating'>>`
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : 'auto')};
  overflow: hidden;
  transition: ${({ $animating }) => ($animating ? 'height 260ms ease' : 'none')};
  will-change: height;
`;

export const Content = styled.div<Pick<ToggleContentStylesProps, '$open'>>`
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? 0 : -4)}px);
  transition:
    opacity 220ms ease 40ms,
    transform 220ms ease 40ms;
`;

export const ToggleContentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
