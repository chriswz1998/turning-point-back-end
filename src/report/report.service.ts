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
            const content = await this.prisma.safetyPlan.findMany({
                where: {
                    fileId: id
                }
            })
            console.log(content)
            return {
                content,
                file
            }
        }
        if (file?.filetype.typename === 'Loss of Service') {
            const content = await this.prisma.lossOfService.findMany({
                where: {
                    fileId: id
                }
            })
            return {
                content,
                file
            }
        }
        return { message: 'Not Found' }
    }
}
