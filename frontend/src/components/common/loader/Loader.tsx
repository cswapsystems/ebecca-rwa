import type { FC, JSX } from "react";

import { StyledLoader, LoaderWrapper, LoaderTextDesktop, LoaderTextMobile } from "./LoaderStyles";
import { Flex } from "@/components/primitives";
import Typography from "../typography/Typography";

interface LoaderProps {
  isLoading: boolean;
  title: string;
  description?: string;
}

const Loader: FC<LoaderProps> = ({ isLoading, title, description }): JSX.Element | null => {
  if (!isLoading) {
    return null;
  }

  return (
    <LoaderWrapper alignItems="center" justifyContent="center" rowGap="32px">
      <Flex.Row
        directionMobile="column-reverse"
        columnGap="16px"
        rowGap="32px"
        alignItems="center"
        justifyContent="center"
      >
        <LoaderTextDesktop size="32px" lineHeight={40} color={(theme) => theme.colors.base950}>
          {title}
        </LoaderTextDesktop>
        <LoaderTextMobile size="20px" lineHeight={26} color={(theme) => theme.colors.base950}>
          {title}
        </LoaderTextMobile>
        <StyledLoader />
      </Flex.Row>
      {description && (
        <Typography.P size="16px" lineHeight={22} color={(theme) => theme.colors.base600}>
          {description}
        </Typography.P>
      )}
    </LoaderWrapper>
  );
};

export default Loader;
