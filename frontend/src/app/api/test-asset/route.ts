
import {
	createAsset,
} from "@/lib/data/assetData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

	// Validate required fields
	if (!body.name || !body.price || !body.categoryId || 
		!body.subcategoryId || !body.assetTypeId || !body.tags) {
	  return NextResponse.json(
		{
		  success: false,
		  error: "Missing required fields: name, price, categoryId, subcategoryId, assetTypeId, tags are required",
		},
		{ status: 400 }
	  );
	}

	interface MetadataEntry {
		metadataKey: string;
		metadataValue: string;
		assetFieldId: string;
	}

   	// Validate metadata if available
	if (body.metadata && Array.isArray(body.metadata)) {
		const validMetadata = body.metadata.every(
		(m: MetadataEntry) => m.metadataKey && m.metadataValue && m.assetFieldId
		);

		if (!validMetadata) {
		return NextResponse.json(
			{
			success: false,
			error: "Invalid metadata: metadataKey, metadataValue, and assetFieldId are required for each entry",
			},
			{ status: 400 }
		);
		}
	}

	// Create or update asset (metadata is handled automatically)
	const result = await createAsset(body);

    return NextResponse.json({
      message: result.isNew ? "Asset created successfully" : "Asset updated successfully",
      ...result,
    }, { status: result.isNew ? 201 : 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create asset",
      },
      { status: 500 }
    );
  }
}
