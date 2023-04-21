import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, first, map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessageService } from 'primeng/api';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, Location]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user: any = null;

  constructor(private fb: FormBuilder,protected loginService: LoginService,private router: Router,
                private cd: ChangeDetectorRef,private location: Location,
                private authenticationService: AuthenticationService,private messageService: MessageService,
                private appComponent:AppComponent) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [[], [Validators.required]],
      password: [[], [Validators.required]],
    });

  }

  // login(){
  //   console.error(this.form.value);
  // }

  login(){
    const object = this.createSaveObject();
    return  this.loginService
        .login(object)
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => {
              this.user = res;
              if(this.user){
                localStorage.setItem('user_id', this.user.data.user_id);
                localStorage.setItem('user', JSON.stringify(this.user.data));
                this.router.navigate(['/home']);
              }
            },
            (res: HttpErrorResponse) => this.onRequestError(res.message)
        );
  }

  send() {
    let credentials = {email: this.form.controls['email'].value, password: this.form.controls['password'].value};
    this.authenticationService.login(credentials, '/user/login')
        .pipe(first())
        .subscribe(
            data => {
                const userRole = localStorage.getItem('userRole');
                console.log('sucessed navitaging to home page !');
                if (userRole === 'user') {
                  if(data.id){
                    if (data.id !== undefined) {
                      localStorage.setItem('user_id', data.id.toString());
                      localStorage.setItem('user_name', data.fullname.toString());
                    }
                    localStorage.setItem('user', JSON.stringify(data));
                    this.messageService.add({severity:'success', summary:'Login Successfully', detail:'Your Login is Successfully'});
                    this.appComponent.refreshNavbar();
                    this.router.navigate(['/home']);
                  }
                } else if (userRole === 'admin') {
                  if(data.id){
                    if (data.id !== undefined) {
                      localStorage.setItem('user_id', data.id.toString());
                      localStorage.setItem('user_name', data.fullname.toString());
                    }
                    localStorage.setItem('user', JSON.stringify(data));
                    this.messageService.add({severity:'success', summary:'Login Successfully', detail:'Your Login is Successfully'});
                    this.appComponent.refreshNavbar();
                    this.router.navigate(['/dashboard']);
                  }
                    
                }
                //this.router.navigate(['/mod']);   
            },
            error => {
                console.log('error');
            });
}

  protected onRequestError(res:any){
  
  }

  createSaveObject() {
    const obj: any = {};
    obj.email = this.form.get('email')?.value;
    obj.password = this.form.get('password')?.value;
    return obj;
  }

}
