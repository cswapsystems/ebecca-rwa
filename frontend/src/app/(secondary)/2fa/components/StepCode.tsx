'use client';

import React from 'react';
import {
  CardBox,
  Container,
  Header,
  Footer,
  SvgIcon,
  PageWrap,
  CodeInputsWrap,
  CodeInput,
  TitleH3,
  BodyText,
  EmphasisText,
  InfoTextWithMargin,
  LinkTextWithState,
  InfoTextError,
  BackButtonWrapper,
} from '../TwoFactorAuthenticationStyles';
import Button from '@/components/common/buttons/Button';
import { colors } from '@/styles';
import type { Method } from '../TwoFactorAuthenticationTypes';

interface StepCodeProps {
  width?: number;
  method: Method;
  onBack: () => void;
  onVerify: (code: string) => void;
  onResend?: () => void;
  loading?: boolean;
  error?: string | null;
}

const StepCode: React.FC<StepCodeProps> = ({ width, method, onBack, onVerify, onResend, loading, error }) => {
  const [code, setCode] = React.useState<string[]>(['', '', '', '', '', '']);
  const codeInputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const onChangeDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < next.length - 1) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const onKeyDownDigit = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      e.preventDefault();
      codeInputRefs.current[index - 1]?.focus();
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      codeInputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < code.length - 1) {
      e.preventDefault();
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const onPasteCode = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, code.length);
    if (!text) return;
    e.preventDefault();
    const next = [...code];
    for (let i = 0; i < next.length; i++) next[i] = text[i] ?? '';
    setCode(next);
    const last = Math.min(text.length, code.length) - 1;
    if (last >= 0) codeInputRefs.current[last]?.focus();
  };

  const codeTitle =
    method === 'sms' ? 'SMS Verification' : method === 'app' ? 'Authenticator App' : 'Email Verification';

  const renderCodeDescription = () => {
    if (method === 'sms') {
      return (
        <BodyText>
          We’ve sent a <EmphasisText>6-digit code</EmphasisText> via SMS to your phone number. Enter the code below to
          complete your 2FA setup.
        </BodyText>
      );
    }
    if (method === 'app') {
      return (
        <BodyText>
          Open your authenticator app and enter the <EmphasisText>6-digit code</EmphasisText> to complete your 2FA
          setup.
        </BodyText>
      );
    }
    return (
      <BodyText>
        We’ve sent a <EmphasisText>6-digit code</EmphasisText> to your email. Enter the code below to complete your 2FA
        setup.
      </BodyText>
    );
  };

  return (
    <PageWrap>
      <CardBox $width={width}>
        <Container>
          <Header>
            <TitleH3>{codeTitle}</TitleH3>
            <BackButtonWrapper>
              <Button
                variant="secondary"
                onClick={onBack}
                width="fit-content"
                padding="6px 10px"
                borderRadius="8px"
                fontSize="16px"
                lineHeight="20px"
                icon={<SvgIcon $src="/icons/arrow-left.svg" $width={16} $height={16} $color={colors.base950} />}
                iconPosition="left"
              >
                Back
              </Button>
            </BackButtonWrapper>
            {renderCodeDescription()}
          </Header>

          <CodeInputsWrap>
            {code.map((d, i) => (
              <CodeInput
                key={i}
                ref={(el) => {
                  codeInputRefs.current[i] = el;
                }}
                value={d}
                onChange={(e) => onChangeDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDownDigit(i, e)}
                onPaste={onPasteCode}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
              />
            ))}
          </CodeInputsWrap>

          <InfoTextWithMargin $marginTop={12}>
            Didn&apos;t get the code?{' '}
            <LinkTextWithState onClick={onResend} $disabled={loading}>
              Resend code
            </LinkTextWithState>
          </InfoTextWithMargin>

          {error && <InfoTextError>{error}</InfoTextError>}

          <Footer>
            <Button
              variant="primary"
              onClick={() => {
                const codeString = code.join('');
                if (codeString.length === 6) {
                  onVerify(codeString);
                }
              }}
              width="100%"
              padding="12px 16px"
              borderRadius="12px"
              disabled={code.some((c) => c === '') || loading}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </Footer>
        </Container>
      </CardBox>
    </PageWrap>
  );
};

export default StepCode;
