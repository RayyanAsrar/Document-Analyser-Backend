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

  return await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 Min
};

export const getGetSignedUrl = async ({ key }: SignedURLArgs) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3, command);
};
