"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  FeaturesSection,
  FeaturesContainer,
  FeaturesTitle,
  FeaturesList,
  FeatureItem,
  Feature,
  Description,
  ProgressBar,
  ProgressFill,
  ImageContainer,
} from "./FeaturesStyles";

const features = [
  {
    title: "Best-in-Class Tokenization Process",
    description: "Research-backed, industry-specific metadata templates.",
    image: "/images/home/feature-1.png"
  }, {
    title: "Unleash the Power of Real World Assets",
    description: "Discover how our platform empowers users to access diverse untapped income opportunities.",
    image: "/images/home/feature-2.png"
  }, {
    title: "Manage Your Portfolio",
    description: "Buy, sell, or hold assets via an account portfolio dashboard. Advanced features include fractionalization and physical  redemption.",
    image: "/images/home/feature-3.png"
  }, {
    title: "Simple & Compliant Onboarding",
    description: "Our secure KYC and Digital Identity process verifies suppliers quickly, enabling users to trade real-world assets with confidence.",
    image: "/images/home/feature-4.png"
  },
];

const Features = () => {
  const intervalRef = useRef<number | null>(null);
  const [highlightedFeature, setHighlightedFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([ entry ]) => {
      if (entry.isIntersecting) {
        if (intervalRef.current === null) {
          intervalRef.current = window.setInterval(() => {
            setHighlightedFeature((prev) => (prev + 1) % features.length);
          }, 5000);
        }
      } else {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, { threshold: 0.2 });

    const featuresSection = document.getElementById("features-section");

    if (featuresSection) observer.observe(featuresSection);

    return () => {
      observer.disconnect();

      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Preloads the images in the memory
  useEffect(() => {
    features.forEach(feature => {
      const img = new window.Image();
      img.src = feature.image;
    });
  }, []);

  return (
    <FeaturesSection id="features-section">
      <FeaturesContainer>
        <FeaturesTitle>
          A Digital Gateway to the Real World
        </FeaturesTitle>

        <FeaturesList>
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              className={highlightedFeature === index ? "active" : "inactive"}
            >
              <Feature>{feature.title}</Feature>

              <Description className={highlightedFeature === index ? "visible" : "hidden"}>
                {feature.description}
              </Description>

              <ProgressBar className={highlightedFeature === index ? "visible" : "hidden"}>
                <ProgressFill />
              </ProgressBar>
            </FeatureItem>
          ))}
        </FeaturesList>
      </FeaturesContainer>

      <ImageContainer>
        {features.map((feature, index) => (
          <Image
            key={feature.title}
            src={feature.image}
            alt={feature.title}
            fill={true}
            draggable={false}
            priority={index === 0}
            style={{ opacity: highlightedFeature === index ? 1 : 0 }}
          />
        ))}
      </ImageContainer>
    </FeaturesSection>
  )
};

export default Features;
