import type { JSX } from "react";

import AssetWizard from "./components/AssetWizard";
import { fetchCategories } from "@/lib/data/categoryData";
import { fetchAssetFields } from "@/lib/data/assetFieldData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page(): Promise<JSX.Element> {
  try {
    const categories = await fetchCategories();
    const assetFields = await fetchAssetFields();

    return <AssetWizard categoryData={categories} assetFields={assetFields} />;
  } catch {
    throw new Error("Failed to load assets page");
  }
}
