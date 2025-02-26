import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import {
    FlowThrough,
    GoalsAndProgress,
    IncidentReport,
    Individuals,
    LossOfService,
    OverdoseSafetyPlan,
    RentSupplementRequest,
    SafetyPlan,
    ShelterDiversionLog,
    UniqueIndividual
} from '@prisma/client'

export class UploadFileDto {
    @IsString()
    @IsNotEmpty()
    filename: string

    @IsString()
    @IsNotEmpty()
    filetype:
        | 'Intake Reporting'
        | 'Flow Through'
        | 'Loss of Service'
        | 'Rent Supplement Request'
        | 'Goals and Progress'
        | 'Safety Plan'
        | 'Overdose Safety Plan'
        | 'Incident Report'
        | 'Individuals'
        | 'uniqueIndividuals'
        | 'Shelter Diversion Follow-Up Log'

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Object) // 不能动态解析类型，直接设置为 Object
    records:
        | Individuals[]
        | FlowThrough[]
        | LossOfService[]
        | RentSupplementRequest[]
        | GoalsAndProgress[]
        | SafetyPlan[]
        | OverdoseSafetyPlan[]
        | IncidentReport[]
        | UniqueIndividual[]
        | ShelterDiversionLog[]
}
