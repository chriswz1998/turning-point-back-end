import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ShelterDiversionLog } from '@prisma/client'
import { formatISO, isValid, parse } from 'date-fns'

@Injectable()
export class ShelterDiversionLogService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: ShelterDiversionLog[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'd/M/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }
            const formattedRecords = records.map((record) => {
                const ifud = record['Initial follow-up Date'] as string
                return {
                    community: record['Community'] ? String(record['Community']) : null,
                    currentGoals: record['Current Goals'] ? String(record['Current Goals']) : null,
                    currentGoalsDescription: record['Current Goals Description']
                        ? String(record['Current Goals Description'])
                        : null,
                    diversionCost: record['Diversion Cost']
                        ? Number(record['Diversion Cost'])
                        : null,
                    diversionMethod: record['Diversion Method']
                        ? String(record['Diversion Method'])
                        : null,
                    divertedTo: record['Diverted To'] ? String(record['Diverted To']) : null,
                    evictionPrevention: record['Eviction Prevention']
                        ? String(record['Eviction Prevention'])
                        : null,
                    followUpLog: record['Follow-up log'] ? String(record['Follow-up log']) : null,
                    initialFollowUpDate: ifud ? parseDate(ifud) : null,
                    referralLog: record['Referral log'] ? String(record['Referral log']) : null,
                    successfulDiversion: record['Successful Diversion']
                        ? String(record['Successful Diversion'])
                        : null,
                    fileId
                }
            })

            await this.prisma.shelterDiversionLog.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
