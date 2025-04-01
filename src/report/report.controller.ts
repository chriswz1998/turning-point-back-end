import { Controller, Get, Param } from '@nestjs/common'
import { ReportService } from './report.service'

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}
    @Get()
    findAll() {
        return this.reportService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.reportService.findById(id)
    }
}
