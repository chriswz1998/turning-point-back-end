export class ImmediateNeedDto {
    category: string
    count: number
    percentage: number
}

export class PreviousLivingSituationDto {
    situation: string
    count: number
    percentage: number
}

export class CitizenImmigrationStatusDto {
    status: string
    count: number
    percentage: number
}

export class IncomeTypeDto {
    type: string
    count: number
    percentage: number
}

export class CreateIntakeReportDto {
    fileId: string

    immediateNeeds?: ImmediateNeedDto[]
    previousLivingSituations?: PreviousLivingSituationDto[]
    citizenImmigrationStatuses?: CitizenImmigrationStatusDto[]
    incomeTypes?: IncomeTypeDto[]
}
