import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { RegisterService } from './register.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router,
    private registerService: RegisterService) { }

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
    const object = this.createSaveObject();
    if(object.password === this.form.get('cpassword')?.value){
      this.subscribeToSaveResponse(this.registerService.save(object));
    }
  }

  createSaveObject() {
    const obj: any = {};
    obj.fullname = this.form.get('fname')?.value;
    obj.email = this.form.get('email')?.value.toLowerCase();
    obj.password = this.form.get('password')?.value;
    obj.sentence = this.form.get('sentence')?.value;
    obj.role = 'user';
    return obj;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any[]>>) {
    result.pipe(
        map((res: HttpResponse<any>) => res.body)
    ).subscribe(
        (res: any) => {
            console.log('Registration Successful');
            this.messageService.add({severity:'success', summary:'Register Successfully', detail:'Your Registration is Successfully'});
            this.router.navigate(['/']);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }
  

}
