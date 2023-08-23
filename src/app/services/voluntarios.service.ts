import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  apiUrl = 'http://localhost:3000/voluntarios';

  constructor(private http: HttpClient) { }

  getNoAprobados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/noaprobados`);
  }

  getAprobados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/aprobados`);
  }

  cambiarAprobacion(id: number, aprobado: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiarAprobacion/${id}`, { Voluntario_Aprobado: aprobado });
  }
}