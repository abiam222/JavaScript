import { Component } from '@angular/core';

import { CharacterNameComponent }   from './character-name/';
import { ArchetypeFilterComponent } from './archetype-filter/';
import { ArchetypeListComponent }   from './archetype-list/';

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
}
