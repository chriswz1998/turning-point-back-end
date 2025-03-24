import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string) {
        const user = await this.usersService.findOne(email)
        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = { sub: user.id, email: user.email, role: user.role }
        const accessToken = await this.jwtService.signAsync(payload)
        return {
            access_token: accessToken,
            ...user
        }
    }
}
