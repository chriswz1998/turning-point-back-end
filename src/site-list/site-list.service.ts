import { Injectable } from '@nestjs/common'
import { SiteList } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class SiteListService {
    constructor(private prisma: PrismaService) {}

    async createMany(records: SiteList[], fileId: string) {
        try {
            const formattedRecords = records.map((record) => {
                return {
                    Address: record['Address'] ? String(record['Address']) : '',
                    City: record['City'] ? String(record['City']) : '',
                    HousingType: record['Housing Type'] ? String(record['Housing Type']) : '',
                    ManagerOrSite: record['Manager or Site']
                        ? String(record['Manager or Site'])
                        : '',
                    ManagersPhoneNumber: record["Manager's Phone Number"]
                        ? String(record["Manager's Phone Number"])
                        : '',
                    Site: record['Site'] ? String(record['Site']) : '',
                    SitePhoneNumber: record['Site Phone Number']
                        ? String(record['Site Phone Number'])
                        : '',
                    fileId
                }
            })

            await this.prisma.siteList.createMany({
                data: formattedRecords
            })
            return { success: true, message: 'Records created successfully' }
        } catch (error) {
            console.error('Error creating records:', error)
            return { success: false, message: 'Failed to create records' }
        }
    }
}
