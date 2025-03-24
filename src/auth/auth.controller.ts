import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { SignInDto } from './dto/signIn.dto'
import { RegisterDto } from './dto/register.dto'

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

    // Register
    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() body: RegisterDto) {
        return this.usersService.createUser(body.email, body.password, body.name, body.avatar)
    }
}
