import {
  Component,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

interface IFilterCriteria {
  partialName : string,
  race        : string,
  sex         : string
}

@Component({
  moduleId: module.id,
  selector: 'app-archetype-filter',
  templateUrl: 'archetype-filter.component.html',
  styleUrls: ['archetype-filter.component.css']
})
export class ArchetypeFilterComponent implements OnInit {

  @Output() filterCriteriaUpdated = new EventEmitter();

  filterCriteria: IFilterCriteria = {
    partialName : '',
    race        : '',
    sex         : ''
  };

  constructor() {}

  ngOnInit() {
  }

  setRace(race:string) {
    this.filterCriteria.race = race;
    this.emitUpdateEvent();
  }

  setSex(sex:string) {
    this.filterCriteria.sex = sex;
    this.emitUpdateEvent();
  }

  emitUpdateEvent() {
    this.filterCriteriaUpdated.emit(this.filterCriteria);
  }

}
