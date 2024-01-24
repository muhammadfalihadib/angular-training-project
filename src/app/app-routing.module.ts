import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  {
    path: '',
    component:NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'employee',component:EmployeeComponent
      },
      {
        path:'employee/add',component:EmployeeFormComponent
      },
      {
        path:'employee/:id',component:EmployeeDetailComponent
      },
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'employee'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
