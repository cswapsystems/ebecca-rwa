'use client';

import React from 'react';
import { Link } from './NavStyles';
import { Nav as NavItem } from '@/types';

interface NavProps {
  nav: NavItem;
}

const Nav: React.FC<NavProps> = ({ nav }) => {
  return (
    <Link href={nav.href} target={nav.target ? nav.target : '_self'}>
      {nav.label}
    </Link>
  );
};

export default Nav;
