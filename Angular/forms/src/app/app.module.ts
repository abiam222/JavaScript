import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SimpleFormComponent } from './app.simpleform';
import { ComplexFormComponent } from './app.complexform';
import { FormValidationComponent } from './app.formvalidations';
import { LoginComponent } from './app.login';

@NgModule({
  declarations: [
    AppComponent,
    //declare the three components as part of the root NgModule
    SimpleFormComponent,
    ComplexFormComponent,
    FormValidationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule //including this module as well
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
