import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret'
        })
    }

    async validate(payload: { sub: string; email: string }) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } })

        if (!user) {
            throw new UnauthorizedException('Invalid token')
        }
        return user // 将用户信息附加到请求对象
    }
}
