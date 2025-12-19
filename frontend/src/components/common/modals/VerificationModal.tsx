'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import TextInput from '@/components/common/inputs/TextInput';
import Button from '@/components/common/buttons/Button';
import {
  VerificationWrap,
  Title,
  Field,
  Label,
  Actions,
  CreateAccountLink,
  ErrorMessage,
  SuccessMessage,
  DescriptionText,
  EmailText,
  ResendWrapper,
  VerificationCodeInputWrapper,
} from './VerificationModalStyles';

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  onVerify: (code: string) => Promise<void>;
  onResendCode?: () => Promise<void>;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ open, onClose, email, onVerify, onResendCode }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      await onVerify(code);
      setSuccess(true);
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        setCode('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!onResendCode) return;

    try {
      setIsResending(true);
      await onResendCode();
      setError(null);
      // Show success message temporarily
      const prevError = error;
      setError('Verification code resent! Please check your email.');
      setTimeout(() => {
        setError(prevError);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} width={440} showHeader={false}>
      <VerificationWrap>
        <Title>Verify Your Email</Title>

        {success ? (
          <SuccessMessage>Email verified successfully! You can now log in.</SuccessMessage>
        ) : (
          <>
            <DescriptionText>
              We sent a verification code to <EmailText>{email}</EmailText>
            </DescriptionText>

            {error && (
              <ErrorMessage $isSuccess={error.includes('resent')}>{error}</ErrorMessage>
            )}

            <Field>
              <Label>Verification Code</Label>
              <VerificationCodeInputWrapper>
                <TextInput
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCode(value);
                    setError(null);
                  }}
                  placeholder="Enter 6-digit code"
                  width="100%"
                  borderRadius={12}
                  fontSize={20}
                  lineHeight={20}
                  padding="12px 13px"
                  disabled={isLoading}
                />
              </VerificationCodeInputWrapper>
            </Field>

            <Actions>
              <Button
                variant="primary"
                onClick={handleVerify}
                width="100%"
                height={44}
                fontSize={16}
                lineHeight={22}
                borderRadius={12}
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </Actions>

            {onResendCode && (
              <ResendWrapper>
                <CreateAccountLink onClick={handleResend} $disabled={isResending}>
                  {isResending ? 'Resending...' : "Didn't receive code? Resend"}
                </CreateAccountLink>
              </ResendWrapper>
            )}
          </>
        )}
      </VerificationWrap>
    </Modal>
  );
};

export default VerificationModal;
