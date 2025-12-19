import { forwardRef } from "react";
import type {
  JSX,
  CSSProperties,
  ElementType,
  ComponentPropsWithoutRef,
  Ref,
  ComponentRef,
  PropsWithChildren,
  ReactNode,
} from "react";

import FlexStyledElement, { type FlexStyledElementProps } from "./FlexStyledElement";

type FlexStyleKeys =
  | "alignItems"
  | "justifyContent"
  | "rowGap"
  | "columnGap"
  | "flexWrap"
  | "margin"
  | "marginTop"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "padding"
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "height"
  | "width"
  | "maxHeight"
  | "maxWidth";

interface FlexProps extends Pick<CSSProperties, FlexStyleKeys>, PropsWithChildren<object> {
  as?: ElementType;
  directionMobile?: CSSProperties["flexDirection"];
  isReversed?: boolean;
}

function splitFlexProps<P extends FlexProps>(props: P) {
  const {
    // style props
    alignItems,
    justifyContent,
    rowGap,
    columnGap,
    flexWrap,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    height,
    width,
    maxHeight,
    maxWidth,
    directionMobile,
    // dom props
    ...domProps
  } = props;

  const styleProps: Omit<FlexProps, "children" | "isReversed"> = {
    alignItems,
    justifyContent,
    rowGap,
    columnGap,
    flexWrap,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    height,
    width,
    maxHeight,
    maxWidth,
    directionMobile,
  };

  return { styleProps, domProps };
}

function stylePropsHandler(
  args: Omit<FlexProps, "isReversed" | "children">,
  flexDirection: CSSProperties["flexDirection"]
): FlexStyledElementProps {
  return {
    $direction: flexDirection,
    $alignItems: args?.alignItems,
    $justify: args?.justifyContent,
    $rowGap: args?.rowGap,
    $columnGap: args?.columnGap,
    $wrap: args?.flexWrap,
    $margin: args?.margin,
    $marginTop: args?.marginTop,
    $marginBottom: args?.marginBottom,
    $marginLeft: args?.marginLeft,
    $marginRight: args?.marginRight,
    $padding: args?.padding,
    $paddingTop: args?.paddingTop,
    $paddingBottom: args?.paddingBottom,
    $paddingLeft: args?.paddingLeft,
    $paddingRight: args?.paddingRight,
    $height: args?.height,
    $maxHeight: args?.maxHeight,
    $width: args?.width,
    $maxWidth: args?.maxWidth,
    $directionMobile: args?.directionMobile,
  } satisfies FlexStyledElementProps;
}

type AsProp<E extends ElementType> = { as?: E };

type PolymorphicProps<E extends ElementType, P> = AsProp<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof (AsProp<E> & P) | "children"> &
  P & { children?: ReactNode };

type DefaultElement = "div";
type DefaultRef = ComponentRef<DefaultElement>;

function createFlex(directionBase: CSSProperties["flexDirection"]) {
  function Inner<E extends ElementType = DefaultElement>(
    { as, isReversed = false, children, ...rest }: PolymorphicProps<E, FlexProps>,
    ref: Ref<ComponentRef<E>>
  ): JSX.Element {
    const { styleProps, domProps } = splitFlexProps(rest as FlexProps);
    const dir = (isReversed ? `${directionBase}-reverse` : directionBase) as CSSProperties["flexDirection"];
    const styledProps = stylePropsHandler(styleProps, dir);

    return (
      <FlexStyledElement as={as} ref={ref} {...styledProps} {...domProps}>
        {children}
      </FlexStyledElement>
    );
  }

  const Component = forwardRef<DefaultRef, PolymorphicProps<DefaultElement, FlexProps>>(Inner);

  return Component as <E extends ElementType = DefaultElement>(
    props: PolymorphicProps<E, FlexProps> & { ref?: Ref<ComponentRef<E>> }
  ) => JSX.Element;
}

const Row = createFlex("row");
const Column = createFlex("column");

const Flex = {
  Row,
  Column,
};

export default Flex;
