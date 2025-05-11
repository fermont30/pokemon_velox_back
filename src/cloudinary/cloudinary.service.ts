import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { ConfigService } from '@nestjs/config';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from 'src/config/constants';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>(CLOUDINARY_CLOUD_NAME),
      api_key: this.configService.get<string>(CLOUDINARY_API_KEY),
      api_secret: this.configService.get<string>(CLOUDINARY_API_SECRET),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    publicId?: string,
  ): Promise<{ secure_url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: 'pokemons',
        public_id: publicId,
        overwrite: true,
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve({
            secure_url: result?.secure_url || '',
            public_id: result?.public_id || '',
          });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
