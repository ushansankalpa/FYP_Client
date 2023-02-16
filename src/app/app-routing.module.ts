import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LSIdentiferTestComponent } from './components/lsidentifer-test/lsidentifer-test.component';

const routes: Routes = [
  {
    path:'lsidentifertest',
    component: LSIdentiferTestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
