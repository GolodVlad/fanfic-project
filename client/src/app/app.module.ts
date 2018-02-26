import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { FanficsService } from './services/fanfics.service';
import { FanficsComponent } from './components/fanfics/fanfics.component';
import { EditFanficComponent } from './components/fanfics/edit-fanfic/edit-fanfic.component';
import { DeleteFanficComponent } from './components/fanfics/delete-fanfic/delete-fanfic.component';
import { ViewFanficComponent } from './components/fanfics/view-fanfic/view-fanfic.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    FanficsComponent,
    EditFanficComponent,
    DeleteFanficComponent,
    ViewFanficComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    NotAuthGuard, 
    FanficsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
