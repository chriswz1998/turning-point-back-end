import { Module } from '@nestjs/common'
import { FileTypeService } from './file-type.service'
import { FileTypeController } from './file-type.controller'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
    controllers: [FileTypeController],
    providers: [FileTypeService, PrismaService],
    exports: [FileTypeService]
})
export class FileTypeModule {}
