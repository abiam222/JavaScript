import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable()
export class HeroService  {
    // getHeroes(): Hero[] {
    //     return HEROES;
    // } 
    getHeroes(): Promise<Hero[]> {
        //console.log("HERE")
        return Promise.resolve(HEROES);
    }
    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
        .then(heroes => heroes.find(hero => hero.id === id));
}

}

//HeroService doesn't have any dependencies at the moment.  It is a "best practice"
//to apply the @Injectable() decorator from the start both for consistency and for future-proofing

// @Injectable()
// export class HeroService {
//     getHeroes() : Promise<Hero[]> {
//         return HEROES;
//     }
/*
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            //Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000)
        })
    }
*/
//}