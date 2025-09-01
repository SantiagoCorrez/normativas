import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NormativasService {
  private apiUrl = 'http://localhost:5000/api/admin/normativas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  getNormativasAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getNormativaAdmin(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createNormativa(normativa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, normativa, { headers: this.getHeaders() });
  }

  updateNormativa(id: string, normativa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, normativa, { headers: this.getHeaders() });
  }

  deleteNormativa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}