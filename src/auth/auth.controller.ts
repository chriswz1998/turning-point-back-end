import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    // 登录
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: { email: string; password: string }) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    // 注册
    @Post('register')
    async register(
        @Body() body: { email: string; password: string; name?: string; avatar?: string }
    ) {
        return this.usersService.createUser(body.email, body.password, body.name, body.avatar)
    }
}
