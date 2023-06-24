import { Injectable, Logger } from "@nestjs/common";

import { ReadStream } from "fs";

import ImageKit from "imagekit";
import { PhotoRepository } from "../mongo/entities/photo";

@Injectable()
export class PhotoService {
  private readonly logger: Logger = new Logger(PhotoService.name);
  private readonly client: ImageKit;

  constructor(private readonly photoRepository: PhotoRepository) {
    this.client = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    });
  }

  async upload(
    file: string | Buffer | ReadStream,
    fileName: string,
    streamerId: string,
    folder = ""
  ) {
    try {
      const { filePath, fileId, height, width, thumbnailUrl, url } =
        await this.client.upload({
          file,
          folder: `${process.env.NODE_ENV}/streamer/${streamerId}/${folder}`,
          fileName,
        });

      const uploadedPhoto = await this.photoRepository.create({
        uploaderStreamerId: streamerId,
        url,
        filePath,
        externalId: fileId,
        originalHeight: height,
        originalWidth: width,
        thumbnailUrl,
      });
      this.logger.debug(
        `User [${streamerId}] uploaded photo! -> filePath=${filePath}, _id=${uploadedPhoto._id}`
      );

      return uploadedPhoto;
    } catch (e) {
      this.logger.error(
        `Couldn't upload photo for User: [${streamerId}], ${JSON.stringify(e)}`
      );
      throw e;
    }
  }

  async deleteById(imageKitId: string, photoId: string) {
    try {
      await this.client.deleteFile(imageKitId);
      await this.photoRepository.findOneAndDelete({ _id: photoId });
    } catch (e) {
      this.logger.error(`Error during deletion of file: ${e}`);
      throw e;
    }
  }
}
