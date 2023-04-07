import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LSIdentiferTestComponent } from './components/lsidentifer-test/lsidentifer-test.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'lsidentifertest',
    component: LSIdentiferTestComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'user'
    }
  },
  {
    path:'navbar',
    component: NavBarComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
