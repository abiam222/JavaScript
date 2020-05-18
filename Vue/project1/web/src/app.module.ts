import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  imports: [],
  controllers: [AppController, FoodsController],
  providers: [AppService, FoodsService],
})
export class AppModule {}
