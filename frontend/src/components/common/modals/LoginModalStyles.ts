import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const LoginWrap = styled.div`
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

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.texts.primary};
`;

export const Actions = styled.div`
  margin-top: 8px;
`;

export const CreateAccountLink = styled.button`
  margin: 16px auto 0;
  display: block;
  appearance: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.texts.primary};
  font-size: 16px;
  line-height: 16px;
  font-family: Inter, sans-serif;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
`;