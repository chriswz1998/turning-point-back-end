import { Controller, UseGuards, Get } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { FlowThroughService } from '@/flow-through/flow-through.service'

@Controller('flow-through')
export class FlowThroughController {
    constructor(private readonly flowThroughService: FlowThroughService) {}

    @UseGuards(JwtAuthGuard)
    @Get('report')
    test() {
        return { message: 'test' }
    }
}
