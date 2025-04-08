import { Module } from '@nestjs/common'
import { SiteListService } from './site-list.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
    providers: [SiteListService, PrismaService],
    exports: [SiteListService]
})
export class SiteListModule {}
