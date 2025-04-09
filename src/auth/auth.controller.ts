import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Get,
    UseGuards,
    Request
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { SignInDto } from './dto/signIn.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
interface User {
    id: string
    email: string
    password: string
    name: string
    avatar: string
    role: 'ADMIN' | 'USER' // 或者用 enum Role
    createdAt: Date
}

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

    @UseGuards(JwtAuthGuard)
    @Get('userinfo')
    userInfo(@Request() req: { user: User }) {
        return req.user
    }

    // Register
    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() body: RegisterDto) {
        return this.usersService.createUser(body.email, body.password, body.name, body.avatar)
    }
}
