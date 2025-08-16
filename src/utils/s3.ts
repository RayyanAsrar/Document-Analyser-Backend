import env from "@/config/env";
import s3 from "@/config/s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { AWS_BUCKET_NAME } = env;

interface SignedURLArgs {
  fileName?: string;
  contentType?: string;
  key?: string;
}

export const getPutSignedUrl = async ({
  fileName,
  contentType,
}: SignedURLArgs) => {
  const key = `uploads/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 Min

  return { url, key };
};

export const getGetSignedUrl = async ({ key }: SignedURLArgs) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3, command);
};

export const downloadFileFromS3 = async (key: string): Promise<Buffer> => {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    });

    const response = await s3.send(command);

    if (!response.Body) {
      throw new Error("No file content received from S3");
    }

    const chunks: Uint8Array[] = [];
    const stream = response.Body as any;

    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  } catch (error) {
    throw new Error(`Failed to download file from S3: ${error}`);
  }
};
