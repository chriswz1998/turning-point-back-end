import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { IncidentReportService } from '@/incident-report/incident-report.service'

@Module({
    providers: [IncidentReportService, PrismaService],
    exports: [IncidentReportService]
})
export class IncidentReportModule {}
