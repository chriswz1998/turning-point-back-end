import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common'
import { FileTypeService } from './file-type.service'
import { CreateFileTypeDto } from './dto/create-file-type.dto'

@Controller('file-type')
export class FileTypeController {
    constructor(private readonly fileTypeService: FileTypeService) {}

    @Post()
    async create(@Body() createFileTypeDto: CreateFileTypeDto) {
        return this.fileTypeService.create(createFileTypeDto)
    }

    @Get()
    async findAll() {
        return this.fileTypeService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.fileTypeService.findOne(id)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.fileTypeService.remove(id)
    }
}
