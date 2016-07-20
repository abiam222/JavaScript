/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { InchesToFeetPipe } from './inches-to-feet.pipe';

describe('Pipe: InchesToFeet', () => {
  it('create an instance', () => {
    let pipe = new InchesToFeetPipe();
    expect(pipe).toBeTruthy();
  });
});
