import { PrimaryLayout } from "@/components/layouts";

export default function PrimaryLayoutWrapper({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrimaryLayout>{children}</PrimaryLayout>
};