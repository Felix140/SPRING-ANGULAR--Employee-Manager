import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[] = []; //! INIZIALIZZARE LA VARIABILE EMPLOYEES
  employee: any;
  public editEmployee!: Employee; // usiamo questa variabile per BINDARE

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    // throw new Error('Method not implemented.');
  }

  //* GET
  public getEmployees(): void {
    // richiamo qui sotto il metodo getEmployees(employee) da employee.service
    this.employeeService.getEmployees().subscribe(

      (response: Employee[]) => {
        this.employees = response;
      },

      (errore: HttpErrorResponse) => {
        alert(errore.message)
        // this.employees = []; // Imposta employees come un array vuoto in caso di errore
      }

    );

    //*CHIUDO e RESETTO  il form una volta premuto il tasto AGGIUNGI

    document.getElementById("close-add-form")?.click();
    document.getElementById("reset-add-form")?.click();
  }

  //* ADD
  // aggiungere direttiva NgForm come tipo di dato per il parametro da passare a (ngSubmit)
  public onAddEmployee(addForm: NgForm): void {
    // richiamo qui sotto il metodo addEmployees(employee) da employee.service
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

  //* UPDATE
  public onUpdateEmployee(employee: Employee): void {
    // richiamo qui sotto il metodo updateEmployees(employee) da employee.service
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

  // creo il MODAL dei BOTTONI:
  // <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  //   Launch demo modal
  // </button>
  public onOpenModal(employee: Employee, mode: string): void { // mode: specificherà l'azione che l'utente eseguirà
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    //* importo gli attributi
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute("data-bs-toggle", "modal");

    // il target sarà differente in base al bottone che viene premuto:
    if (mode == 'add') {
      button.setAttribute("data-bs-target", "#addEmployeeModal");
    }

    if (mode == 'edit') {
      this.editEmployee = employee; //fa riferimento dal contenuto di editEmployee del onOpenModal CLICCATO(employee)
      button.setAttribute("data-bs-target", "#updateEmployeeModal");
    }

    if (mode == 'delete') {
      button.setAttribute("data-bs-target", "#deleteEmployeeModal");
    }

    // aggiungo i bottoni al container
    container?.appendChild(button);
    // al momento del click avvia il MODAL corrispondente
    button.click();
  }
}
