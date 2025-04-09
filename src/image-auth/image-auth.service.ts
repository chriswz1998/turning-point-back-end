import { Injectable } from '@nestjs/common'
import ImageKit from 'imagekit'

@Injectable()
export class ImageAuthService {
    private imagekit: ImageKit

    constructor() {
        this.imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ''
        })
    }

    getAuthParams() {
        return this.imagekit.getAuthenticationParameters()
    }
}
