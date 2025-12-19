'use client';

import { productFilterLabels, productKycOptions, productSubcategoryOptions } from '@/mocks/productBrowser';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActiveTrack,
  CaretIcon,
  Checkbox,
  CollapseButton,
  Knob,
  OptionRow,
  OptionText,
  Panel,
  PriceBlock,
  RangeRow,
  RangeText,
  SectionContainer,
  SectionLabel,
  SectionRow,
  SliderWrap,
  Track,
} from './FilterPanelStyles';

type Subcategory = (typeof productSubcategoryOptions)[number];
type Kyc = (typeof productKycOptions)[number];

type FilterValue = string[] | number | undefined;

interface FilterSection {
  key: string;
  label: string;
  options: string[];
}

interface FilterState {
  [key: string]: FilterValue;
  subcategory?: Subcategory[];
  kyc?: Kyc[];
  minPrice: number;
  maxPrice: number;
}

interface FilterPanelProps {
  initial?: Partial<FilterState>;
  onChange?: (filters: FilterState) => void;
  trackWidthPx?: number;
  resultCount?: number;
  sections?: FilterSection[];
  subcategoryOptions?: Subcategory[];
  kycOptions?: Kyc[];
}

const DEFAULT_STATE: FilterState = {
  subcategory: [],
  kyc: [],
  minPrice: 0,
  maxPrice: 1000,
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  initial,
  onChange,
  trackWidthPx = 192,
  sections: sectionsProp,
  subcategoryOptions: subcategoryOptionsProp,
  kycOptions: kycOptionsProp,
}) => {
  const normalizeSelectionValue = useCallback((value: unknown): string[] => {
    if (Array.isArray(value)) return value as string[];
    if (typeof value === 'string') return [value];
    return [];
  }, []);

  const [selections, setSelections] = useState<Record<string, string[]>>(() => {
    const entries = Object.entries(initial ?? {})
      .filter(([k]) => k !== 'minPrice' && k !== 'maxPrice')
      .reduce<Record<string, string[]>>((acc, [k, v]) => {
        acc[k] = normalizeSelectionValue(v);
        return acc;
      }, {});
    return entries;
  });
  const [minPrice] = useState<number>(initial?.minPrice ?? DEFAULT_STATE.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(initial?.maxPrice ?? DEFAULT_STATE.maxPrice);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [measuredTrackWidth, setMeasuredTrackWidth] = useState<number>(trackWidthPx);

  const MIN_BOUND = DEFAULT_STATE.minPrice; // 0
  const MAX_BOUND = DEFAULT_STATE.maxPrice; // 1000

  const knobLeft = useMemo(() => {
    const total = MAX_BOUND - MIN_BOUND;
    const ratio = total === 0 ? 0 : (maxPrice - MIN_BOUND) / total;
    return Math.max(0, Math.min(measuredTrackWidth, Math.round(ratio * measuredTrackWidth)));
  }, [maxPrice, measuredTrackWidth, MIN_BOUND, MAX_BOUND]);

  const KNOB_RADIUS = 10; // must match Knob 20px size in styles
  const activeWidth = useMemo(() => {
    return Math.min(measuredTrackWidth, knobLeft + KNOB_RADIUS);
  }, [measuredTrackWidth, knobLeft]);

  const emit = useCallback(
    (next?: Partial<FilterState>) => {
      if (!onChange) return;
      onChange({
        ...DEFAULT_STATE,
        ...selections,
        minPrice,
        maxPrice,
        ...(next ?? {}),
      });
    },
    [onChange, selections, minPrice, maxPrice]
  );

  // Create a stable dependency string from filter values
  // uncomment once filterKey will be used.
  // const filterKey = useMemo(() => {
  //   if (!initial) return '';
  //   return JSON.stringify({
  //     category: initial.category ?? null,
  //     subcategory: initial.subcategory ?? null,
  //     kyc: initial.kyc ?? null,
  //     maxPrice: initial.maxPrice ?? null,
  //   });
  // }, [initial]);

  useEffect(() => {
    if (!initial) {
      setSelections({});
      setMaxPrice(DEFAULT_STATE.maxPrice);
      return;
    }
    const nextSelections = Object.entries(initial)
      .filter(([k]) => k !== 'minPrice' && k !== 'maxPrice')
      .reduce<Record<string, string[]>>((acc, [k, v]) => {
        acc[k] = normalizeSelectionValue(v);
        return acc;
      }, {});
    setSelections(nextSelections);
    if (initial.maxPrice !== undefined) setMaxPrice(initial.maxPrice);
    else setMaxPrice(DEFAULT_STATE.maxPrice);
  }, [initial, normalizeSelectionValue]);

  const valueFromClientX = useCallback(
    (clientX: number): number => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return maxPrice;
      const localX = Math.max(0, Math.min(measuredTrackWidth, Math.round(clientX - rect.left)));
      const ratio = measuredTrackWidth === 0 ? 0 : localX / measuredTrackWidth;
      const value = MIN_BOUND + Math.round(ratio * (MAX_BOUND - MIN_BOUND));
      return Math.max(MIN_BOUND, Math.min(MAX_BOUND, value));
    },
    [maxPrice, measuredTrackWidth, MIN_BOUND, MAX_BOUND]
  );

  const updateMaxPriceFromPointer = useCallback(
    (clientX: number) => {
      const nextValue = valueFromClientX(clientX);
      if (nextValue !== maxPrice) {
        setMaxPrice(nextValue);
        emit({ maxPrice: nextValue });
      }
    },
    [maxPrice, emit, valueFromClientX]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updateMaxPriceFromPointer(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, updateMaxPriceFromPointer]);

  useEffect(() => {
    if (!isDragging) return;
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) updateMaxPriceFromPointer(e.touches[0].clientX);
    };
    const onTouchEnd = () => setIsDragging(false);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, updateMaxPriceFromPointer]);

  const subcategoryChoices = useMemo(
    () => subcategoryOptionsProp ?? (productSubcategoryOptions as unknown as Subcategory[]) ?? [],
    [subcategoryOptionsProp]
  );
  const kycChoices = useMemo(
    () => kycOptionsProp ?? (productKycOptions as unknown as Kyc[]) ?? [],
    [kycOptionsProp]
  );

  const computedSections: FilterSection[] = useMemo(() => {
    if (Array.isArray(sectionsProp) && sectionsProp.length > 0) return sectionsProp;
    const fallback: FilterSection[] = [];
    if (subcategoryChoices.length > 0) {
      fallback.push({
        key: 'subcategory',
        label: productFilterLabels.subcategories,
        options: subcategoryChoices as string[],
      });
    }
    if (kycChoices.length > 0) {
      fallback.push({ key: 'kyc', label: productFilterLabels.kycRequirement, options: kycChoices as string[] });
    }
    return fallback;
  }, [sectionsProp, subcategoryChoices, kycChoices]);

  useEffect(() => {
    if (computedSections.length === 0) return;
    setOpenSections((prev) => {
      const next: Record<string, boolean> = { ...prev };
      computedSections.forEach((s) => {
        if (next[s.key] === undefined) next[s.key] = true;
      });
      return next;
    });
  }, [computedSections]);

  // Measure track width to sync calculations with responsive CSS width
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setMeasuredTrackWidth(Math.round(el.clientWidth));
    measure();
    const ResizeObs: typeof ResizeObserver | undefined =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? (window.ResizeObserver as typeof ResizeObserver)
        : undefined;
    const ro = ResizeObs ? new ResizeObs(() => measure()) : undefined;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Panel>
      {computedSections.map((section) => {
        const isOpen = openSections[section.key] ?? true;
        const selected = selections[section.key] ?? [];
        return (
          <SectionContainer key={section.key}>
            <SectionRow onClick={() => setOpenSections((prev) => ({ ...prev, [section.key]: !isOpen }))}>
              <SectionLabel>{section.label}</SectionLabel>
              <CollapseButton
                aria-label={isOpen ? `Collapse ${section.label}` : `Expand ${section.label}`}
                $open={isOpen}
              >
                <CaretIcon src="/icons/chevron-up.svg" alt="toggle" />
              </CollapseButton>
            </SectionRow>

            {isOpen &&
              section.options.map((label) => {
                const isChecked = selected.includes(label);
                return (
                  <OptionRow
                    key={label}
                    onClick={() => {
                      const nextValues = isChecked
                        ? selected.filter((option) => option !== label)
                        : [...selected, label];
                      const next = { ...selections, [section.key]: nextValues };
                      setSelections(next);
                      emit({ [section.key]: nextValues } as Partial<FilterState>);
                    }}
                  >
                    <Checkbox $checked={isChecked} />
                    <OptionText>{label}</OptionText>
                  </OptionRow>
                );
              })}
          </SectionContainer>
        );
      })}

      <PriceBlock>
        <OptionRow>
          <SectionLabel>{productFilterLabels.price}</SectionLabel>
        </OptionRow>
        <SliderWrap>
          <Track
            ref={trackRef}
            onMouseDown={(e) => {
              updateMaxPriceFromPointer(e.clientX);
              setIsDragging(true);
            }}
            onTouchStart={(e) => {
              if (e.touches && e.touches[0]) {
                updateMaxPriceFromPointer(e.touches[0].clientX);
                setIsDragging(true);
              }
            }}
          >
            <ActiveTrack $widthPx={activeWidth} />
            <Knob $leftPx={knobLeft} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)} />
          </Track>
          <RangeRow>
            <RangeText>{MIN_BOUND}</RangeText>
            <RangeText>{MAX_BOUND}</RangeText>
          </RangeRow>
        </SliderWrap>
      </PriceBlock>
    </Panel>
  );
};

export default FilterPanel;
