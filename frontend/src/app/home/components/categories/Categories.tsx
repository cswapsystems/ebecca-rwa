"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CategoriesSection,
  Card,
  CardContainer,
  CardOverview,
  CardDetails,
  CardTitle,
  CardDescription,
  LinkContainer,
  ViewLink,
} from "./CategoriesStyles";

const Categories = () => {
  const router = useRouter();

  const sampleCards = [
    {
      image: {
        src: "/images/home/category-real-estate.png",
      },
      text: {
        title: "Invest in a Property Anywhere",
        description:
          "Own fractional shares of high-value real estate across the globe. Diversify without the barriers of traditional ownership.",
      },
      link: {
        label: "Real Estate",
        url: "/real-estate",
      },
    },
    {
      image: {
        src: "/images/home/category-commodities.png",
      },
      text: {
        title: "Backed by Real Assets",
        description:
          "Trade tokenized gold, silver, and other physical commodities. Secure, verifiable, and blockchain-powered.",
      },
      link: {
        label: "Commodities",
        url: "/commodities",
      },
    },
    {
      image: {
        src: "/images/home/category-tradfi.png",
      },
      text: {
        title: "Traditional Finance, Upgraded",
        description:
          "Access bonds, equities, and other financial instruments through tokenized vehicles—bringing liquidity to legacy markets.",
      },
      link: {
        label: "TradFi",
        url: "/tradfi",
      },
    },
    {
      image: {
        src: "/images/home/category-collectibles.png",
      },
      text: {
        title: "Digital Access to Rare Assets",
        description:
          "Invest in graded cards, rare items, and cultural collectibles—all authenticated and stored securely off-chain.",
      },
      link: {
        label: "Collectibles",
        url: "/collectibles",
      },
    },
  ];

  return (
    <CategoriesSection>
      {sampleCards.map((card) => (
        <Card key={card.link.url}>
          <CardContainer>
            <CardOverview>
              <Image
                src={card.image.src}
                alt={`${card.link.label} Listing`}
                width={340}
                height={208}
                draggable={false}
              />

              <CardDetails>
                <CardTitle>{card.text.title}</CardTitle>
                <CardDescription>{card.text.description}</CardDescription>
              </CardDetails>
            </CardOverview>

            <LinkContainer onClick={() => router.push(card.link.url)}>
              <ViewLink>View {card.link.label}</ViewLink>

              <Image src="/icons/home/view.svg" alt="Arrow pointing right" width={24} height={24} draggable={false} />
            </LinkContainer>
          </CardContainer>
        </Card>
      ))}
    </CategoriesSection>
  );
};

export default Categories;
