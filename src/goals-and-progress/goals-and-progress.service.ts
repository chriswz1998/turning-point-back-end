import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { GoalsAndProgress } from '@prisma/client'
import { parse, isValid, formatISO } from 'date-fns'

@Injectable()
export class GoalsAndProgressService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: GoalsAndProgress[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'M/d/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }

            const formattedRecords = records.map((record) => {
                const sd = record['Start Date'] as string
                const cd = record['Completion Date'] as string
                const dd = record['Discontinued Date'] as string
                return {
                    completionDate: cd ? parseDate(cd) : null,
                    discontinuedDate: dd ? parseDate(dd) : null,
                    goalDescription: record['Goal Description']
                        ? String(record['Goal Description'])
                        : null,
                    goalTitle: record['Goal Title'] ? String(record['Goal Title']) : null,
                    goalType: record['Goal Type'] ? String(record['Goal Type']) : null,
                    individual: record['Individual'] ? String(record['Individual']) : '',
                    personalOutcome: record['Personal Outcome']
                        ? String(record['Personal Outcome'])
                        : null,
                    programResidence: record['Program/Residence']
                        ? String(record['Program/Residence'])
                        : null,
                    startDate: sd ? parseDate(sd) : null,
                    fileId
                }
            })

            await this.prisma.goalsAndProgress.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
