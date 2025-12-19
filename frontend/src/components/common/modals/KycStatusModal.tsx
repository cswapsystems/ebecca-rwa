'use client';

import React from 'react';
import Modal from './Modal';
import TextInput from '@/components/common/inputs/TextInput';
import Button from '@/components/common/buttons/Button';
import {
  KycWrap,
  Section,
  SectionTitle,
  Field,
  Label,
  Actions,
} from './KycStatusModalStyles';

interface KycStatusModalProps {
  open: boolean;
  onClose: () => void;
  businessStatus?: string;
  retailStatus?: string;
  onVendorClick?: () => void;
  onBuyerClick?: () => void;
}

const KycStatusModal: React.FC<KycStatusModalProps> = ({
  open,
  onClose,
  businessStatus = 'Under Review',
  retailStatus = 'Under Review',
  onVendorClick,
  onBuyerClick,
}) => {
  return (
    <Modal open={open} onClose={onClose} width={440} showHeader={false}>
      <KycWrap>
        <Section>
          <SectionTitle>Business KYC</SectionTitle>
          <Field>
            <Label>Status</Label>
            <TextInput
              value={businessStatus}
              onChange={() => {}}
              placeholder="Under Review"
              width="100%"
              borderRadius={12}
              fontSize={14}
              lineHeight={18}
              padding="10px 13px"
            />
          </Field>
          <Actions>
            <Button
              variant="primary"
              onClick={onVendorClick || (() => {})}
              width="100%"
              height={44}
              fontSize={16}
              lineHeight={22}
              borderRadius={12}
            >
              Vendor
            </Button>
          </Actions>
        </Section>

        <Section>
          <SectionTitle>Retail User KYC</SectionTitle>
          <Field>
            <Label>Status</Label>
            <TextInput
              value={retailStatus}
              onChange={() => {}}
              placeholder="Under Review"
              width="100%"
              borderRadius={12}
              fontSize={14}
              lineHeight={18}
              padding="10px 13px"
            />
          </Field>
          <Actions>
            <Button
              variant="primary"
              onClick={onBuyerClick || (() => {})}
              width="100%"
              height={44}
              fontSize={16}
              lineHeight={22}
              borderRadius={12}
            >
              Buyer
            </Button>
          </Actions>
        </Section>
      </KycWrap>
    </Modal>
  );
};

export default KycStatusModal;


