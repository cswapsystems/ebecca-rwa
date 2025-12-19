"use server";

import type { GenerateAssetCertificatePdfRequest } from "@/app/api/generate-asset-certificate-pdf/route";

export const generateAssetCertificateData = async (params: GenerateAssetCertificatePdfRequest): Promise<Blob> => {
  try {
    const response = await fetch("/api/generate-asset-certificate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to generate asset certificate");
    }

    const generatedPdf = await response.blob();
    return generatedPdf;
  } catch {
    console.error("Error generating asset certificate");
    throw new Error("Error generating asset certificate");
  }
};
