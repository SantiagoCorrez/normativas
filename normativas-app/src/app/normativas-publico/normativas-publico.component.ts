import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from '../services/categorias.service';
import { SubcategoriasService } from '../services/subcategorias.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { NormativasPublicoService } from './normativas-publico.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-normativas-publico',
  templateUrl: './normativas-publico.component.html',
  styleUrls: ['./normativas-publico.component.css'],
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, RouterModule,SlicePipe, HttpClientModule],
  providers: [NormativasPublicoService, CategoriasService, SubcategoriasService, AuthService]
})
export class NormativasPublicoComponent implements OnInit {
  searchForm: FormGroup;
  normativas: any[] = [];
  categorias: any[] = [];
  subcategorias: any[] = [];
  todasSubcategorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private normativasService: NormativasPublicoService,
    private categoriasService: CategoriasService,
    private subcategoriasService: SubcategoriasService
  ) {
    this.searchForm = this.fb.group({
      q: [''],
      categoria_id: [null],
      subcategoria_id: [null]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
    this.loadTodasSubcategorias();
    this.onSearch(); // Carga las normativas iniciales al cargar la página

    this.searchForm.get('categoria_id')?.valueChanges.subscribe(categoryId => {
      this.filterSubcategorias(categoryId);
      this.searchForm.get('subcategoria_id')?.setValue(null);
      this.onSearch();
    });

    this.searchForm.get('subcategoria_id')?.valueChanges.subscribe(() => {
      this.onSearch();
    });
  }

  loadCategorias() {
    this.categoriasService.getCategoriasPublico().subscribe(data => {
      this.categorias = data;
    });
  }

  loadTodasSubcategorias() {
    this.subcategoriasService.getSubcategoriasPublico().subscribe(data => {
      this.todasSubcategorias = data;
    });
  }

  filterSubcategorias(categoryId: number) {
    this.subcategorias = this.todasSubcategorias.filter(sc => sc.categoria_id === categoryId);
  }

  onSearch() {
    const params = this.searchForm.value;
    this.normativasService.searchNormativas(params).subscribe(data => {
      this.normativas = data;
    });
  }
}