import { RefObject, useCallback, useRef } from 'react';

interface DragState {
  active: boolean;
  startX: number;
  scrollLeft: number;
  pointerId: number | null;
}

export interface UseMouseDragScrollOptions {
  /**
   * CSS selector used to skip drag behaviour when the pointer starts on an interactive element.
   * Defaults to 'button'.
   */
  ignoreSelector?: string;
  /**
   * Cursor applied on the container while dragging. Defaults to 'grabbing'.
   */
  draggingCursor?: string;
}

export interface MouseDragScrollHandlers {
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void;
}

export function useMouseDragScroll<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options?: UseMouseDragScrollOptions
): MouseDragScrollHandlers {
  const dragStateRef = useRef<DragState>({
    active: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: null,
  });

  const ignoreSelector = options?.ignoreSelector ?? 'button';
  const draggingCursor = options?.draggingCursor ?? 'grabbing';

  const stopDragging = useCallback(() => {
    const container = containerRef.current;
    if (!container || !dragStateRef.current.active) return;

    if (dragStateRef.current.pointerId !== null) {
      container.releasePointerCapture?.(dragStateRef.current.pointerId);
    }

    dragStateRef.current = {
      active: false,
      startX: 0,
      scrollLeft: 0,
      pointerId: null,
    };
    container.style.cursor = '';
  }, [containerRef]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse') return;
      if (event.button !== 0) return;

      const target = event.target as HTMLElement;
      if (ignoreSelector && target.closest(ignoreSelector)) return;

      const container = containerRef.current;
      if (!container) return;

      dragStateRef.current = {
        active: true,
        startX: event.clientX,
        scrollLeft: container.scrollLeft,
        pointerId: event.pointerId,
      };

      container.setPointerCapture?.(event.pointerId);
      container.style.cursor = draggingCursor;
    },
    [containerRef, ignoreSelector, draggingCursor]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStateRef.current.active) return;

      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const deltaX = event.clientX - dragStateRef.current.startX;
      container.scrollLeft = dragStateRef.current.scrollLeft - deltaX;
    },
    [containerRef]
  );

  const onPointerUp = useCallback(() => {
    stopDragging();
  }, [stopDragging]);

  const onPointerLeave = useCallback(() => {
    stopDragging();
  }, [stopDragging]);

  const onPointerCancel = useCallback(() => {
    stopDragging();
  }, [stopDragging]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,
  };
}
