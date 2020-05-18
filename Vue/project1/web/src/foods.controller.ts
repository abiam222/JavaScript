import { Controller, Get } from '@nestjs/common';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly appService: FoodsService) {}

  @Get()
  getFoods() { //: types
    return this.appService.getFoods();
  }
}
