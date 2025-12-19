'use client';

import React, { type RefObject, useEffect } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/common';
import { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useCarouselDot, useCarouselPrevNext } from '@/hooks';
import { Carousel as CarouselData, CarouselNavigation } from '@/types';
import {
  CarouselWrapper,
  CarouselViewport,
  CarouselContainer,
  CarouselItem,
  CarouselBackground,
  CarouselOverlay,
  CarouselContents,
  TextContainer,
  Title,
  Body,
  ControlsViewport,
  ArrowsContainer,
  DotsContainer,
  Dot,
} from './CarouselStyles';

interface CarouselProps {
  carousel: CarouselData[];
  navigation: CarouselNavigation;
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  borderRadius?: string | number;
  options?: EmblaOptionsType;
  style?: React.CSSProperties;
  withOverlay?: boolean;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  scrollTo?: RefObject<((index: number) => void) | null>;
}

const Carousel: React.FC<CarouselProps> = ({
  carousel,
  navigation,
  onClick = () => {},
  width = '100%',
  height = '100%',
  padding = '48px 60px',
  borderRadius = '32px',
  options = { loop: true },
  style,
  withOverlay = true,
  onPrevClick: onPreviousClick,
  onNextClick: onNextImageClick,
  scrollTo = undefined,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;

    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotClick } = useCarouselDot(emblaApi, onNavButtonClick);

  const { isPrevDisabled, isNextDisabled, onPrevClick, onNextClick } = useCarouselPrevNext(emblaApi, onNavButtonClick);

  useEffect(() => {
    if (!scrollTo) return;
    if (!emblaApi) {
      scrollTo.current = null;
      return;
    }

    scrollTo.current = (index: number) => {
      emblaApi.scrollTo(index);
    };

    return () => {
      scrollTo.current = null;
    };
  }, [emblaApi, scrollTo]);

  return (
    <CarouselWrapper $width={width} $height={height}>
      <CarouselViewport ref={emblaRef} $borderRadius={borderRadius}>
        <CarouselContainer>
          {carousel &&
            carousel.length > 0 &&
            carousel.map((carousel: CarouselData) => (
              <CarouselItem key={carousel.text.title} onClick={onClick}>
                {carousel.image.src && (
                  <CarouselBackground $withOverlay={withOverlay}>
                    <Image
                      src={carousel.image.src}
                      alt={carousel.image.alt}
                      width={carousel.image.width}
                      height={carousel.image.height}
                      priority={true}
                      draggable={false}
                    />
                  </CarouselBackground>
                )}

                {!!withOverlay && <CarouselOverlay $overlay={carousel.image.overlay} />}

                {(carousel?.text?.title?.length > 0 ||
                  carousel?.text?.body?.length > 0 ||
                  carousel?.text?.button?.length > 0) && (
                  <CarouselContents $padding={padding} style={style}>
                    <TextContainer>
                      <Title>{carousel.text.title}</Title>
                      <Body>{carousel.text.body}</Body>
                    </TextContainer>

                    <Button variant="primary" onClick={carousel.button?.onClick ?? (() => {})} width="fit-content">
                      {carousel.text.button}
                    </Button>
                  </CarouselContents>
                )}
              </CarouselItem>
            ))}
        </CarouselContainer>
      </CarouselViewport>

      {(navigation === 'arrows' || navigation === 'both') && (
        <ControlsViewport className="arrows">
          <ArrowsContainer>
            {/* Previous Slide */}
            <Button
              variant="secondary"
              onClick={() => {
                onPrevClick();
                onPreviousClick?.();
              }}
              width={80}
              height={80}
              padding={20}
              borderRadius="50%"
              disabled={isPrevDisabled}
              style={{
                background: 'white',
                border: 'none',
                boxShadow: '0 8px 16px 0 rgba(0, 0, 21, 0.15)',
              }}
            >
              <Image
                width={15}
                height={25}
                src="/icons/carousel/previous.svg"
                alt="Previous Slide"
                style={{ marginRight: '4px' }}
              />
            </Button>

            {/* Next Slide */}
            <Button
              variant="secondary"
              onClick={() => {
                onNextClick();
                onNextImageClick?.();
              }}
              width={80}
              height={80}
              padding={20}
              borderRadius="50%"
              disabled={isNextDisabled}
              style={{
                background: 'white',
                border: 'none',
                boxShadow: '0 8px 16px 0 rgba(0, 0, 21, 0.15)',
              }}
            >
              <Image
                width={15}
                height={25}
                src="/icons/carousel/next.svg"
                alt="Next Slide"
                style={{ marginLeft: '4px' }}
              />
            </Button>
          </ArrowsContainer>
        </ControlsViewport>
      )}

      {(navigation === 'dots' || navigation === 'both') && (
        <ControlsViewport className="dots">
          <DotsContainer>
            {scrollSnaps.map((_, index) => (
              <Dot
                key={index}
                onClick={() => onDotClick(index)}
                className={index === selectedIndex ? 'selected' : undefined}
              />
            ))}
          </DotsContainer>
        </ControlsViewport>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
