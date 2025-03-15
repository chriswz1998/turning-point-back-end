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
                const ifud = record['InitialFollowUpDate'] as string
                return {
                    community: record['Community'] ? String(record['Community']) : null,
                    currentGoals: record['CurrentGoals'] ? String(record['CurrentGoals']) : null,
                    currentGoalsDescription: record['CurrentGoalsDescription']
                        ? String(record['CurrentGoalsDescription'])
                        : null,
                    diversionCost: record['DiversionCost'] ? Number(record['DiversionCost']) : null,
                    diversionMethod: record['DiversionMethod']
                        ? String(record['DiversionMethod'])
                        : null,
                    divertedTo: record['DivertedTo'] ? String(record['DivertedTo']) : null,
                    evictionPrevention: record['EvictionPrevention']
                        ? String(record['EvictionPrevention'])
                        : null,
                    followUpLog: record['FollowUpLog'] ? String(record['FollowUpLog']) : null,
                    initialFollowUpDate: ifud ? parseDate(ifud) : null,
                    referralLog: record['ReferralLog'] ? String(record['ReferralLog']) : null,
                    successfulDiversion: record['SuccessfulDiversion']
                        ? String(record['SuccessfulDiversion'])
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
