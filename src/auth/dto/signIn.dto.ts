import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
    @ApiProperty({ description: 'User email' })
    email: string

    @ApiProperty({ description: 'User password' })
    password: string
}
