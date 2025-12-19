import './globals.css';
import Providers from '@/app/Providers';
import { inter, roboto } from '@/app/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ebecca - Own a piece of the real world on-chain',
  description: 'Decentralized real world asset ownership on the blockchain',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fonts = [inter.variable, roboto.variable];

  return (
    <html lang="en">
      <body className={`${fonts.join(' ')}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
