import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UploadFileDto } from './dto/upload-file.dto'
import { FileTypeService } from '@/file-type/file-type.service'
import { RentSupplementRequestService } from '@/rent-supplement/rent-supplement.service'
import { RentSupplementRequest } from '@prisma/client'

@Injectable()
export class FileService {
    constructor(
        private prisma: PrismaService,
        private fileTypeService: FileTypeService,
        private rentSupplementRequestService: RentSupplementRequestService
    ) {}

    async uploadFile(uploadFileDto: UploadFileDto) {
        const { filename, filetype, records } = uploadFileDto

        if (!filename || !filetype || !Array.isArray(records)) {
            throw new BadRequestException('Invalid request format')
        }

        // 创建 File 记录
        const fileRecord = await this.prisma.file.create({
            data: {
                filename,
                filetypeId: filetype
            }
        })

        const fileTypeName = await this.fileTypeService.findOne(filetype)

        if (fileTypeName.typename === 'Rent Supplement Request') {
            await this.rentSupplementRequestService.createMany(
                records as RentSupplementRequest[],
                fileRecord.id
            )
            console.log('set data to Rent Supplement Request')
        }

        if (fileTypeName.typename === 'Intake Reporting') {
            console.log('set data to Intake Reporting')
        }
        if (fileTypeName.typename === 'Flow Through') {
            console.log('set data to Flow Through')
        }
        if (fileTypeName.typename === 'Loss of Service') {
            console.log('set data to Loss of Service')
        }

        if (fileTypeName.typename === 'Goals and Progress') {
            console.log('set data to Goals and Progress')
        }
        if (fileTypeName.typename === 'Safety Plan') {
            console.log('set data to Safety Plan')
        }
        if (fileTypeName.typename === 'Overdose Safety Plan') {
            console.log('set data to Overdose Safety Plan')
        }
        if (fileTypeName.typename === 'Incident Report') {
            console.log('set data to Incident Report')
        }
        if (fileTypeName.typename === 'Individuals') {
            console.log('set data to individuals')
        }
        if (fileTypeName.typename === 'uniqueIndividuals') {
            console.log('set data to uniqueIndividuals')
        }
        if (fileTypeName.typename === 'Shelter Diversion Follow-Up Log') {
            console.log('set data to Shelter Diversion Follow-Up Log')
        }

        return {
            message: 'Upload successful',
            fileId: fileRecord.id
        }
    }
}
