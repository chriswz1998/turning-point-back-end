import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Headers,
    Get,
    UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { SignInDto } from './dto/signIn.dto'
import { RegisterDto } from './dto/register.dto'
import * as jwt from 'jsonwebtoken'
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

    @Get('userinfo')
    async userInfo(@Headers('authorization') authHeader: string) {
        if (!authHeader) {
            throw new UnauthorizedException('No Authorization header provided')
        }
        const token = authHeader.replace('Bearer ', '')
        return await this.usersService.getUserInfo(token)
    }

    // Register
    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() body: RegisterDto) {
        return this.usersService.createUser(body.email, body.password, body.name, body.avatar)
    }
}
