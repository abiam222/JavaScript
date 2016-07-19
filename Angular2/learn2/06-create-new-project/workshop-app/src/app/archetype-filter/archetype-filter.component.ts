import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-archetype-filter',
  templateUrl: 'archetype-filter.component.html',
  styleUrls: ['archetype-filter.component.css']
})
export class ArchetypeFilterComponent implements OnInit {

  filterCriteria: { partialName: string } = { partialName: '' };

  constructor() {}

  ngOnInit() {
  }

}
