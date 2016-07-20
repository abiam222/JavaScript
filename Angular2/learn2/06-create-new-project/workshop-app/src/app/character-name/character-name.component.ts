import {
  Component,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-character-name',
  templateUrl: 'character-name.component.html',
  styleUrls: ['character-name.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class CharacterNameComponent implements OnInit {

  @Output() characterNameChanged = new EventEmitter();

  characterNameFormGroup: FormGroup;

  characterName: string = '';

  constructor() {}

  ngOnInit() {
    this.characterNameFormGroup = new FormBuilder().group({
      characterNameControl: ['', Validators.required ]
    });

  }

  onNameChange() {
    this.characterNameChanged.emit(this.characterName);
  }

}
