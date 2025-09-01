import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubcategoriasService } from '../../services/subcategorias.service';
import { CategoriasService } from '../../services/categorias.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-subcategorias-admin',
  templateUrl: './subcategorias-admin.component.html',
  styleUrls: ['./subcategorias-admin.component.css'],
  imports: [MatTableModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatDividerModule, MatIconModule, MatSelectModule, HttpClientModule, NgIf],
  providers:[SubcategoriasService, CategoriasService, AuthService]
})
export class SubcategoriasAdminComponent implements OnInit {
  subcategoriaForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  categorias: any[] = [];
  isEditMode = false;
  currentSubcategoriaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private subcategoriasService: SubcategoriasService,
    private categoriasService: CategoriasService
  ) {
    this.subcategoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
    this.loadSubcategorias();
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  loadSubcategorias() {
    this.subcategoriasService.getSubcategorias().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getCategoriaNombre(id: number): string {
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'N/A';
  }

  onSubmit() {
    if (this.subcategoriaForm.valid) {
      if (this.isEditMode) {
        this.subcategoriasService.updateSubcategoria(this.currentSubcategoriaId!, this.subcategoriaForm.value).subscribe(() => {
          this.loadSubcategorias();
          this.cancelEdit();
        });
      } else {
        this.subcategoriasService.createSubcategoria(this.subcategoriaForm.value).subscribe(() => {
          this.loadSubcategorias();
          this.subcategoriaForm.reset();
        });
      }
    }
  }

  editSubcategoria(subcategoria: any) {
    this.isEditMode = true;
    this.currentSubcategoriaId = subcategoria.id;
    this.subcategoriaForm.patchValue({
      nombre: subcategoria.nombre,
      categoria_id: subcategoria.categoria_id
    });
  }

  deleteSubcategoria(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta subcategoría?')) {
      this.subcategoriasService.deleteSubcategoria(id).subscribe(() => {
        this.loadSubcategorias();
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.currentSubcategoriaId = null;
    this.subcategoriaForm.reset();
  }
}