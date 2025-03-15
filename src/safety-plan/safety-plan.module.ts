import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { SafetyPlanService } from '@/safety-plan/safety-plan.service'

@Module({
    providers: [SafetyPlanService, PrismaService],
    exports: [SafetyPlanService]
})
export class SafetyPlanModule {}
