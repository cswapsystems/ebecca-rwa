import type { FC, JSX, PropsWithChildren } from 'react';

import {
  StyledProductDetailsContentContainer,
  StyledProductDetailsContentContainerMobile,
} from './ProductDetailElements';

const ProductDetailsContentContainer: FC<PropsWithChildren<object>> = ({ children }): JSX.Element => (
  <>
    <StyledProductDetailsContentContainer columnGap="22px" alignItems="flex-start" width="100%">
      {children}
    </StyledProductDetailsContentContainer>
    <StyledProductDetailsContentContainerMobile
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor={(theme) => theme.colors.white}
      width="100%"
      border="none"
      borderRadius="16px"
      padding="24px 16px"
      gap="28px"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
    >
      {children}
    </StyledProductDetailsContentContainerMobile>
  </>
);

export default ProductDetailsContentContainer;
