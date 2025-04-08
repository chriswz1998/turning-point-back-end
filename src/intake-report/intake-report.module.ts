import { Module } from '@nestjs/common'
import { IntakeReportService } from './intake-report.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
    providers: [IntakeReportService, PrismaService],
    exports: [IntakeReportService]
})
export class IntakeReportModule {}
