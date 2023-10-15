import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  constructor(private employeeService: EmployeeService) { }


  //* ADD: Aggiunge un nuovo dipendente
  public onAddEmployee(addForm: NgForm): void {
  
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee[]) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //* UPDATE: Aggiorna le informazioni di un dipendente
  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee[]) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }


  //* DELETE: Elimina un dipendente
  public onDeleteEmployee(employee: number): void {

    this.employeeService.deleteEmployees(employee).subscribe(
      (response: Employee[]) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    document.getElementById("close-delete-form")?.click();
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    //* importo gli attributi
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute("data-bs-toggle", "modal");

    if (mode == 'add') {
      button.setAttribute("data-bs-target", "#addEmployeeModal");
    }

    if (mode == 'edit') {
      this.editEmployee = employee;
      button.setAttribute("data-bs-target", "#updateEmployeeModal");
    }

    if (mode == 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute("data-bs-target", "#deleteEmployeeModal");
    }

    container?.appendChild(button);
    button.click();
  }
}
