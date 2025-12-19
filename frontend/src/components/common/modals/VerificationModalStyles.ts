import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const VerificationWrap = styled.div`
  width: 100%;
  padding: 16px;
  font-family: Inter, sans-serif;
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

export const CreateAccountLink = styled.button<{ $disabled?: boolean }>`
  margin: 16px auto 0;
  display: block;
  appearance: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.texts.primary};
  font-size: 16px;
  line-height: 16px;
  font-family: Inter, sans-serif;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const ErrorMessage = styled.div<{ $isSuccess?: boolean }>`
  color: ${({ $isSuccess }) => ($isSuccess ? '#2e7d32' : '#d32f2f')};
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px;
  background-color: ${({ $isSuccess }) => ($isSuccess ? '#e8f5e9' : '#ffebee')};
  border-radius: 4px;
`;

export const SuccessMessage = styled.div`
  color: #2e7d32;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #e8f5e9;
  border-radius: 4px;
`;

export const DescriptionText = styled.p`
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
`;

export const EmailText = styled.strong`
  color: ${colors.primary500};
`;

export const CodeInputWrapper = styled.div`
  width: 100%;
`;

export const ResendWrapper = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const VerificationCodeInput = styled.div`
  text-align: center;
  letter-spacing: 8px;
  font-size: 20px;
  font-weight: 600;
`;

export const VerificationCodeInputWrapper = styled.div`
  & input {
    text-align: center;
    letter-spacing: 8px;
    font-size: 20px;
    font-weight: 600;
  }
`;

