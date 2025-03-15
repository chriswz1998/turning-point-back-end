import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { FlowThrough } from '@prisma/client'
import { formatISO, isValid, parse } from 'date-fns'

@Injectable()
export class FlowThroughService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: FlowThrough[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'd/M/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }
            const formattedRecords = records.map((record) => {
                const ed = record['Exit Date'] as string
                const sd = record['Start Date'] as string
                return {
                    individual: record['Individual'] ? String(record['Individual']) : '',
                    startDate: sd ? parseDate(sd) : null,
                    exitDate: ed ? parseDate(ed) : null,
                    programOrSite: record['Program or Site']
                        ? String(record['Program or Site'])
                        : null,
                    exitReason: record['Exit Reason'] ? String(record['Exit Reason']) : null,
                    fileId
                }
            })

            await this.prisma.flowThrough.createMany({
                data: formattedRecords
            })

            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
