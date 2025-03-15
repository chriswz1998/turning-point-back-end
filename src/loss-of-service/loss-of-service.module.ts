import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { LossOfServiceService } from '@/loss-of-service/loss-of-service.service'

@Module({
    providers: [LossOfServiceService, PrismaService],
    exports: [LossOfServiceService]
})
export class LossOfServiceModule {}
