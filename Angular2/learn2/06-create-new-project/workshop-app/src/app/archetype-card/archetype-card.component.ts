import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import { InchesToFeetPipe } from '../inches-to-feet.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-archetype-card',
  templateUrl: 'archetype-card.component.html',
  styleUrls: ['archetype-card.component.css'],
  pipes: [ InchesToFeetPipe ]
})
export class ArchetypeCardComponent implements OnInit {

  @Input() archetype: any;

  @Output() archetypeChosen = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  chooseArchetype(chosenArchetype) {
    console.log('app-archetype-card - chosenArchetype = ', chosenArchetype);
    this.archetypeChosen.emit(chosenArchetype);
  }
}
