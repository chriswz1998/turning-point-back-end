import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { FlowThroughService } from '@/flow-through/flow-through.service'

@Module({
    providers: [FlowThroughService, PrismaService],
    exports: [FlowThroughService]
})
export class FlowThroughModule {}
