import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { IncidentReport } from '@prisma/client'
import { formatISO, isValid, parse } from 'date-fns'

@Injectable()
export class IncidentReportService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: IncidentReport[], fileId: string) {
        try {
            const parseDate = (date: string): string | null => {
                if (!date) return null
                const parsed = parse(date, 'd/M/yyyy', new Date())
                return isValid(parsed) ? formatISO(parsed) : null
            }
            const formattedRecords = records.map((record) => {
                const sd = record['Date and Time of Incident'] as string
                return {
                    clientInvolved: record['Client(s) involved']
                        ? String(record['Client(s) involved'])
                        : '',
                    programOrSite: record['Program or Site']
                        ? String(record['Program or Site'])
                        : null,
                    dateAndTimeOfIncident: sd ? parseDate(sd) : null,
                    degreeOfInjury: record['Degree of injury']
                        ? String(record['Degree of injury'])
                        : null,
                    typeOfInjury: record['Type of injury']
                        ? String(record['Type of injury'])
                        : null,
                    typeOfSeriousIncident: record['Type of serious incident']
                        ? String(record['Type of serious incident'])
                        : '',
                    fileId
                }
            })

            await this.prisma.incidentReport.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
