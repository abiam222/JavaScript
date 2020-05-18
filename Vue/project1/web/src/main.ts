import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path";
import { join } from 'path';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useStaticAssets(path.join(__dirname, '/public/index.html'));//try just public
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //app.setBaseViewsDir(join(__dirname, '..', 'views'));
  console.log('here')
  await app.listen(PORT);
};



bootstrap();
