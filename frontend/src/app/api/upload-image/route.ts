import { NextRequest, NextResponse } from "next/server";
import https from "node:https";

interface S3ErrorParsed {
  Error: {
    Code: string;
    Message: string;
    Resource?: string;
    RequestId?: string;
    HostId?: string;
  };
}

type ParsedS3Response = object | S3ErrorParsed;

import { fromIni } from "@aws-sdk/credential-providers";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { formatUrl } from "@aws-sdk/util-format-url";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { parseUrl } from "@smithy/url-parser";
import { XMLParser } from "fast-xml-parser";

export interface UploadImageSuccessResult {
  message: string;
  presignedUrl: string;
  fileUrl: string;
  key: string;
}

export type UploadImageErrorResult = NextResponse<{ error: string }>;

export type UploadImageResult = NextResponse<UploadImageSuccessResult> | UploadImageErrorResult;

const S3_CONFIG = {
  bucketName: "cswap-ebecca",
  region: "us-east-2",
};

// creating the presigned url so we can upload an image
const createPresignedUrlWithoutClient = async ({
  region,
  bucket,
  key,
}: {
  region: string;
  bucket: string;
  key: string;
}) => {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);

  const presigner = new S3RequestPresigner({
    credentials: fromIni(),
    region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await presigner.presign(new HttpRequest({ ...url, method: "PUT" }));

  return formatUrl(signedUrlObject);
};

// uploading the image using the presigned url provided by createPresignedUrlWithoutClient
const uploadToPresignedUrl = (url: string, fileBuffer: Buffer, contentType: string) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
          "Content-Length": fileBuffer.length,
        },
      },
      (res) => {
        let responseBody = "";

        res.on("data", (chunk) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          const parser = new XMLParser();

          let parsed: ParsedS3Response = {};

          try {
            parsed = responseBody.trim().length > 0 ? parser.parse(responseBody, true) : {};
          } catch (e) {
            parsed = {};
          }

          console.log(parsed);

          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(parsed);
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(fileBuffer);
    req.end();
  });
};

// API to upload image
export async function POST(req: NextRequest): Promise<UploadImageResult> {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (!S3_CONFIG.bucketName || !S3_CONFIG.region) {
      return NextResponse.json({ error: "bucketName and region are required." }, { status: 400 });
    }

    // TODO: Generate authenticated user
    // TODO: Generate Asset ID by createAsset

    // Generate unique key
    const key = `dev/assets/images/users/user0000000005/${Date.now()}_${file.name}`;

    // Convert File → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Create presigned URL
    const presignedUrl = await createPresignedUrlWithoutClient({
      bucket: S3_CONFIG.bucketName,
      key,
      region: S3_CONFIG.region,
    });

    // Pass the presigned url then upload binary to S3
    await uploadToPresignedUrl(presignedUrl, fileBuffer, file.type);

    const fileUrl = `https://${S3_CONFIG.bucketName}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`;

    return NextResponse.json({
      message: "File uploaded successfully.",
      presignedUrl,
      fileUrl,
      key,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 500 });
  }
}
