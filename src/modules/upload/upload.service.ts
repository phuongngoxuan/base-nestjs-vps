import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as config from 'config';
import { AwsConfigDto } from './dto/aws-config.dto';
import { getContentType } from './upload.utils';
import { UploadDto } from './dto/upload.dto';
import { httpErrors } from 'src/shares/exceptions';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { uid } from 'src/shares/helpers/utils';
const aws_config = config.get<AwsConfigDto>('aws_config');

@Injectable()
export class UploadService {
  private readonly bucketName = aws_config.aws_bucket_name;
  private readonly s3Path = aws_config.upload_path;
  private publicUrl = `https://${aws_config.domain}/${
    aws_config.domain === 's3.amazonaws.com' ? aws_config.aws_bucket_name + '/' : ''
  }`;

  getS3(): S3 {
    return new S3({
      region: aws_config.aws_region,
      credentials: {
        accessKeyId: aws_config.aws_access_key_id,
        secretAccessKey: aws_config.aws_secret_access_key,
      },
    });
  }

  generateToken(uploadDto: UploadDto): { upload_url: string; image_url: string } {
    const { fileName } = uploadDto;
    const s3 = this.getS3();
    const { ContentType, extension } = getContentType(fileName);
    const params = {
      Bucket: aws_config.aws_bucket_name,
      Key: `${aws_config.upload_path}/${Date.now()}_${uid()}.${extension}`,
      ACL: 'public-read',
      ContentType,
      Expires: 5 * 60,
    };
    const url = s3.getSignedUrl('putObject', params);
    return {
      upload_url: url,
      image_url: `${this.publicUrl}${params.Key}`,
    };
  }

  async uploadS3(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException({
        message: httpErrors.FILE_NOT_FOUND,
      });
    }
    const myFile = file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const fineName = myFile[0];
    const bucketName = aws_config.aws_bucket_name;
    const s3 = this.getS3();
    const finalName = `${fineName}_${new Date().toISOString()}.${fileType}`;
    const params: PutObjectRequest = {
      Bucket: `${bucketName}`,
      Key: finalName,
      Body: file.buffer,
      ContentDisposition: 'inline',
      ContentType: `image/${fileType}`,
    };

    const { Location, Key } = await s3.upload(params).promise();
    return { location: Location, key: Key };
  }
}
