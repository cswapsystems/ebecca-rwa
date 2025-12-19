'use client';

import type { FC, JSX, ReactNode } from 'react';
import Image from 'next/image';
import {
  CardContainer,
  ImageContainer,
  StyledImage,
  Title,
  TagsRow,
  Tag,
  SquareIcon,
  Details,
  Quantity,
  Description,
  Price,
} from './AssetCardStyles';

type TagKey = 'personal-collection' | 'home' | 'table' | 'green-house';

interface AssetCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  tags?: ReactNode[] | TagKey[];
  quantityLabel: string;
  description: string;
  price: number | string;
}

const AssetCard: FC<AssetCardProps> = ({
  imageSrc,
  imageAlt = 'Asset image',
  title,
  tags,
  quantityLabel,
  description,
  price,
}): JSX.Element => {
  return (
    <CardContainer>
      <ImageContainer>
        <StyledImage src={imageSrc} alt={imageAlt} fill sizes="(max-width: 600px) 100vw, 224px" unoptimized />
      </ImageContainer>

      <Title>{title}</Title>

      {tags && tags.length > 0 && (
        <TagsRow>
          {tags.map((t, idx) => {
            if (typeof t === 'string') {
              const iconMap: Record<TagKey, { src: string; alt: string; title: string }> = {
                'personal-collection': {
                  src: '/icons/personal-collection.svg',
                  alt: 'Personal Collection',
                  title: 'Personal Collection',
                },
                home: { src: '/icons/home.svg', alt: 'Home', title: 'Home' },
                table: { src: '/icons/insert-table.svg', alt: 'Table', title: 'Table' },
                'green-house': { src: '/icons/green-house.svg', alt: 'Green House', title: 'Green House' },
              };
              const meta = iconMap[t as TagKey];
              return (
                <Tag key={`${t}-${idx}`} title={meta?.title ?? 'Tag'}>
                  {meta ? (
                    <Image src={meta.src} alt={meta.alt} width={16} height={16} title={meta.title} unoptimized />
                  ) : (
                    <SquareIcon />
                  )}
                </Tag>
              );
            }
            return (
              <Tag key={idx} title={'Tag'}>
                {t ?? <SquareIcon />}
              </Tag>
            );
          })}
        </TagsRow>
      )}

      <Details>
        <Quantity>{quantityLabel}</Quantity>
        <Description>{description}</Description>
      </Details>

      <Price>{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</Price>
    </CardContainer>
  );
};

export default AssetCard;
