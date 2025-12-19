"use server";

import https from "node:https";

import { fromIni } from "@aws-sdk/credential-providers";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { formatUrl } from "@aws-sdk/util-format-url";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { parseUrl } from "@smithy/url-parser";
import { XMLParser } from "fast-xml-parser";

const S3_CONFIG = {
  bucketName: "cswap-ebecca",
  region: "us-east-2",
};

export interface PresignedUrlOptions {
  file: File;
  basePath?: string;
  useUserFolder?: boolean;
  customFolderName?: string;
  expiresIn?: number;
}

export interface PresignedUrlResult {
  success: boolean;
  uploadUrl?: string;
  imageUrl?: string;
  key?: string;
  userId?: string;
  error?: string;
}

/**
 * Get authenticated user ID
 */
// const getAuthenticatedUserId = async (contextSpec: any): Promise<string> => {
//   try {
//     const user = {
//     userId: "user000000003"
// 	}
//     return user.userId;
//   } catch (error) {
//     console.error('Error getting authenticated user:', error);
//     throw new Error('User not authenticated');
//   }
// };

// creating the presigned url so we can upload an image
export const createPresignedUrlWithoutClient = async ({ key }: { key: string }) => {
  const url = parseUrl(`https://${S3_CONFIG.bucketName}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`);

  const presigner = new S3RequestPresigner({
    credentials: fromIni(),
    region: S3_CONFIG.region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await presigner.presign(new HttpRequest({ ...url, method: "PUT" }));

  console.log(formatUrl(signedUrlObject));

  return formatUrl(signedUrlObject);
};

// uploading the image using the presigned url provided by createPresignedUrlWithoutClient
export const uploadToPresignedUrl = async (url: string, fileBuffer: Buffer, contentType: string) => {
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

          let parsed = {};

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
