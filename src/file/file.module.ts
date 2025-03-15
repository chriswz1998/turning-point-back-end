import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { PrismaService } from '@/prisma/prisma.service'
import { RentSupplementRequestService } from '@/rent-supplement/rent-supplement.service'
import { FileTypeModule } from '@/file-type/file-type.module'
import { FlowThroughService } from '@/flow-through/flow-through.service'
import { LossOfServiceService } from '@/loss-of-service/loss-of-service.service'
import { GoalsAndProgressService } from '@/goals-and-progress/goals-and-progress.service'
import { SafetyPlanService } from '@/safety-plan/safety-plan.service'
import { OverdoseSafetyPlanService } from '@/overdose-safety-plan/overdose-safety-plan.service'
import { IncidentReportService } from '@/incident-report/incident-report.service'
import { IndividualsService } from '@/Individuals/Individuals.service'
import { ShelterDiversionLogService } from '@/shelter-diversion-log/shelter-diversion-log.service'

@Module({
    imports: [FileTypeModule],
    controllers: [FileController],
    providers: [
        FileService,
        PrismaService,
        RentSupplementRequestService,
        SafetyPlanService,
        FlowThroughService,
        LossOfServiceService,
        OverdoseSafetyPlanService,
        IncidentReportService,
        IndividualsService,
        ShelterDiversionLogService,
        GoalsAndProgressService
    ],
    exports: [FileService]
})
export class FileModule {}
