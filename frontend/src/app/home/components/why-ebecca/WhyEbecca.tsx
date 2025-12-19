"use client";

import {
  WhyEbeccaSection,
  WhyEbeccaContainer,
  TitleContainer,
  Title,
  Description,
  CardsContainer,
  Card,
} from "./WhyEbeccaStyles";

const advantages = [
  {
    title: "Fractional Ownership",
    description: "Gain exposure to premium assets in flexible amounts — tailored to portfolios of any scale.",
  }, {
    title: "Borderless Transactions",
    description: "No banks, no intermediaries — just you and your wallet.",
  }, {
    title: "24/7 Liquidity",
    description: "Trade tokenized assets anytime on decentralized markets.",
  },
];

const WhyEbecca = () => {
  return (
    <WhyEbeccaSection>
      <WhyEbeccaContainer>
        <TitleContainer>
          <Title className="section">Why Choose Ebecca?</Title>

          <Description className="section">
            Access global assets through tokenized shares. Gain flexible exposure, unlock income opportunities, and diversify your portfolio — without dealing with brokers or banks.
          </Description>
        </TitleContainer>

        <CardsContainer>
          {advantages.map((advantage, index) => (
            <Card key={advantage.title}>
              <Title className={`card card-${index + 1}`}>{advantage.title}</Title>
              <Description className="card">{advantage.description}</Description>
            </Card>
          ))}
        </CardsContainer>
      </WhyEbeccaContainer>
    </WhyEbeccaSection>
  )
};

export default WhyEbecca;
