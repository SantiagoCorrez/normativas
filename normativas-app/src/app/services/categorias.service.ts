import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = '/api/admin/categorias'; // Nueva ruta para el backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  // Obtener todas las categorías
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Crear una nueva categoría
  createCategoria(categoria: { nombre: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria, { headers: this.getHeaders() });
  }

  // Actualizar una categoría
  updateCategoria(id: number, categoria: { nombre: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, categoria, { headers: this.getHeaders() });
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getCategoriasPublico(): Observable<any[]> {
    return this.http.get<any[]>('/api/categorias');
  }
}