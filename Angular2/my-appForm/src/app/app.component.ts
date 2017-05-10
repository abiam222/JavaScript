import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { Theme } from './theme.interface';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']//,
  //directives: []
})
export class AppComponent implements OnInit{

   user: User;
  public candy: any;
  public list: Array<number> = [1, 2, 3];

  public genders = [
    { value: 'F', display: 'Female' },
    { value: 'M', display: 'Male' }
    ];

  public roles = [
    { value: 'admin', display: 'Administrator' },
    { value: 'guest', display: 'Guest' },
    { value: 'custom', display: 'Custom' }
  ];

  public themes: Theme[] = [
    { backgroundColor: 'black', fontColor: 'white', display: 'Dark' },
    { backgroundColor: 'white', fontColor: 'black', display: 'Light' },
    { backgroundColor: 'grey', fontColor: 'white', display: 'Sleek' }
  ];

  public topics = [
    { value: 'game', display: 'Gaming' },
    { value: 'tech', display: 'Technology' },
    { value: 'life', display: 'Lifestyle' },
  ];

  public toggles = [
    { value: 'toggled', display: 'Toggled' },
    { value: 'untoggled', display: 'UnToggled' },
  ];

  ngOnInit() {
    //initialize user model here
    this.user = {
      name: '',
      gender: this.genders[0].value,
      role: null,
      theme: this.themes[0],
      isActive: false,
      toggle: this.toggles[1].value,
      topics: [this.topics[1].value]
    }
  }

  public save(isValid: boolean, f: User) {
        console.log( isValid )
        console.log( f ); //59 and 60 should be the same
        console.log( this.user )
        console.log( this.list[0] );
    }
}
