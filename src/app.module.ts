import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileModule } from '@/file/file.module'
import { RentSupplementRequestModule } from '@/rent-supplement/rent-supplement.module'
import { FileTypeModule } from '@/file-type/file-type.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        FileModule,
        RentSupplementRequestModule,
        FileTypeModule,
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
