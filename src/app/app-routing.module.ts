import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { LeaveFormComponent } from './staff-dashboard/leave-form/leave-form.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { StaffAuthGuard } from './shared/guard/staff-auth.guard';
import { StaffListComponent } from './hod-dashboard/staff-list/staff-list.component';
import { StaffDetailsComponent } from './hod-dashboard/staff-list/staff-details/staff-details.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
const routes: Routes = [
  // {path : '' , redirectTo : 'login' , pathMatch : 'full'},
  {path : 'login' , component : LoginFormComponent},
  {path : 'registration' , component : RegistrationFormComponent},
  {path : 'staffdb' , component  : StaffDashboardComponent , canActivate : [StaffAuthGuard] },
  // {path : 'staffdb' , component  : StaffDashboardComponent },
  {path : 'leave' , component  : LeaveFormComponent , canActivate : [StaffAuthGuard] },
  // {path : 'leave' , component  : LeaveFormComponent },
  {path : 'hoddb' , component : HodDashboardComponent , canActivate : [AuthGuard] },
  // {path : 'hoddb' , component : HodDashboardComponent },
  {path : 'staff' , component : StaffListComponent , canActivate : [AuthGuard] },
  // {path : 'staff' , component : StaffListComponent },
  {path : 'staff/details' , component : StaffDetailsComponent , canActivate : [AuthGuard] },
  // {path : 'staff/details' , component : StaffDetailsComponent },
  { path :'**' , component : NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
