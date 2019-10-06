// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { HeroDetailComponent } from './hero-detail.component';
// import { AppComponent } from './app.component';
// import { HeroesComponent } from './heroes.component';
// import { HeroService } from './hero.service';//we need it in every other view
// import { RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard.component'

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeroDetailComponent,
//     HeroesComponent,
//     DashboardComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     HttpModule//,
//     // RouterModule.forRoot([
//     //   {
//     //     path: '',
//     //     redirectTo: '/dashboard',
//     //     pathMatch: 'full'//,
//     //    //This is for initialization, if you want it 
//     //   },
//     //    {
//     //     path: 'dashboard',
//     //    component: DashboardComponent
//     //   },
//     //   {
//     //     path: 'heroes',
//     //     component: HeroesComponent
//     //   },
//     //   {
//     //     path: 'detail/:id',
//     //     component: HeroDetailComponent
//     //   }
//     // ])
//   ],
//   providers: [ HeroService ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }



import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http'; //calling our http services 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
@NgModule({
  imports: [  //angular modules
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [  //my components
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
  ],
  providers: [ HeroService ], //my services
  bootstrap: [ AppComponent ]
})
export class AppModule { }
