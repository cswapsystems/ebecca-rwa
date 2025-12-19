'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { getNameAbbreviation } from '@/utils/stringUtils';
import { colors } from '@/styles/colors';

const AvatarContainer = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${colors.primary500};
  color: white;
  font-weight: 600;
  font-size: ${({ $size }) => $size * 0.4}px;
  flex-shrink: 0;
  user-select: none;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const AbbreviationText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

interface UserAvatarProps {
  profileImage?: string | null;
  name?: string | null;
  email?: string | null;
  size?: number;
  alt?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ profileImage, name, email, size = 36, alt = 'User avatar' }) => {
  // Use name if available, otherwise use email (take first part before @)
  const displayName = name || (email ? email.split('@')[0] : null);
  const abbreviation = getNameAbbreviation(displayName);

  return (
    <AvatarContainer $size={size}>
      {profileImage ? (
        <Image src={profileImage} alt={alt} width={size} height={size} />
      ) : (
        <AbbreviationText>{abbreviation || 'U'}</AbbreviationText>
      )}
    </AvatarContainer>
  );
};

export default UserAvatar;
