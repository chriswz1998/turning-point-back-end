import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
    @ApiProperty({ description: 'User email' })
    email: string

    @ApiProperty({ description: 'User password' })
    password: string

    @ApiProperty({ description: 'User name', required: false })
    name?: string

    @ApiProperty({ description: 'User avatar URL', required: false })
    avatar?: string
}
