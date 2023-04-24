import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LSIdentiferTestComponent } from './components/lsidentifer-test/lsidentifer-test.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InsertResourcesComponent } from './components/insert-resources/insert-resources.component';

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
    path:'recommendations',
    component: RecommendationComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'user'
    }
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'user'
    }
  },
  {
    path:'dashboard',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path:'insert/resources',
    component: InsertResourcesComponent,
    // canActivate: [AuthGuard],
    data: {
      role: 'admin'
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
routes.push({path: '**', redirectTo: ''});
export const appRoutingModule = RouterModule.forRoot(routes);


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
