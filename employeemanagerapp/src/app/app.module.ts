import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeService } from './services/employee.service';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { EmployeeCardComponent } from './profile-view/employee-card/employee-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileViewComponent,
    EmployeeCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
