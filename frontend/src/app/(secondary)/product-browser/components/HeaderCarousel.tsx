import { useRouter } from 'next/navigation';
import { Carousel } from '@/components/common';
import { Carousel as CarouselType } from '@/types';
import { HeaderSection } from '../productBrowserStyles';
import { productBrowserCarouselData } from '@/mocks/productBrowser';

export default function HeaderCarousel() {
  const router = useRouter();

  return (
    <HeaderSection>
      <Carousel
        carousel={productBrowserCarouselData as unknown as CarouselType[]}
        navigation="both"
        height={360}
        borderRadius="24px"
        onClick={() => router.push('/real-estate')}
      />
    </HeaderSection>
  );
}
