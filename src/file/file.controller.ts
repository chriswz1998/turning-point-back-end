import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'
import { FileService } from './file.service'
import { UploadFileDto } from './dto/upload-file.dto'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    async upload(@Body() uploadFileDto: UploadFileDto) {
        return await this.fileService.uploadFile(uploadFileDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('recentlyFiles')
    async recentlyFiles() {
        return await this.fileService.RecentlyFiles()
    }

    @UseGuards(JwtAuthGuard)
    @Get('fileByPage')
    async fileByPage() {
        return await this.fileService.FileByPage(1, 10)
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    test() {
        return { message: 'test' }
    }
}
