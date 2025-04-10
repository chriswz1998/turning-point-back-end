import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Request,
    UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '@/users/users.service'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { SignInDto } from './dto/signIn.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { Role } from '@prisma/client'
interface User {
    id: string
    avatar: string
    email: string
    password: string
    name: string
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
    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() body: RegisterDto, @Request() req: { user: User }) {
        const currentUser = req.user

        // ✅ 检查角色权限
        if (currentUser.role !== Role.ADMIN) {
            throw new UnauthorizedException('Only admin users can create new accounts')
        }

        return this.usersService.createUser(body.email, body.password, body.name, body.avatar)
    }
}
