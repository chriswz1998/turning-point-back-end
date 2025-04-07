import { Module } from '@nestjs/common';
import { IntakeReportService } from './intake-report.service';
import { IntakeReportController } from './intake-report.controller';

@Module({
  providers: [IntakeReportService],
  controllers: [IntakeReportController]
})
export class IntakeReportModule {}
