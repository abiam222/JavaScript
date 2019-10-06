import { Component, OnInit } from '@angular/core';
import { Run, Animal } from './models/stuff.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'extreme';

  ngOnInit() {
    let run = {};
    let running: Run = new Run();
    //running.lake = "me";

    let an: Animal;
    let row: Array<Animal> = [];
    row.push(an);
    //row.push(running);

    console.log(row)
    console.log(running)
  }

}
