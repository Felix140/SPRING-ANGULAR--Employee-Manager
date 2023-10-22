/**
 * Questo servizio gestisce le operazioni CRUD (CREAD, READ, UPDATE, DELETE) per i dipendenti.
 * Comunica con il backend tramite richieste HTTP.
 */
import { HttpClient } from '@angular/common/http'; // Aggiunto HttpClient
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable({
    providedIn: 'root' // correzione da "provideIn" a "providedIn" //* Il servizio è reso disponibile a livello globale nell'app
})
export class EmployeeService {

    //* L'URL del server backend ottenuto dall'ambiente.
    private apiServerUrl = environment.apiBaseUrl; // accediamo qui all'URL del backend


    //* Costruttore del servizio.
    //* @param http Un'istanza di HttpClient per effettuare richieste HTTP.
    constructor(private http: HttpClient) {

    }

    

    //* GET: Recupera la lista completa dei dipendenti dal backend.
    public getEmployees(): Observable<Employee[]> {
        // Ritorna un Observable contenente un array di oggetti Employee.
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`); //! attenzione: vanno aggiunti i BACKTICK
    }

    //* POST: Aggiunge un nuovo dipendente al backend.
    public addEmployees(employee: Employee): Observable<Employee[]> { //? @param employee L'oggetto Employee da aggiungere.
        // Ritorna un Observable contenente un array di oggetti Employee aggiornato.
        return this.http.post<Employee[]>(`${this.apiServerUrl}/employee/add`, employee); // Corretto in post
    }

    //* PUT: Aggiorna le informazioni di un dipendente esistente nel backend.
    public updateEmployees(employee: Employee): Observable<Employee[]> { //? @param employee L'oggetto Employee con le nuove informazioni.
        // Ritorna Un Observable contenente un array di oggetti Employee aggiornato.
        return this.http.put<Employee[]>(`${this.apiServerUrl}/employee/update`, employee); // Corretto in put
    }

    //* DELETE: Elimina un dipendente dal backend in base all'ID.
    public deleteEmployees(employeeId: number): Observable<Employee[]> { //? @param employeeId L'ID del dipendente da eliminare.
        // Ritorna un Observable contenente un array di oggetti Employee aggiornato.
        return this.http.delete<Employee[]>(`${this.apiServerUrl}/employee/delete/${employeeId}`); // Corretto in delete e aggiunto employeeId come parametro
    }
}