import { SecondaryLayout } from "@/components/layouts";

export default function SecondaryLayoutWrapper({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SecondaryLayout>{children}</SecondaryLayout>
};
