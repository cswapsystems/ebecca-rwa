'use client';

import React from 'react';
import {
  CardBox,
  Container,
  Header,
  Options,
  OptionCard,
  IconWrap,
  OptionText,
  Note,
  Footer,
  SvgIcon,
  PageWrap,
  TitleH3,
  BodyText,
  OptionTitle,
  OptionSubtitle,
  NoteText,
} from '../TwoFactorAuthenticationStyles';
import Button from '@/components/common/buttons/Button';
import { colors } from '@/styles';
import type { Method } from '../TwoFactorAuthenticationTypes';

interface StepChooseProps {
  width?: number;
  method: Method;
  onSelectMethod: (method: Method) => void;
  onContinue: () => void;
}

const StepChoose: React.FC<StepChooseProps> = ({ width, method, onSelectMethod, onContinue }) => {
  return (
    <PageWrap>
      <CardBox $width={width}>
        <Container>
          <Header>
            <TitleH3>Set up Two-Factor Authentication</TitleH3>
            <BodyText>Add an extra layer of security to your account by choosing a 2FA method.</BodyText>
          </Header>

          <Options>
            <OptionCard onClick={() => onSelectMethod('app')} $selected={method === 'app'}>
              <IconWrap $selected={method === 'app'}>
                <SvgIcon $src="/icons/authenticator.svg" $selected={method === 'app'} />
              </IconWrap>
              <OptionText>
                <OptionTitle $selected={method === 'app'}>Authenticator App</OptionTitle>
                <OptionSubtitle $selected={method === 'app'}>Use a 6-digit code from an app.</OptionSubtitle>
              </OptionText>
            </OptionCard>

            <OptionCard onClick={() => onSelectMethod('email')} $selected={method === 'email'}>
              <IconWrap $selected={method === 'email'}>
                <SvgIcon $src="/icons/email.svg" $selected={method === 'email'} />
              </IconWrap>
              <OptionText>
                <OptionTitle $selected={method === 'email'}>Email Verification</OptionTitle>
                <OptionSubtitle $selected={method === 'email'}>We’ll send a code to your email.</OptionSubtitle>
              </OptionText>
            </OptionCard>

            <OptionCard onClick={() => onSelectMethod('sms')} $selected={method === 'sms'}>
              <IconWrap $selected={method === 'sms'}>
                <SvgIcon $src="/icons/sms.svg" $selected={method === 'sms'} />
              </IconWrap>
              <OptionText>
                <OptionTitle $selected={method === 'sms'}>SMS Code</OptionTitle>
                <OptionSubtitle $selected={method === 'sms'}>Receive a code through text message.</OptionSubtitle>
              </OptionText>
            </OptionCard>
          </Options>

          <Note>
            <SvgIcon $src="/icons/info.svg" $width={16} $height={17} $color={colors.base500} />
            <NoteText>You can change your 2FA method anytime in your account settings.</NoteText>
          </Note>

          <Footer>
            <Button variant="primary" onClick={onContinue} width="100%" padding="12px 16px" borderRadius="12px">
              Continue
            </Button>
          </Footer>
        </Container>
      </CardBox>
    </PageWrap>
  );
};

export default StepChoose;
