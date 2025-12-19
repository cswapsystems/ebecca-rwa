import styled from 'styled-components';
import { breakpoints } from '@/constants';
import { colors } from '@/styles/colors';

export const LogoutWrap = styled.div`
  width: 100%;
  padding: 16px;
  font-family: Inter, sans-serif;

  @media (max-width: ${breakpoints.xxxs}px) {
    padding: 8px 0;
  }
`;

export const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.texts.primary};
`;

export const Message = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.texts.secondary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  @media (max-width: ${breakpoints.xxxs}px) {
    flex-direction: column;
  }

  button {
    width: 50%;
  }
`;

export const LogoutButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  width: 100%;
  height: 44px;
  background-color: ${({ $disabled }) => ($disabled ? colors.negative200 : colors.negative500)};
  color: ${colors.white};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-family: Inter, sans-serif;

  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? colors.negative200 : colors.negative600)};
  }

  &:active {
    background-color: ${({ $disabled }) => ($disabled ? colors.negative200 : colors.negative700)};
  }
`;
