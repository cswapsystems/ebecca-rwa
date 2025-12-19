"use client";

import React from "react";
import { Carousel } from "@/components/common";
import { useRouter } from "next/navigation";
import { HeroSection } from "./HeroStyles";
import { Carousel as CarouselData } from "@/types";

const Hero = () => {
  const router = useRouter();

  const sampleCarousel: CarouselData[] = [
    {
      text: {
        title: "Own Real Estate without the Red Tape",
        body: "Access global properties through tokenized shares. Invest fractionally, earn passive income, and diversify your portfolio—without dealing with brokers or banks.",
        button: "View Real Estate Deals",
      },
      image: {
        src: "/images/home/hero.png",
        alt: "Buildings from below",
        width: 1080,
        height: 394,
        overlay: "#1C278C",
      },
      button: {
        onClick: () => router.push("/real-estate"),
      },
    }, {
      text: {
        title: "We Need More Carousel Items",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, rem hic alias labore, similique autem reprehenderit nulla voluptas repudiandae sit, mollitia dolor voluptatem modi tenetur?",
        button: "Need More Carousel Items",
      },
      image: {
        src: "/images/home/hero.png",
        alt: "Buildings from below",
        width: 1080,
        height: 394,
        overlay: "#939393",
      },
      button: {
        onClick: () => router.push("/commodities"),
      },
    },
  ];

  return (
    <HeroSection>
      <Carousel
        carousel={sampleCarousel}
        navigation="both"
      />
    </HeroSection>
  )
};

export default Hero;
