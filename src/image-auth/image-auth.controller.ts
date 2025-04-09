import { Controller, Get } from '@nestjs/common'
import { ImageAuthService } from './image-auth.service'

@Controller('image-auth')
export class ImageAuthController {
    constructor(private readonly imageAuthService: ImageAuthService) {}

    @Get()
    getAuth() {
        return this.imageAuthService.getAuthParams()
    }
}
