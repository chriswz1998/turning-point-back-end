import { Body, Headers, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { SignInDto } from './dto/signIn.dto'
import { RegisterDto } from './dto/register.dto'
import { User } from '@prisma/client'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    // Login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: SignInDto })
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @HttpCode(HttpStatus.OK)
    @Get('user')
    @ApiOperation({ summary: 'User info' })
    @ApiBody({ type: SignInDto })
    async userInfo(@Headers('Authorization') authHeader: string) {
        // 提取 Bearer Token
        const token = authHeader?.split(' ')[1] // 格式应为 "Bearer <token>"
        if (!token) {
            throw new Error('No token provided')
        }
        // 使用 authService 通过 token 获取用户信息
        return (await this.usersService.getUserInfoFromToken(token)) as User
    }
    // Register
    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() body: RegisterDto) {
        return this.usersService.createUser(body.email, body.password, body.name, body.avatar)
    }
}
