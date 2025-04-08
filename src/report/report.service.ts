import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) {}
    findAll() {
        return `This action returns all report`
    }

    async findById(id: string) {
        try {
            const file = await this.prisma.file.findUnique({
                where: { id: id },
                include: {
                    filetype: true
                }
            })

            if (file?.filetype.typename === 'Safety Plan') {
                return await this.prisma.safetyPlan.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Flow Through') {
                return await this.prisma.flowThrough.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Loss of Service') {
                return await this.prisma.lossOfService.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Rent Supplement Request') {
                return await this.prisma.rentSupplementRequest.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Goals and Progress') {
                return await this.prisma.goalsAndProgress.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Overdose Safety Plan') {
                return await this.prisma.overdoseSafetyPlan.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Incident Report') {
                return await this.prisma.incidentReport.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Individuals') {
                return await this.prisma.individuals.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Shelter Diversion Follow-Up Log') {
                return await this.prisma.shelterDiversionLog.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Site List') {
                return await this.prisma.siteList.findMany({
                    where: {
                        fileId: id
                    }
                })
            }

            if (file?.filetype.typename === 'Intake Reporting') {
                return await this.prisma.intakeReport.findMany({
                    where: {
                        fileId: id
                    },
                    include: {
                        immediateNeeds: true,
                        previousLivingSituations: true,
                        citizenImmigrationStatuses: true,
                        incomeTypes: true,
                        veteranStatuses: true
                    }
                })
            }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to find a report' }
        }
    }
}
