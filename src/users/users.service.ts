import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // 查找用户（根据 email）
    async findOne(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    async createUser(email: string, password: string, name?: string, avatar?: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                avatar
            }
        })
    }
}
