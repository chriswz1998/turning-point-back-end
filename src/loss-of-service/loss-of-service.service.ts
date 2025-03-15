import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { LossOfService } from '@prisma/client'
import { parse, isValid, formatISO } from 'date-fns'

@Injectable()
export class LossOfServiceService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: LossOfService[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'd/M/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }

            const formattedRecords = records.map((record) => {
                const ed = record['End Date/Time of LOS'] as string
                const sd = record['Start Date/Time of LOS'] as string
                return {
                    EndDateTimeOfLOS: ed ? parseDate(ed) : null,
                    StartDateTimeOfLOS: sd ? parseDate(sd) : null,
                    Individual: record['Individual'] ? String(record['Individual']) : '',
                    ManagerApproved: record['Manager Approved']
                        ? String(record['Manager Approved'])
                        : null,
                    ProgramOrSite: record['Program or Site']
                        ? String(record['Program or Site'])
                        : null,
                    RationaleForLOSMore48Hours: record['Rationale for LOS > 48 hours']
                        ? String(record['Rationale for LOS > 48 hours'])
                        : null,
                    ReasonAndRationaleForRestriction: record['Reason and Rationale for Restriction']
                        ? String(record['Reason and Rationale for Restriction'])
                        : null,
                    ReviewForTPCSLOS: record['Review for TPCS LOS']
                        ? String(record['Review for TPCS LOS'])
                        : null,
                    StaffReporting: record['Staff Reporting']
                        ? String(record['Staff Reporting'])
                        : null,
                    WasThisRelatedToACriticalIncident: record[
                        'Was this related to a critical incident'
                    ]
                        ? String(record['Was this related to a critical incident'])
                        : null,
                    fileId
                }
            })

            await this.prisma.lossOfService.createMany({
                data: formattedRecords
            })

            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
