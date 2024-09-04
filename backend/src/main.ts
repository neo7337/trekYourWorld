import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
    if (process.env.NODE_ENV === 'production') {
        const app = await NestFactory.create<NestExpressApplication>(AppModule);
        app.enableCors();
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
    } else if (process.env.NODE_ENV === 'local') {
        const app = await NestFactory.create(AppModule);
        app.enableCors();
        app.setGlobalPrefix('api/v1');
        await app.listen(8181);
    }
}
bootstrap();