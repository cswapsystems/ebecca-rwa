import type { FC, JSX, ButtonHTMLAttributes } from "react";
import Image from "next/image";

import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";

import { StyledBackButtonWrapper, StyledIconContainer } from "./ButtonStyles";

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const PageBackButton: FC<Props> = ({ onClick }): JSX.Element => {
  return (
    <Flex.Row
      as={StyledBackButtonWrapper}
      alignItems="center"
      columnGap="8px"
      type="button"
      onClick={(e) => onClick?.(e)}
    >
      <StyledIconContainer>
        <Image src="/icons/arrow-left.svg" alt="Back arrow" fill style={{ objectFit: "cover" }} />
      </StyledIconContainer>
      <Typography.H4
        size="16px"
        texttransform="capitalize"
        lineHeight={22}
        color={(theme) => theme.colors.base800}
        weight={500}
      >
        back
      </Typography.H4>
    </Flex.Row>
  );
};

export default PageBackButton;
