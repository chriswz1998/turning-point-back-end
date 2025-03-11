import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { FileService } from './file.service'
import { UploadFileDto } from './dto/upload-file.dto'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    async upload(@Body() uploadFileDto: UploadFileDto) {
        return this.fileService.uploadFile(uploadFileDto)
    }
}
