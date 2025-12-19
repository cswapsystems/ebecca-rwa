export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export interface GenerateAssetCertificatePdfRequest {
  data: Array<string>;
}

export type GeneratePdfResponse = NextResponse<ArrayBuffer> | NextResponse<{ error: string }>;

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Array<Buffer> = [];

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk as Buffer));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (err) => reject(err));
  });
}

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export async function POST(req: NextRequest): Promise<GeneratePdfResponse> {
  try {
    const body: GenerateAssetCertificatePdfRequest = await req.json();

    const { data } = body;

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const stream = doc as unknown as Readable;

    doc.fontSize(24).text("Asset Certificate", {
      align: "center",
    });

    doc.moveDown().moveDown();

    doc.fontSize(12);
    data.forEach((value) => {
      doc.text(value, {
        align: "center",
        paragraphGap: 12,
      });
      doc.moveDown();
    });

    doc.end();

    const pdfBuffer = await streamToBuffer(stream);
    const pdfArrayBuffer = bufferToArrayBuffer(pdfBuffer);

    return new NextResponse(pdfArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="dynamic-document.pdf"',
      },
    }) as NextResponse<ArrayBuffer>;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong or invalid request body " + error,
      },
      {
        status: 400,
      }
    );
  }
}
