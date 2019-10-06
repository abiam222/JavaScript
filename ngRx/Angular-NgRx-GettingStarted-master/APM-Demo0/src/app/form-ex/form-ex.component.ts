import { Component, OnInit } from "@angular/core";
import {
  NgForm,
  FormControl,
  FormGroup,
  FormsModule,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./form-ex.component.html"
  //styleUrls: ["./form-ex.component.css"]
})
export class FormExComponent implements OnInit {
  //register single form contorl
  //  name = new FormControl('');

  //this is for a group.
  //   profileForm = new FormGroup({
  //     firstName: new FormControl(""),
  //     lastName: new FormControl(""),
  //     address: new FormGroup({
  //       street: new FormControl(""),
  //       city: new FormControl(""),
  //       state: new FormControl(""),
  //       zip: new FormControl("")
  //     })
  //   });

  //this is a FormBuilder group
  //more convinient way to build forms
  profileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: [""],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zip: [""]
    })
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  //   updateName() {
  //       this.name.setValue('Nancy')
  //   }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  //strict checks of the setValue() method help catch nesting
  //errors in complex forms, while patchValue() fails silently on
  //those errors
  updateProfile() {
    this.profileForm.patchValue({
      firstName: "Nancy",
      address: {
        street: "123 Drew Street"
      }
    });
  }
}
