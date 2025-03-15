import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { SafetyPlan } from '@prisma/client'

@Injectable()
export class SafetyPlanService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: SafetyPlan[], fileId: string) {
        try {
            const formattedRecords = records.map((record) => {
                return {
                    individual: record['Individual'] ? String(record['Individual']) : '',
                    programOrSite: record['ProgramOrSite'] ? String(record['ProgramOrSite']) : null,
                    selfSoothingStrategies: record['SelfSoothingStrategies']
                        ? String(record['SelfSoothingStrategies'])
                        : null,
                    reasonsForLiving: record['ReasonsForLiving']
                        ? String(record['ReasonsForLiving'])
                        : null,
                    supportConnections: record['SupportConnections']
                        ? String(record['SupportConnections'])
                        : null,
                    safeSpaces: record['SafeSpaces'] ? String(record['SafeSpaces']) : '',
                    fileId
                }
            })

            await this.prisma.safetyPlan.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
