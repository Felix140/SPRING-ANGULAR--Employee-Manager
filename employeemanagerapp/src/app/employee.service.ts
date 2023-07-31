import { HttpClient } from '@angular/common/http'; // Aggiunto HttpClient
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
    providedIn: 'root' // correzione da "provideIn" a "providedIn"
})
export class EmployeeService {
    private apiServerUrl = environment.apiBaseUrl; // accediamo qui all'URL del backend

    constructor(private http: HttpClient) {

    }

    // GET
    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`); //! attenzione: vanno aggiunti i BACKTICK
    }

    // POST
    public addEmployees(employee: Employee): Observable<Employee[]> {
        return this.http.post<Employee[]>(`${this.apiServerUrl}/employee/add`, employee); // Corretto in post
    }

    // PUT
    public updateEmployees(employee: Employee): Observable<Employee[]> {
        return this.http.put<Employee[]>(`${this.apiServerUrl}/employee/update`, employee); // Corretto in put
    }

    // DELETE
    public deleteEmployees(employeeId: number): Observable<Employee[]> {
        return this.http.delete<Employee[]>(`${this.apiServerUrl}/employee/delete/${employeeId}`); // Corretto in delete e aggiunto employeeId come parametro
    }
}