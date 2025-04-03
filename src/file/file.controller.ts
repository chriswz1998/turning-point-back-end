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
    @Post('fileByPage')
    async fileByPage(
        @Body() { pageSize, page, searchKey }: { pageSize: number; page: number; searchKey: string }
    ) {
        return await this.fileService.FileByPage(page, pageSize, searchKey)
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    test() {
        return { message: 'test' }
    }
}
