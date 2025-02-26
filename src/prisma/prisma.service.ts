import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit(): Promise<void> {
        await this.$connect() // ✅ TypeScript 现在可以正确识别它
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect()
    }
}
