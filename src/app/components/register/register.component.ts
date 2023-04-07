import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    MessageService
  ],
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fname: [[], [Validators.required]],
      email: [[], [Validators.required]],
      password: [[], [Validators.required]],
      cpassword: [[], [Validators.required]],
      sentence: [[], [Validators.required]],
    });
  }

  onSubmit() {
    console.error(this.form.value);
    this.messageService.add({severity:'success', summary:'Register Successfully', detail:'Your Registration is Successfully'});
  }
  

}
