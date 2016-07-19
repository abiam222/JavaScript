/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ArchetypeCardComponent } from './archetype-card.component';

describe('Component: ArchetypeCard', () => {
  it('should create an instance', () => {
    let component = new ArchetypeCardComponent();
    expect(component).toBeTruthy();
  });
});
