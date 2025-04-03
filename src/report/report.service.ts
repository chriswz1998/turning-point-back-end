import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) {}
    findAll() {
        return `This action returns all report`
    }

    async findById(id: string) {
        const file = await this.prisma.file.findUnique({
            where: { id: id },
            include: {
                filetype: true
            }
        })

        if (file?.filetype.typename === 'Safety Plan') {
            return this.prisma.safetyPlan.findMany({
                where: {
                    fileId: id
                }
            })
        }

        if (file?.filetype.typename === 'Flow Through') {
            return this.prisma.flowThrough.findMany({
                where: {
                    fileId: id
                }
            })
        }

        if (file?.filetype.typename === 'Loss of Service') {
            return this.prisma.lossOfService.findMany({
                where: {
                    fileId: id
                }
            })
        }
        return { message: 'Not Found' }
    }
}
