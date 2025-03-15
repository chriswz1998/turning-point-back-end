import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '@/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './jwt-auth.guard'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'default_secret',
                signOptions: { expiresIn: '10h' }
            })
        })
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
