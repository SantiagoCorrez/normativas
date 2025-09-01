import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriasService } from '../../services/categorias.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-categorias-admin',
  templateUrl: './categorias-admin.component.html',
  styleUrls: ['./categorias-admin.component.css'],
  imports: [MatTableModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatDividerModule, MatIconModule, NgIf]
})
export class CategoriasAdminComponent implements OnInit {
  categoriaForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  isEditMode = false;
  currentCategoriaId: number | null = null;

  constructor(private fb: FormBuilder, private categoriasService: CategoriasService) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  onSubmit() {
    if (this.categoriaForm.valid) {
      if (this.isEditMode) {
        this.categoriasService.updateCategoria(this.currentCategoriaId!, this.categoriaForm.value).subscribe(() => {
          this.loadCategorias();
          this.cancelEdit();
        });
      } else {
        this.categoriasService.createCategoria(this.categoriaForm.value).subscribe(() => {
          this.loadCategorias();
          this.categoriaForm.reset();
        });
      }
    }
  }

  editCategoria(categoria: any) {
    this.isEditMode = true;
    this.currentCategoriaId = categoria.id;
    this.categoriaForm.patchValue({ nombre: categoria.nombre });
  }

  deleteCategoria(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.categoriasService.deleteCategoria(id).subscribe(() => {
        this.loadCategorias();
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.currentCategoriaId = null;
    this.categoriaForm.reset();
  }
}