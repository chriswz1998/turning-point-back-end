import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileModule } from '@/file/file.module'
import { RentSupplementRequestModule } from '@/rent-supplement/rent-supplement.module'
import { FileTypeModule } from '@/file-type/file-type.module'

@Module({
    imports: [FileModule, RentSupplementRequestModule, FileTypeModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
