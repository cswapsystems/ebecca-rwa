"use client";

import Image from "next/image";
import { Button } from "@/components/common";
import {
  NextEraSection,
  NextEraContainer,
  CallToAction,
  TaglineContainer,
  Tagline,
  Paragraph,
  ImageContainer,
} from "./NextEraStyles";

const NextEra = () => {
  return (
    <NextEraSection>
      <NextEraContainer>
        <CallToAction>
          <TaglineContainer>
            <Tagline>Step Into the Next Era of Asset Ownership</Tagline>
            <Paragraph>Diversify your portfolio with real-world assets — simplified and decentralized.</Paragraph>
          </TaglineContainer>

          <Button variant="primary" onClick={() => {}}>
            Explore Ebecca Marketplace
          </Button>
        </CallToAction>

        <ImageContainer>
          {/* Desktop */}
          <Image
            src="/icons/home/cube-desktop.svg"
            alt="Cube Wireframe"
            fill={true}
            priority={true}
            draggable={false}
          />

          {/* Mobile */}
          <Image
            src="/icons/home/cube-mobile.svg"
            alt="Cube Wireframe"
            fill={true}
            priority={true}
            draggable={false}
          />
        </ImageContainer>
      </NextEraContainer>
    </NextEraSection>
  )
};

export default NextEra;
