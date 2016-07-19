/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ArchetypeListComponent } from './archetype-list.component';

describe('Component: ArchetypeList', () => {
  it('should create an instance', () => {
    let component = new ArchetypeListComponent();
    expect(component).toBeTruthy();
  });
});
