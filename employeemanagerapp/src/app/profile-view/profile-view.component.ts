import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public employees: Employee[] = [];
  employee: any;
  public editEmployee!: Employee; // usiamo questa variabile per BINDARE (Dipendente da modificare (inizialmente indefinito))
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) { }
  ngOnInit(): void {
    this.getEmployees();
  }


  //* GET: Ottiene la lista di dipendenti
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

    //CHIUDO e RESETTO  il form una volta premuto il tasto AGGIUNGI
    document.getElementById("close-add-form")?.click();
    document.getElementById("reset-add-form")?.click();
  }



  // Apre il MODAL corrispondente alla modalità specificata (aggiunta, modifica, eliminazione)
  public onOpenModal(employee: Employee, mode: string): void { // mode: specificherà l'azione che l'utente eseguirà
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    // importo gli attributi
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
}
