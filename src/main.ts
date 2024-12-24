import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.FRONTEND_URL,
      methods: ['POST', 'GET', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    });
    
    await app.listen(process.env.PORT ?? 3000);

  } catch (error) {
    console.error('Bootstrap error:', error);
    process.exit(1);
  }
}
bootstrap();
