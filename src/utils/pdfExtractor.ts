import pdf from "pdf-parse";
import CustomError from "http-errors";

export const extractPDF = async ({
  fileBuffer,
  contentType,
}: {
  fileBuffer: Buffer;
  contentType: string;
}) => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  if (contentType !== "application/pdf") {
    throw CustomError(400, "The File must be Valid PDF");
  }

  if (fileBuffer?.length > MAX_FILE_SIZE) {
    throw CustomError(400, "File size exceeds 10MB limit");
  }

  const data = await pdf(fileBuffer)

  if(data.numpages > 2) {
    throw CustomError(400, "The PDF must be maximum of 2 pages")
  }

  return data;
};
