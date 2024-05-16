import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const fs = require('fs');

  const httpOptions = {
    key: fs.readFileSync(require('path').resolve(__dirname, '../secrets/privkey.pem')),
    cert: fs.readFileSync(require('path').resolve(__dirname, '../secrets/fullchain.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpOptions,
  });

  const options = {
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.enableCors(options);  
  await app.listen(3000);
}
bootstrap();
