import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateFileTypeDto } from './dto/create-file-type.dto'

@Injectable()
export class FileTypeService {
    constructor(private prisma: PrismaService) {}

    // 创建文件类型
    async create(createFileTypeDto: CreateFileTypeDto) {
        return this.prisma.fileType.create({
            data: {
                typename: createFileTypeDto.typename
            }
        })
    }

    // 获取所有文件类型
    async findAll() {
        return this.prisma.fileType.findMany()
    }

    // 获取单个文件类型
    async findOne(id: string) {
        const fileType = await this.prisma.fileType.findUnique({
            where: { id }
        })
        if (!fileType) {
            throw new NotFoundException('File Type not found')
        }
        return fileType
    }

    // 删除文件类型
    async remove(id: string) {
        return this.prisma.fileType.delete({
            where: { id }
        })
    }
}
