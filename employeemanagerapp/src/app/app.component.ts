import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
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
  public deleteEmployee!: Employee;
  private isMoving = false;
  private originalButtonPosition: { top: number, left: number } = { top: 0, left: 0 };


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


  //* DELETE
  public onDeleteEmployee(employee: number): void { // di tipo :number -> employee.service.ts
    // richiamo qui sotto il metodo updateEmployees(employee) da employee.service
    this.employeeService.deleteEmployees(employee).subscribe(

      (response: Employee[]) => {
        console.log(response);
        this.getEmployees();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

    // chiudi la maschera una volta premuto il tasto ELIMINA
    document.getElementById("close-delete-form")?.click();
  }



  // * SEARCH BAR
  public searchEmployees(key: string): void { // la key è il valore che l'utente scriverà nella searchbar
    // creo un array per inserire gli elementi per la ricerca
    const results: Employee[] = [];

    // utilizzo il loop for...of sull'array "public employees: Employee[]"
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    //? Il indexOf()metodo restituisce il primo indice in cui è
    //? possibile trovare un dato elemento nell'array,
    //? oppure -1 se non è presente.


    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
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
      this.deleteEmployee = employee; //fa riferimento dal contenuto di editEmployee del onOpenModal CLICCATO(employee)
      button.setAttribute("data-bs-target", "#deleteEmployeeModal");
    }

    // aggiungo i bottoni al container
    container?.appendChild(button);
    // al momento del click avvia il MODAL corrispondente
    button.click();
  }




  // Metodo per calcolare la nuova posizione del bottone e applicare lo stile per l'allontanamento
  public moveButtonAway(event: MouseEvent): void {
    if (!this.isMoving) {
      this.isMoving = true;
      const button = event.target as HTMLElement;
      const cursorX = event.clientX;
      const cursorY = event.clientY;

      this.originalButtonPosition = button.getBoundingClientRect();

      // Calcola le nuove coordinate del bottone
      const deltaX = Math.min(cursorX - this.originalButtonPosition.left, 400);
      const deltaY = Math.min(cursorY - this.originalButtonPosition.top, 400);
      const targetX = this.originalButtonPosition.left + deltaX;
      const targetY = this.originalButtonPosition.top + deltaY;

      // Applica lo stile per la posizione assoluta e l'animazione
      button.classList.add('move-away', 'absolute');
      // Imposta la nuova posizione
      button.style.left = `${this.originalButtonPosition.left}px`;
      button.style.top = `${this.originalButtonPosition.top}px`;

      // Avvia la transizione di spostamento
      setTimeout(() => {
        button.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }, 0);

      // Imposta un timeout per reimpostare la variabile isMoving una volta completata la transizione
      setTimeout(() => {
        this.isMoving = false;
      }, 300);
    }
  }

  // Metodo per reimpostare la posizione del bottone
  public resetButtonPosition(): void {
    const button = document.querySelector('.btn-danger') as HTMLElement;
    button.style.transform = 'translate(0, 0)';
    button.classList.remove('absolute');
    this.isMoving = false;
  }

  // Aggiungi questo metodo per reimpostare la posizione del bottone quando il mouse esce dall'area del bottone stesso
  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: MouseEvent): void {
    this.resetButtonPosition();
  }

}
