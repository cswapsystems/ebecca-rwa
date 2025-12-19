import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  background: rgba(16, 24, 40, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div<{
  $width: string | number;
  $maxHeight: string | number;
}>`
  background: ${({ theme }) => theme.colors.backgrounds.secondary};
  color: var(--button-text);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.18);
  width: ${({ $width }) => (typeof $width === 'string' ? $width : `${$width}px`)};
  max-height: ${({ $maxHeight }) => (typeof $maxHeight === 'string' ? $maxHeight : `${$maxHeight}px`)};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: calc(100% - 32px);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 0px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.base950};
`;

export const CloseButton = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary950};
  font-size: 18px;
  width: 24px;
  height: 24px;
`;

export const ModalBody = styled.div`
  padding: 20px;
  overflow: auto;
`;
