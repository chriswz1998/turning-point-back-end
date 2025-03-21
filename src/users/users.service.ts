import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    private readonly jwtSecret = process.env.JWT_SECRET as string
    // 查找用户（根据 email）
    async findOne(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    // 通过 JWT Token 获取用户信息
    async getUserInfoFromToken(token: string): Promise<User | null> {
        try {
            // 验证并解码 JWT Token
            const decoded = jwt.verify(token, this.jwtSecret) as {
                email: string
            } // 解析 token 并获取有效载荷（payload）

            // 根据解码后的信息获取用户
            const user = await this.findOne(decoded.email)

            if (!user) {
                return null
            }

            return user // 返回用户信息
        } catch (e) {
            console.log(e)
            return null
        }
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
