import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NormativasService } from '../normativas.service';
import { CategoriasService } from '../../services/categorias.service'; // Asumimos un servicio para categorías
import { SubcategoriasService } from '../../services/subcategorias.service'; // Asumimos un servicio para subcategorías
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-normativa-form',
  templateUrl: './normativa-form.component.html',
  styleUrls: ['./normativa-form.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    QuillModule
  , HttpClientModule, RouterModule],
  providers:[SubcategoriasService, CategoriasService, AuthService, NormativasService]
})
export class NormativaFormComponent implements OnInit {
  normativaForm: FormGroup;
  isEditMode = false;
  normativaId: string | null = null;
  categorias: any[] = [];
  subcategorias: any[] = [];
  todasSubcategorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private normativasService: NormativasService,
    private categoriasService: CategoriasService,
    private subcategoriasService: SubcategoriasService
  ) {
    this.normativaForm = this.fb.group({
      titulo: ['', Validators.required],
      numero_acto: ['', Validators.required],
      tipo_acto: ['', Validators.required],
      fecha_expedicion: ['', Validators.required],
      dependencia_expide: ['', Validators.required],
      epigrafe: ['', Validators.required],
      estado_acto: ['', Validators.required],
      observaciones: [''],
      normativa: [''],
      categoria_id: ['', Validators.required],
      subcategoria_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.normativaId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.normativaId;

    this.loadCategorias();
    this.loadTodasSubcategorias();

    if (this.isEditMode) {
      this.loadNormativa();
    }
    
    // Escucha los cambios en el selector de categoría
    this.normativaForm?.get('categoria_id')?.valueChanges.subscribe(categoryId => {
      this.filterSubcategorias(categoryId);
      this.normativaForm.get('subcategoria_id')?.setValue(null); // Resetea la subcategoría
    });
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe((data:any) => {
      this.categorias = data;
    });
  }

  loadTodasSubcategorias() {
    this.subcategoriasService.getSubcategorias().subscribe((data:any) => {
      this.todasSubcategorias = data;
      // Filtra las subcategorías si ya hay una categoría seleccionada (en modo edición)
      if (this.normativaForm.get('categoria_id')?.value) {
        this.filterSubcategorias(this.normativaForm.get('categoria_id')?.value);
      }
    });
  }

  filterSubcategorias(categoryId: number) {
    this.subcategorias = this.todasSubcategorias.filter(sc => sc.categoria_id === categoryId);
  }

  loadNormativa() {
    this.normativasService.getNormativaAdmin(this.normativaId!).subscribe(data => {
      this.normativaForm.patchValue(data);
      // Después de cargar la normativa, filtra las subcategorías para que se muestren las correctas
      this.filterSubcategorias(data.categoria_id);
    });
  }

  onSubmit() {
    if (this.normativaForm.valid) {
      if (this.isEditMode) {
        this.normativasService.updateNormativa(this.normativaId!, this.normativaForm.value).subscribe(() => {
          this.router.navigate(['/admin/normativas']);
        });
      } else {
        this.normativasService.createNormativa(this.normativaForm.value).subscribe(() => {
          this.router.navigate(['/admin/normativas']);
        });
      }
    }
  }
}