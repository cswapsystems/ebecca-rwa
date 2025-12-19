'use client';

import React from 'react';
import {
  CardBox,
  Container,
  Header,
  Description,
  Actions,
  PageWrap,
  Title,
  BodyText,
} from '../TwoFactorAuthenticationStyles';
import Button from '@/components/common/buttons/Button';

interface StepIntroProps {
  width?: number;
  onNext: () => void;
}

const StepIntro: React.FC<StepIntroProps> = ({ width, onNext }) => {
  return (
    <PageWrap>
      <CardBox $width={width}>
        <Container>
          <Header>
            <Title>Set up Two-Factor Authentication</Title>
            <Description>
              <BodyText>
                Two-factor authentication (2FA) makes your account more secure by verifying your identity when you log
                in from a new device.
              </BodyText>
            </Description>
          </Header>

          <Actions>
            <Button variant="primary" onClick={onNext} width="100%" padding="12px 16px" borderRadius="12px">
              Set up 2FA
            </Button>
          </Actions>
        </Container>
      </CardBox>
    </PageWrap>
  );
};

export default StepIntro;
