import { IsString, IsNotEmpty } from 'class-validator'

export class CreateFileTypeDto {
    @IsString()
    @IsNotEmpty()
    typename: string
}
