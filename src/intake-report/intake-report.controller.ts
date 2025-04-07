import { Controller, Post, Body } from '@nestjs/common'
import { IntakeReportService } from './intake-report.service'
import { CreateIntakeReportDto } from './dto/create-intake-report.dto'

@Controller('intake-report')
export class IntakeReportController {
    constructor(private readonly intakeReportService: IntakeReportService) {}

    @Post()
    create(@Body() dto: CreateIntakeReportDto) {
        return this.intakeReportService.CreateIntakeReport(dto)
    }
}
