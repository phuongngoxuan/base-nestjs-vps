import { contentType as detectContentType, extension } from 'mime-types';

import { BadRequestException } from '@nestjs/common';

export enum UploadFileTypes {
  IMAGE = 'image',
  VIDEO = 'video',
}

export const SupportedImageMIMETypes = [
  'image/apng',
  'image/png',
  'image/jpeg',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
];

export const getContentType = (fileName: string): any => {
  const contentType = detectContentType(fileName);
  const ext = extension(contentType || '');
  if (!contentType || !ext) {
    throw new BadRequestException('File name is not valid');
  }

  // if (fileType === UploadFileTypes.IMAGE && !SupportedImageMIMETypes.includes(contentType)) {
  //   throw new BadRequestException("File name is not an image file");
  // }
  return {
    ContentType: contentType,
    extension: ext,
  };
};
