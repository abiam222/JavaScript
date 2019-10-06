import { Component } from '@angular/core';
//we will need to import a couple of specific APIs for dealing with reactive forms
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'complex-form',
    templateUrl: './app.complexform.html' 
})

//Build a reactive or model driven form
export class ComplexFormComponent {

    //The FormGroup object exposes various APIS, dealing with forms.
    complexForm : FormGroup;

    //we are passing an instance of the FormBuilder to our constructor
    constructor( fb: FormBuilder ) {
        //Here we are using the FomBuilder to build out our form.
        this.complexForm = fb.group({
            //we can set default values by passing in the corresponding value
            'firstName' : '',
            'lastName': '',
            'gender' : 'Female',
            'hiking': false,
            'running' : false,
            'swimming': false
        })
    }

    submitForm( value : any ) : void {
        console.log( value );
    }
}



/*
Reactive forms in angular 2 allow for much greater control
over form inputs, errors, and validations.  With reactive forms, we can define our 
form model programmatically and ensure that inputs adhere tot eh constraints we place on the form.
Reactive forms let us dynamically create a form inside our Angular class (kindly like Angular
Formly in Angular 1). 

*/