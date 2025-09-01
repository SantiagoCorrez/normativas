import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {
  private apiUrl = 'http://localhost:5000/api/admin/subcategorias'; // Nueva ruta para el backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  // Obtener todas las subcategorías
  getSubcategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Obtener subcategorías por ID de categoría
  getSubcategoriasByCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?categoria_id=${categoriaId}`, { headers: this.getHeaders() });
  }

  // Crear una nueva subcategoría
  createSubcategoria(subcategoria: { nombre: string, categoria_id: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, subcategoria, { headers: this.getHeaders() });
  }

  // Actualizar una subcategoría
  updateSubcategoria(id: number, subcategoria: { nombre: string, categoria_id: number }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, subcategoria, { headers: this.getHeaders() });
  }

  // Eliminar una subcategoría
  deleteSubcategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getSubcategoriasPublico(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/subcategorias');
  }
}