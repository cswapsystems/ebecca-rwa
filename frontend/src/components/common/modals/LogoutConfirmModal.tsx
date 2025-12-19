'use client';

import React from 'react';
import Modal from './Modal';
import Button from '@/components/common/buttons/Button';
import { LogoutWrap, Title, Message, ButtonGroup, LogoutButton } from './LogoutConfirmModalStyles';

interface LogoutConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ open, onClose, onConfirm, isLoading }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal open={open} onClose={onClose} width={440} showHeader={false}>
      <LogoutWrap>
        <Title>Confirm Logout</Title>
        <Message>Are you sure you want to logout? You&apos;ll need to log in again to access your account.</Message>

        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={onClose}
            width="100%"
            height={44}
            fontSize={16}
            lineHeight={22}
            borderRadius={12}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <LogoutButton
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </LogoutButton>
        </ButtonGroup>
      </LogoutWrap>
    </Modal>
  );
};

export default LogoutConfirmModal;

