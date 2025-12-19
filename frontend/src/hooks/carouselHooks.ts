import { EmblaCarouselType } from 'embla-carousel';
import { useState, useEffect, useCallback } from "react";
import { UseCarouselDot, UseCarouselPrevNext } from "@/types";

// Carousel Dot Navigation
export const useCarouselDot = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseCarouselDot => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotClick
  };
};

// Carousel Prev / Next Navigation
export const useCarouselPrevNext = (
  emblaApi: EmblaCarouselType | undefined,
  onClick?: (emblaApi: EmblaCarouselType) => void
): UseCarouselPrevNext => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  // Prev
  const onPrevClick = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();

    if (onClick) onClick(emblaApi);
  }, [emblaApi, onClick]);

  // Next
  const onNextClick = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();

    if (onClick) onClick(emblaApi);
  }, [emblaApi, onClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setIsPrevDisabled(!emblaApi.canScrollPrev());
    setIsNextDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    isPrevDisabled,
    isNextDisabled,
    onPrevClick,
    onNextClick
  };
};
