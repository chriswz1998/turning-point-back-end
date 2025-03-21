import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // 配置Swagger
    const config = new DocumentBuilder()
        .setTitle('NestJS API') // API标题
        .setDescription('The NestJS API description') // API描述
        .setVersion('1.0') // API版本
        .addTag('cats') // 你可以添加自定义标签来组织API
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document) // 设置访问Swagger UI的路径
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap().catch((err) => {
    console.error('Bootstrap error:', err)
})
