import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  constructor() { }


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
    if(results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
