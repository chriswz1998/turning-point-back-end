import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileModule } from '@/file/file.module'
import { RentSupplementRequestModule } from '@/rent-supplement/rent-supplement.module'
import { FileTypeModule } from '@/file-type/file-type.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { FlowThroughModule } from '@/flow-through/flow-through.module'
import { LossOfServiceModule } from '@/loss-of-service/loss-of-service.module'
import { GoalsAndProgressModule } from '@/goals-and-progress/goals-and-progress.module'
import { SafetyPlanModule } from '@/safety-plan/safety-plan.module'
import { OverdoseSafetyPlanModule } from '@/overdose-safety-plan/overdose-safety-plan.module'
import { IncidentReportModule } from '@/incident-report/incident-report.module'
import { IndividualsModule } from '@/Individuals/Individuals.module'
import { ShelterDiversionLogModule } from '@/shelter-diversion-log/shelter-diversion-log.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        FileModule,
        RentSupplementRequestModule,
        FlowThroughModule,
        LossOfServiceModule,
        FileTypeModule,
        GoalsAndProgressModule,
        SafetyPlanModule,
        OverdoseSafetyPlanModule,
        IncidentReportModule,
        IndividualsModule,
        ShelterDiversionLogModule,
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
