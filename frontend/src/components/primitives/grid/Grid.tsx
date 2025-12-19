'use client';

import type { FC, JSX, CSSProperties, PropsWithChildren, HTMLAttributes } from 'react';

import {
  StyledGridContainer,
  StyledGridItem,
  StyledGridContainerProps,
  StyledGridItemProps,
} from './GridStyledElements';

import GridContext, { useInvariantInsideContainer } from './validation';

const _gridContainerStyleKeys = ['gap', 'width'] as const satisfies ReadonlyArray<keyof CSSProperties>;
type GridContainerStyleKeys = (typeof _gridContainerStyleKeys)[number];

interface GridContainerProps
  extends Pick<CSSProperties, GridContainerStyleKeys>,
    Pick<HTMLAttributes<HTMLElement>, 'style' | 'className'> {
  numColumns?: number;
  mobileNumColumns?: number;
}

interface GridItemProps extends Pick<HTMLAttributes<HTMLElement>, 'style' | 'className'> {
  colSpan?: number;
  mobileColSpan?: number;
}

const Container: FC<PropsWithChildren<GridContainerProps>> = ({ children, ...props }): JSX.Element => {
  const gridContainerProps = {
    $gap: props?.gap,
    $numColumns: props?.numColumns ?? 1,
    $mobileNumColumns: props?.mobileNumColumns ?? props?.numColumns,
    $width: props?.width,
  } satisfies StyledGridContainerProps;

  return (
    <GridContext.Provider value={true}>
      <StyledGridContainer {...gridContainerProps} style={props.style} className={props.className}>
        {children}
      </StyledGridContainer>
    </GridContext.Provider>
  );
};

const Item: FC<PropsWithChildren<GridItemProps>> = ({
  children,
  colSpan = 1,
  mobileColSpan,
  ...props
}): JSX.Element => {
  const gridItemProps = { $colSpan: colSpan, $mobileColSpan: mobileColSpan } satisfies StyledGridItemProps;

  useInvariantInsideContainer('Grid.Item');

  return (
    <StyledGridItem {...gridItemProps} style={props?.style} className={props?.className}>
      {children}
    </StyledGridItem>
  );
};

Container.displayName = 'Grid.Container';
Item.displayName = 'Grid.Item';

const Grid = {
  Container,
  Item,
};

export default Grid;
