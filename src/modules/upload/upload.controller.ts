import { Controller, Post, Get, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadDto } from './dto/upload.dto';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload Image' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): any {
    return this.uploadService.uploadS3(file);
  }

  @Get()
  @ApiOperation({ summary: 'Upload Image with url' })
  generateUrlUpload(@Query() uploadDto: UploadDto): any {
    return this.uploadService.generateToken(uploadDto);
  }
}
