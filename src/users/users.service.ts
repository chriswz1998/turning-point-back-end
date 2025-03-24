import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

interface JwtPayload {
    sub: string
    email: string
    role: string
    iat: number
    exp: number
}

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

    async getUserInfo(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
            return await this.prisma.user.findUnique({
                where: {
                    email: decoded.email
                }
            })
        } catch (err) {
            console.log(err)
            throw new UnauthorizedException('Invalid token')
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
