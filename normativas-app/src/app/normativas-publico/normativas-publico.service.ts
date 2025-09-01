import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NormativasPublicoService {
  private apiUrl = 'http://localhost:5000/api/normativas';

  constructor(private http: HttpClient) { }

  searchNormativas(params: any): Observable<any[]> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return this.http.get<any[]>(this.apiUrl, { params: httpParams });
  }

  getNormativa(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}