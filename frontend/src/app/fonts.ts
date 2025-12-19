import { Inter, Roboto } from 'next/font/google';

export const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--inter',
});

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--roboto',
});
