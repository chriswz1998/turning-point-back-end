import { Module } from '@nestjs/common'
import { RentSupplementRequestService } from './rent-supplement.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
    providers: [RentSupplementRequestService, PrismaService],
    exports: [RentSupplementRequestService]
})
export class RentSupplementRequestModule {}
