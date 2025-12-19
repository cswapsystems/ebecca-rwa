export interface Carousel {
  text: {
    title: string;
    body: string;
    button: string;
  },
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    overlay?: string;
  },
  button: {
    onClick: () => void;
  },
};

export type CarouselNavigation = "arrows" | "dots" | "both";

export interface UseCarouselPrevNext {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export interface UseCarouselDot {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotClick: (index: number) => void;
};
