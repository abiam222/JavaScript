import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import { ArchetypeCardComponent } from '../archetype-card/';

@Component({
  moduleId: module.id,
  selector: 'app-archetype-list',
  templateUrl: 'archetype-list.component.html',
  styleUrls: ['archetype-list.component.css'],
  directives: [ ArchetypeCardComponent ]
})
export class ArchetypeListComponent implements OnInit {

  @Input() swPeople;

  @Output() archetypeChosen = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onArchetypeChosen(chosenArchetype) {
    console.log('app-archetype-list - chosenArchetype = ', chosenArchetype);
    this.archetypeChosen.emit(chosenArchetype);
  }

}
