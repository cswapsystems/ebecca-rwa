'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { Backdrop, ModalContainer, ModalHeader, ModalTitle, ModalBody, CloseButton } from './ModalStyles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: string | number;
  maxHeight?: string | number;
  style?: React.CSSProperties;
  showHeader?: boolean;
  className?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width = 560,
  maxHeight = '80vh',
  style,
  showHeader = true,
  className,
  contentClassName,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Backdrop className={className} onClick={onBackdropClick}>
      <ModalContainer
        className={contentClassName}
        $width={width}
        $maxHeight={maxHeight}
        role="dialog"
        aria-modal="true"
        style={style}
      >
        {showHeader && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            <CloseButton aria-label="Close" onClick={onClose}>
              <Image src="/icons/modal-close.svg" alt="Close icon" width={24} height={24} />
            </CloseButton>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
