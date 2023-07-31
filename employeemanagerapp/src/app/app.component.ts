import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public employees!: Employee[];
  employee: any;

  constructor(private employeeService: EmployeeService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(

      (response: Employee[]) => {
        this.employees = response;
      },

      (errore: HttpErrorResponse) => {
        alert(errore.message)
      }

    )
  }

}
