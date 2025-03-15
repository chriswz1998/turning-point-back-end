import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { GoalsAndProgressService } from '@/goals-and-progress/goals-and-progress.service'

@Module({
    providers: [GoalsAndProgressService, PrismaService],
    exports: [GoalsAndProgressService]
})
export class GoalsAndProgressModule {}
