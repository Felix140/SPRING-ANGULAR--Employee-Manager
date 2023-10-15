import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActionbarComponent } from './actionbar/actionbar.component';
import { AppComponent } from './app.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CardComponent } from './card-page/card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeService } from './services/employee.service';
import { ModalFormComponent } from './modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    CardPageComponent,
    ActionbarComponent,
    ModalFormComponent
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
