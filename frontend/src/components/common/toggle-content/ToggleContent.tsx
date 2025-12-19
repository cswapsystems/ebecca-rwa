'use client';

import type { FC, JSX, ReactElement, CSSProperties } from 'react';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import { Shell, Content, ToggleContentButton } from './ToggleContentStyles';

import Typography from '../typography/Typography';

interface ToggleContentProps {
  content?: ReactElement;
  contentHiddenPlaceholder?: string;
  contentVisiblePlaceholder?: string;
  defaultOpen?: boolean;
  placeholderStyle?: CSSProperties;
  hasCollapseFn?: boolean;
}

const ToggleContent: FC<ToggleContentProps> = ({
  contentHiddenPlaceholder = 'See more',
  contentVisiblePlaceholder = 'See less',
  content,
  defaultOpen = false,
  placeholderStyle,
  hasCollapseFn = true,
}): JSX.Element => {
  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<CSSProperties['height']>(defaultOpen ? 'auto' : 0);
  const [animating, setAnimating] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
      const id = window.setTimeout(() => setHeight('auto'), 270);
      return () => clearTimeout(id);
    }
  }, [open, content]);

  const toggle = () => {
    if (!innerRef.current) {
      setOpen((v) => !v);
      return;
    }

    const el = innerRef.current;
    const currentHeight = el.getBoundingClientRect().height;
    const target = el.scrollHeight;

    setAnimating(true);

    if (open) {
      if (hasCollapseFn) {
        setHeight(currentHeight);
        requestAnimationFrame(() => setHeight(0));
        setTimeout(() => {
          setAnimating(false);
          setOpen(false);
        }, 260);
      }
    } else {
      setOpen(true);
      setHeight(0);
      requestAnimationFrame(() => setHeight(target));
      setTimeout(() => {
        setAnimating(false);
        setHeight('auto');
      }, 260);
    }
  };

  useLayoutEffect(() => {
    if (defaultOpen) setHeight('auto');
  }, [defaultOpen]);

  return (
    <div>
      {(!!hasCollapseFn || !open) && (
        <ToggleContentButton onClick={toggle} type="button">
          <Typography.Span
            style={placeholderStyle}
            color={(theme) => theme.colors.base950}
            weight={500}
            size="14px"
            lineHeight={20}
          >
            {open ? hasCollapseFn && contentVisiblePlaceholder : contentHiddenPlaceholder}
          </Typography.Span>
        </ToggleContentButton>
      )}

      <Shell $height={height} $animating={animating}>
        <div ref={innerRef}>
          <Content $open={open}>{content}</Content>
        </div>
      </Shell>
    </div>
  );
};

export default ToggleContent;
