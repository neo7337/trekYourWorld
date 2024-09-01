import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    
    console.log(__dirname)

    // serve static frontend
    app.useStaticAssets(path.join(__dirname, '../../..', 'public'))

    app.setGlobalPrefix('api/v1');
    app.use((req, res, next) => {
        if (!req.path.startsWith('/api/v1')) {
            res.sendFile(path.join(__dirname, '../../..', 'public', 'index.html'))
        } else {
            next()
        }
    })

    await app.listen(8181);
}
bootstrap();