"use client";

import type { FC, JSX } from "react";
import Image from "next/image";
import { CategoryTagStyleWrapper, CategoryTagTextStyle } from "./TagsStyle";

export interface CategoryTagProps {
  tag: string;
  icon?: string;
}

const CategoryTag: FC<CategoryTagProps> = ({ icon, tag }): JSX.Element => {
  return (
    <CategoryTagStyleWrapper key={tag} alignItems="center" padding="2px 4px" columnGap="8px">
      {icon && <Image src={icon} alt={tag} width={12.83} height={11.67} unoptimized style={{ objectFit: "cover" }} />}
      <CategoryTagTextStyle weight={500} size="14px" lineHeight={20} color={(theme) => theme.colors.primary800}>
        {tag}
      </CategoryTagTextStyle>
    </CategoryTagStyleWrapper>
  );
};

export default CategoryTag;
