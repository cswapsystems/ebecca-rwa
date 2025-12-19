import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const KycWrap = styled.div`
  width: 100%;
  padding: 16px;
  font-family: Inter, sans-serif;

  @media (max-width: ${breakpoints.xxxs}px) {
    padding: 8px 0;
  }
`;

export const Section = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.texts.primary};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.texts.primary};
`;

export const Actions = styled.div`
  margin-top: 4px;
`;
