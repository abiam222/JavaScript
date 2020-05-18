import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodsService {
  getFoods() {
    return [
      { id: 3, text: 'bugs' },
      { id: 4, text: 'rats' },
      { id: 5, text: 'burgers'}
    ]
  }
}
