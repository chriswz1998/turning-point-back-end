import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateIntakeReportDto } from './dto/create-intake-report.dto'

@Injectable()
export class IntakeReportService {
    constructor(private prisma: PrismaService) {}

    CreateIntakeReport(dto: CreateIntakeReportDto) {
        const {
            fileId,
            immediateNeeds,
            previousLivingSituations,
            citizenImmigrationStatuses,
            incomeTypes
        } = dto

        return this.prisma.intakeReport.create({
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
    }
}
