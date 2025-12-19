"use client";

import React from "react";
import Image from "next/image";
import { BackButtonContainer, Text, Arrow } from "./BackButtonStyles";

interface BackButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
};

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  style,
}) => {
  return (
    <BackButtonContainer
      onClick={onClick}
      style={style}
    >
      <Arrow>
        <Image
          src="/icons/arrow-left.svg"
          alt="Arrow pointing left"
          width={20}
          height={20}
          draggable={false}
        />
      </Arrow>

      <Text>Back</Text>
    </BackButtonContainer>
  )
};

export default BackButton;
