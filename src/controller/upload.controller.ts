import { downloadUrlSchema, uploadUrlSchema } from "../schemas/upload.schema";
import { APIResponse } from "../utils/response";
import { getGetSignedUrl, getPutSignedUrl } from "../utils/s3";
import validate from "../utils/validation";
import { Request, Response } from "express";
import CustomError from "http-errors";

const uploadController = {
  async generateUploadUrl(req: Request, res: Response) {
    const { data, success, error } = validate(uploadUrlSchema, req.body);

    if (!success) {
      const message = error.issues?.[0]?.message || "Validation failed";
      throw CustomError(400, message);
    }

    const urlData = await getPutSignedUrl(data);

    if (!urlData) {
      throw CustomError(500, "Error generating Signed URL");
    }

    return res
      .status(200)
      .json(new APIResponse("Upload URL Generated Successfully!", urlData));
  },
  async generateDownloadURl(req: Request, res: Response) {
    const { data, success, error } = validate(downloadUrlSchema, req.body);

    if (!success) {
      const message = error.issues?.[0]?.message || "Validation failed";
      throw CustomError(400, message);
    }

    const url = await getGetSignedUrl(data);

    if (!url) {
      throw CustomError(500, "Error Generating Download URL");
    }

    return res
      .status(200)
      .json(new APIResponse("Download URL Generated Successfully", { url }));
  },
};

export default uploadController;
