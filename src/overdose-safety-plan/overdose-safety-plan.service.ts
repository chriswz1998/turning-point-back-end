import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { OverdoseSafetyPlan } from '@prisma/client'
import { formatISO, isValid, parse } from 'date-fns'

@Injectable()
export class OverdoseSafetyPlanService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: OverdoseSafetyPlan[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'd/M/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }
            const formattedRecords = records.map((record) => {
                const sd = record["Today's Date"] as string
                return {
                    CrisisContacts: record['Crisis Contacts']
                        ? String(record['Crisis Contacts'])
                        : null,
                    Individual: record['Individual'] ? String(record['Individual']) : '',
                    ProgramOrSite: record['Program or Site']
                        ? String(record['Program or Site'])
                        : null,
                    RiskFactors: record['Risk Factors'] ? String(record['Risk Factors']) : null,
                    RiskReductionActions: record['Risk Reduction Actions']
                        ? String(record['Risk Reduction Actions'])
                        : null,
                    StaffMember: record['Staff Member'] ? String(record['Staff Member']) : '',
                    SupportPeople: record['Support People'] ? String(record['SafeSpaces']) : '',
                    TodaysDate: sd ? parseDate(sd) : null,
                    WellnessHabits: record['Wellness Habits']
                        ? String(record['Wellness Habits'])
                        : '',
                    fileId
                }
            })

            await this.prisma.overdoseSafetyPlan.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
