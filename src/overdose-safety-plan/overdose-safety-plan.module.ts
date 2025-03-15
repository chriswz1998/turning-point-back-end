import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { OverdoseSafetyPlanService } from '@/overdose-safety-plan/overdose-safety-plan.service'

@Module({
    providers: [OverdoseSafetyPlanService, PrismaService],
    exports: [OverdoseSafetyPlanService]
})
export class OverdoseSafetyPlanModule {}
