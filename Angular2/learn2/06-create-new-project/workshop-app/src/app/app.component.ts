import { Component } from '@angular/core';

import { CharacterNameComponent }   from './character-name/';
import { ArchetypeFilterComponent } from './archetype-filter/';
import { ArchetypeListComponent }   from './archetype-list/';

import { SwDataService } from './sw-data.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    CharacterNameComponent,
    ArchetypeFilterComponent,
    ArchetypeListComponent
  ]
})
export class AppComponent {
  title = 'app works!';

  swPeople$;

  constructor(swd: SwDataService) {
    this.swPeople$ = swd.getData();
  }

  logNameChange(newName: string) {
    console.log('Name is now', newName);
  }

  logCriteriaChange(newCriteria:any) {
    console.log('Filter criteria is now', newCriteria);
  }

  logArchetypeChosen(chosenArchetype) {
    console.log('my-app - chosenArchetype = ', chosenArchetype);
  }
}
