"use client";

import type { FC, JSX, InputHTMLAttributes } from "react";
import { useRef, Fragment } from "react";
import Image from "next/image";

import { ProductGalleryAddImageButtonWrapper } from "./StyledElements";

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, "onChange">;

const ProductGalleryAddImageButton: FC<Props> = ({ onChange }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onButtonClick = (): void => {
    inputRef.current?.click?.();
  };

  return (
    <Fragment>
      <ProductGalleryAddImageButtonWrapper type="button" onClick={onButtonClick}>
        <Image src="/icons/plus-gray.svg" alt="Add Image" width={16} height={16} />
      </ProductGalleryAddImageButtonWrapper>
      <input ref={inputRef} type="file" onChange={onChange} multiple accept={"/image*"} style={{ display: "none" }} />
    </Fragment>
  );
};

export default ProductGalleryAddImageButton;
