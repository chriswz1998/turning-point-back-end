import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { PrismaService } from '@/prisma/prisma.service'
import { RentSupplementRequestService } from '@/rent-supplement/rent-supplement.service'
import { FileTypeModule } from '@/file-type/file-type.module'

@Module({
    imports: [FileTypeModule],
    controllers: [FileController],
    providers: [FileService, PrismaService, RentSupplementRequestService],
    exports: [FileService]
})
export class FileModule {}
