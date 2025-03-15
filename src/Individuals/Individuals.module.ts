import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { IndividualsService } from '@/Individuals/Individuals.service'

@Module({
    providers: [IndividualsService, PrismaService],
    exports: [IndividualsService]
})
export class IndividualsModule {}
