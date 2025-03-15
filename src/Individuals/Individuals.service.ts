import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Individuals } from '@prisma/client'
import { formatISO, isValid, parse } from 'date-fns'

@Injectable()
export class IndividualsService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: Individuals[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'd/M/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }
            const formattedRecords = records.map((record) => {
                const ds = record['Date entered into the system'] as string
                const db = record['Date of Birth'] as string
                return {
                    ClientPhoto: record['Client Photo'] ? String(record['Client Photo']) : null,
                    person: record['Person'] ? String(record['Person']) : '',
                    dateOfBirth: db ? parseDate(db) : null,
                    site: record['Site'] ? String(record['Site']) : null,
                    programs: record['Programs'] ? String(record['Programs']) : null,
                    dateEnteredIntoSystem: ds ? parseDate(ds) : null,
                    fileId
                }
            })

            await this.prisma.individuals.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
