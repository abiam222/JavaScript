/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CharacterNameComponent } from './character-name.component';

describe('Component: CharacterName', () => {
  it('should create an instance', () => {
    let component = new CharacterNameComponent();
    expect(component).toBeTruthy();
  });
});
