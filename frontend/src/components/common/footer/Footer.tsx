"use client";

import Link from "next/link";
import React from "react";
import {
  FooterContainer,
  RightSection,
  LeftSection,
} from "./FooterStyles";

const links = [
  {
    id: 'privacy',
    href: '#',
    label: 'Privacy Policy',
    target: '_blank',
  }, {
    id: 'tnc',
    href: '#',
    label: 'Terms & Conditions',
    target: '_blank',
  }, {
    id: 'cookie',
    href: '#',
    label: 'Cookie Policy',
    target: '_blank',
  }, {
    id: 'contact',
    href: '#',
    label: 'Contact',
    target: '_blank',
  }, 
]

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <RightSection>
        Copyright &copy; 2025 Ebecca
      </RightSection>

      <LeftSection>
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            target={link.target}
          >
            {link.label}
          </Link>
        ))}
      </LeftSection>
    </FooterContainer>
  )
}

export default Footer;
