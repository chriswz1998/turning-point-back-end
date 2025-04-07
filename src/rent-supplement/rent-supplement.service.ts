import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { RentSupplementRequest } from '@prisma/client'

@Injectable()
export class RentSupplementRequestService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: RentSupplementRequest[], fileId: string) {
        try {
            const formattedRecords = records.map((record) => ({
                Individual: record['Individual'] ? String(record['Individual']) : '',
                program: record['Program or Site'] ? String(record['Program or Site']) : '',
                subsidyAmount: record['Subsidy Amount'] ? String(record['Subsidy Amount']) : '',
                dateOfRequest: record['Date of Request'] ? Number(record['Date of Request']) : 0, // 默认值
                rentSupplementProgram: record['Rent Supplement Program']
                    ? String(record['Rent Supplement Program'])
                    : '',
                homeAddress: record['Applicants Current Home Address']
                    ? String(record['Applicants Current Home Address'])
                    : '',
                fullMonthlyRentAmount: record['Full Monthly Rent Amount']
                    ? String(record['Full Monthly Rent Amount'])
                    : '',
                notes: record['Notes'] ? String(record['Notes']) : '',
                fileId
            }))

            await this.prisma.rentSupplementRequest.createMany({
                data: formattedRecords
            })

            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records', error: error.message }
        }
    }
}
