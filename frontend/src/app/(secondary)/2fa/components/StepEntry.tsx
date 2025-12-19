'use client';

import React from 'react';
import {
  CardBox,
  Container,
  Header,
  SvgIcon,
  PageWrap,
  TitleH3,
  BodyText,
  LabelText,
  FormFieldContainer,
  InfoTextError,
  BackButtonWrapper,
} from '../TwoFactorAuthenticationStyles';
import Button from '@/components/common/buttons/Button';
import TextInput from '@/components/common/inputs/TextInput';
import { colors } from '@/styles';
import type { Method } from '../TwoFactorAuthenticationTypes';

interface StepEntryProps {
  width?: number;
  method: Method;
  emailOrPhone: string;
  onEmailOrPhoneChange: (value: string) => void;
  isEmailValid: boolean;
  onBack: () => void;
  onSendCode: () => void;
  loading?: boolean;
  error?: string | null;
}

const StepEntry: React.FC<StepEntryProps> = ({
  width,
  method,
  emailOrPhone,
  onEmailOrPhoneChange,
  isEmailValid,
  onBack,
  onSendCode,
  loading,
  error,
}) => {
  const entryTitle = method === 'sms' ? 'SMS Verification' : 'Email Verification';
  const entryDescription =
    method === 'sms'
      ? 'Enter the phone number you want to use for 2FA. We’ll send a 6-digit code via text message to verify it.'
      : 'Enter the email you want to use for 2FA. We’ll send a 6-digit code to this address to verify it.';
  const fieldLabel = method === 'sms' ? 'Phone number' : 'Email';
  const placeholder = method === 'sms' ? 'e.g. +1 555 123 4567' : 'your@email.com';
  const isEntryValid = method === 'email' ? isEmailValid : true;

  return (
    <PageWrap>
      <CardBox $width={width}>
        <Container>
          <Header>
            <TitleH3>{entryTitle}</TitleH3>
            <BackButtonWrapper>
              <Button
                variant="secondary"
                onClick={onBack}
                width="fit-content"
                padding="6px 10px"
                borderRadius="8px"
                fontSize="14px"
                lineHeight="20px"
                icon={<SvgIcon $src="/icons/arrow-left.svg" $width={16} $height={16} $color={colors.base950} />}
                iconPosition="left"
              >
                Back
              </Button>
            </BackButtonWrapper>
            <BodyText>{entryDescription}</BodyText>
          </Header>

          {method !== 'app' && (
            <FormFieldContainer>
              <LabelText>{fieldLabel}</LabelText>
              <TextInput
                value={emailOrPhone}
                onChange={(e) => onEmailOrPhoneChange(e.target.value)}
                placeholder={placeholder}
                width="100%"
                padding="12px 14px"
                borderRadius={12}
                type={method === 'sms' ? 'tel' : 'email'}
              />
            </FormFieldContainer>
          )}

          <Button
            variant="primary"
            onClick={onSendCode}
            width="100%"
            padding="12px 16px"
            borderRadius="12px"
            disabled={!isEntryValid || loading}
          >
            {loading ? 'Sending...' : 'Send Code'}
          </Button>

          {error && <InfoTextError>{error}</InfoTextError>}
        </Container>
      </CardBox>
    </PageWrap>
  );
};

export default StepEntry;
