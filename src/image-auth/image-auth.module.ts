import { Module } from '@nestjs/common';
import { ImageAuthController } from './image-auth.controller';
import { ImageAuthService } from './image-auth.service';

@Module({
  controllers: [ImageAuthController],
  providers: [ImageAuthService]
})
export class ImageAuthModule {}
