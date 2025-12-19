"use client";

import type { FC, JSX } from "react";
import { useCallback, useState, useMemo, useRef, useEffect } from "react";

import { Flex, Grid } from "@/components/primitives";
import { Typography, Modal, Carousel } from "@/components/common";
import ProductGalleryImage from "./ProductGalleryImage";
import ProductGalleryAddImageButton from "./ProductGalleryAddImageButton";
import {
  StyledViewAllImagesWrapper,
  StyledModalImageButton,
  StyledModalSmallImagesGridContainer,
  GridImagesContainer,
} from "./StyledElements";
import type { Carousel as CarouselData } from "@/types";
import { useAsset } from "@/state/hooks";

import { ProductGalleryImageSize, type ProductGalleryDataDTO, type ProductGalleryProps } from "./types";

import useGetProductGalleryData from "./useGetProductGalleryData";
import { useProductGalleryContext } from "./context/ProductGalleryProvider";

const ProductGallerySmallImagesList: FC<ProductGalleryProps> = ({
  imageGalleryData,
  type,
  onFileChange,
}): JSX.Element | null => {
  const [isViewAllImagesModalOpen, setViewAllImagesModalOpen] = useState(false);
  const { setActiveImage, modalActiveImage, setModalActiveImage } = useProductGalleryContext();
  const { formDraftImageGalleryData: ctxImageGalleryData } = useAsset();
  const productGalleryData = useGetProductGalleryData(imageGalleryData);
  const scrollToRef = useRef<((index: number) => void) | null>(null);

  const mouseEnterCallback = useCallback(
    (galleryData: ProductGalleryDataDTO) => {
      setActiveImage(galleryData ?? null);
    },
    [setActiveImage]
  );

  const productGalleryCarousel = useMemo<CarouselData[]>(() => {
    return productGalleryData?.map(
      (item, i): CarouselData => ({
        text: {
          title: "",
          body: "",
          button: "",
        },
        button: {
          onClick: () => {
            setModalActiveImage(item);
          },
        },
        image: {
          src: item?.url ?? "",
          alt: "Product Gallery Image " + (i + 1),
          height: 449,
          width: 449,
        },
      })
    );
  }, [productGalleryData, setModalActiveImage]);

  const onCarouselPreviousClick = useCallback((): void => {
    if (modalActiveImage) {
      const activeIdx = productGalleryData.findIndex((gallery) => gallery.id === modalActiveImage?.id);
      if (activeIdx > 0) {
        const newActiveImage = productGalleryData[activeIdx - 1];
        setModalActiveImage(newActiveImage);
      }
    }
  }, [modalActiveImage, productGalleryData, setModalActiveImage]);

  const onCarouselNextClick = useCallback((): void => {
    if (modalActiveImage) {
      const activeIdx = productGalleryData.findIndex((gallery) => gallery.id === modalActiveImage?.id);
      if (activeIdx > -1 && productGalleryData?.length >= activeIdx + 1) {
        const newActiveImage = productGalleryData[activeIdx + 1];
        setModalActiveImage(newActiveImage);
      }
    }
  }, [modalActiveImage, productGalleryData, setModalActiveImage]);

  if (
    (type === "asset-wizard" && (!ctxImageGalleryData || ctxImageGalleryData?.length === 0)) ||
    (type === "details-page" && !productGalleryData)
  ) {
    return null;
  }

  return (
    <Flex.Column rowGap="12px" directionMobile="row" columnGap="16px">
      <GridImagesContainer numColumns={1} mobileNumColumns={4} gap="16px">
        {productGalleryData?.slice(0, 4)?.map(
          (item, idx): JSX.Element => (
            <Grid.Item key={String(idx)}>
              <ProductGalleryImage
                size={ProductGalleryImageSize.SMALL}
                src={item?.url}
                onMouseEnter={() => mouseEnterCallback(item)}
              />
            </Grid.Item>
          )
        )}
        {type === "asset-wizard" ? (
          <Grid.Item>
            <ProductGalleryAddImageButton onChange={onFileChange} />
          </Grid.Item>
        ) : (
          <>
            {productGalleryData?.length > 4 && (
              <Grid.Item>
                <StyledViewAllImagesWrapper
                  type="button"
                  $size={ProductGalleryImageSize.SMALL}
                  onClick={() => setViewAllImagesModalOpen(true)}
                >
                  <Flex.Column rowGap="8px" alignItems="center">
                    <Typography.Span weight={700} size="24px" color={(theme) => theme.colors.white}>
                      + 5
                    </Typography.Span>
                    <Typography.Span weight={700} size="12px" color={(theme) => theme.colors.white}>
                      View All
                    </Typography.Span>
                  </Flex.Column>
                </StyledViewAllImagesWrapper>
              </Grid.Item>
            )}
          </>
        )}
      </GridImagesContainer>
      {/* View All Images Modal */}
      <Modal
        open={isViewAllImagesModalOpen}
        width="80dvw"
        onClose={() => setViewAllImagesModalOpen(false)}
        title="Images"
      >
        <Flex.Row width="100%" justifyContent="space-around">
          <StyledModalSmallImagesGridContainer numColumns={3} gap="12px">
            {productGalleryData?.map((item, idx) => (
              <Grid.Item key={String(idx)}>
                <StyledModalImageButton
                  type="button"
                  onClick={() => {
                    setModalActiveImage(item);
                    scrollToRef.current?.(idx);
                  }}
                >
                  <ProductGalleryImage
                    key={item?.id}
                    isActive={modalActiveImage?.id === item?.id}
                    size={ProductGalleryImageSize.SMALL}
                    src={item?.url}
                  />
                </StyledModalImageButton>
              </Grid.Item>
            ))}
          </StyledModalSmallImagesGridContainer>
          <Carousel
            carousel={productGalleryCarousel}
            scrollTo={scrollToRef}
            withOverlay={false}
            options={{}}
            navigation="arrows"
            width="449px"
            height="449px"
            onPrevClick={onCarouselPreviousClick}
            onNextClick={onCarouselNextClick}
          />
        </Flex.Row>
      </Modal>
    </Flex.Column>
  );
};

export default ProductGallerySmallImagesList;
