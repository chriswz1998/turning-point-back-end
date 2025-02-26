import { Controller, Post, Body } from '@nestjs/common'
import { FileService } from './file.service'
import { UploadFileDto } from './dto/upload-file.dto'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    async upload(@Body() uploadFileDto: UploadFileDto) {
        return this.fileService.uploadFile(uploadFileDto)
    }
}
