'use client';

import React from 'react';
import StepChoose from './components/StepChoose';
import StepCode from './components/StepCode';
import StepEntry from './components/StepEntry';
import StepIntro from './components/StepIntro';

type Method = 'app' | 'email' | 'sms';

interface TwoFactorAuthenticationProps {
  onSetup?: () => void;
  width?: number;
}

const TwoFactorAuthentication: React.FC<TwoFactorAuthenticationProps> = ({  width }) => {
  const [step, setStep] = React.useState<'intro' | 'choose' | 'email' | 'email_code'>('intro');
  const [method, setMethod] = React.useState<Method>('email');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isEmailValid = email.includes('@') && email.includes('.');

  const handleSetup2FA = async () => {
    if (step === 'choose') {
      if (method === 'email' || method === 'sms') {
        setStep('email');
      } else if (method === 'app') {
        // For TOTP, go directly to code entry
        await setupTOTP();
        setStep('email_code');
      }
      return;
    }
    if (step === 'email') {
      await setupEmailOrSMS();
      return;
    }
  };

  const setupTOTP = async () => {
    setError('2FA setup is not available');
    setLoading(false);
  };

  const setupEmailOrSMS = async () => {
    setError('2FA setup is not available');
    setLoading(false);
  };

  const handleVerifyCode = async (code: string) => {
    console.error(code);
    setError('2FA verification is not available');
    setLoading(false);
  };

  const handleResendCode = async () => {
    setError('Resend code is not available');
    setLoading(false);
  };


  if (step === 'intro') {
    return <StepIntro width={width} onNext={() => setStep('choose')} />;
  }

  if (step === 'email') {
    return (
      <StepEntry
        width={width}
        method={method}
        emailOrPhone={email}
        onEmailOrPhoneChange={setEmail}
        isEmailValid={isEmailValid}
        onBack={() => setStep('choose')}
        onSendCode={handleSetup2FA}
        loading={loading}
        error={error}
      />
    );
  }

  if (step === 'email_code') {
    return (
      <StepCode
        width={width}
        method={method}
        onBack={() => {
          if (method === 'email' || method === 'sms') setStep('email');
          else setStep('choose');
        }}
        onVerify={handleVerifyCode}
        onResend={handleResendCode}
        loading={loading}
        error={error}
      />
    );
  }

  return <StepChoose width={width} method={method} onSelectMethod={setMethod} onContinue={handleSetup2FA} />;
};

export default function TwoFactorAuthenticationPage() {
  return <TwoFactorAuthentication />;
}
