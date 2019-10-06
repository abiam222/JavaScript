// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';
import { Hero } from './hero'
import 'rxjs/add/operator/switchMap';



@Component({
    moduleId: module.id, //id
    selector: 'my-hero-detail',
    //inputs: ['hero'], (I can have outputs as well)
    template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div>
            <label>id: </label>{{hero.id}}
        </div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name">
        </div>
        <button (click)="goBack()">Back</button>
    </div>
    `,
    styleUrls : ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit { //this goes to the template (aka front-end)
    @Input()//declaring hero as an input (@ = decorator)
    hero: Hero;

    //These services are injected into the constructor, saving their values in private fields 
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
   // heroService = new HeroService(); // don't do this to make constructors

    ngOnInit(): void { //Why don't I just the other way instead of having to use switchMap
        this.route.params
        .switchMap((params: Params) => this.heroService.getHero(2))//maps the id in the observable route params
        .subscribe(hero => this.hero = hero);
        //see why just putting an id number doesn't works

      //  this.heroService.getHero(1)
    //   .then(heroes => this.hero = heroes);

     // this.route.params
     // .switchMap((params : Params) => this.heroService.getHero(+params['id'])) 

    }

    goBack(): void {
        this.location.back();
    }


}

//<counter (result)="namonChange()">


