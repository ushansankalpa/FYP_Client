import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LSIdentiferTestComponent } from './components/lsidentifer-test/lsidentifer-test.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path:'lsidentifertest',
    component: LSIdentiferTestComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'navbar',
    component: NavBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
