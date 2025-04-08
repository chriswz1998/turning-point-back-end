import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateIntakeReportDto } from './dto/create-intake-report.dto'

@Injectable()
export class IntakeReportService {
    constructor(private prisma: PrismaService) {}

    async CreateIntakeReport(dto: CreateIntakeReportDto, fileId: string) {
        try {
            const {
                immediateNeeds,
                previousLivingSituations,
                citizenImmigrationStatuses,
                incomeTypes
            } = dto
            await this.prisma.intakeReport.create({
                data: {
                    fileId,
                    immediateNeeds: {
                        create: immediateNeeds ?? []
                    },
                    previousLivingSituations: {
                        create: previousLivingSituations ?? []
                    },
                    citizenImmigrationStatuses: {
                        create: citizenImmigrationStatuses ?? []
                    },
                    incomeTypes: {
                        create: incomeTypes ?? []
                    }
                },
                include: {
                    immediateNeeds: true,
                    previousLivingSituations: true,
                    citizenImmigrationStatuses: true,
                    incomeTypes: true
                }
            })

            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
