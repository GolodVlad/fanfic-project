import { RouterModule, Routes } from '@angular/router'; 
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FanficsComponent } from './components/fanfics/fanfics.component';
import { EditFanficComponent } from './components/fanfics/edit-fanfic/edit-fanfic.component';
import { DeleteFanficComponent } from './components/fanfics/delete-fanfic/delete-fanfic.component';
import { ViewFanficComponent } from './components/fanfics/view-fanfic/view-fanfic.component'; 
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: FanficsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'fanfics',
    component: FanficsComponent 
  },
  {
    path: 'edit-fanfic/:id',
    component: EditFanficComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-fanfic/:id',
    component: DeleteFanficComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-fanfic/:id',
    component: ViewFanficComponent,
  },
  { 
    path: '**', 
    component: FanficsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
