import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ShelterDiversionLogService } from '@/shelter-diversion-log/shelter-diversion-log.service'

@Module({
    providers: [ShelterDiversionLogService, PrismaService],
    exports: [ShelterDiversionLogService]
})
export class ShelterDiversionLogModule {}
