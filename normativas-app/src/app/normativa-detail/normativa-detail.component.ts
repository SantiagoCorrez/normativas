import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NormativasPublicoService } from '../normativas-publico/normativas-publico.service';
import { CategoriasService } from '../services/categorias.service';
import { SubcategoriasService } from '../services/subcategorias.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-normativa-detail',
  templateUrl: './normativa-detail.component.html',
  styleUrls: ['./normativa-detail.component.css'],
  imports: [MatCardModule, DatePipe, NgIf, MatButtonModule, RouterModule]
})
export class NormativaDetailComponent implements OnInit {
  normativa: any;
  categorias: any[] = [];
  subcategorias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private normativasService: NormativasPublicoService,
    private categoriasService: CategoriasService,
    private subcategoriasService: SubcategoriasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAllData(id);
    }
  }
  
  loadAllData(id: string) {
    this.normativasService.getNormativa(id).subscribe((normativa: any) => {
      this.normativa = normativa;
      this.loadCategorias();
      this.loadSubcategorias();
    });
  }

  loadCategorias() {
    this.categoriasService.getCategoriasPublico().subscribe((data: any[]) => {
      this.categorias = data;
    });
  }

  loadSubcategorias() {
    this.subcategoriasService.getSubcategoriasPublico().subscribe((data: any[]) => {
      this.subcategorias = data;
    });
  }
  
  getCategoriaNombre(): string {
    const categoria = this.categorias.find(c => c.id === this.normativa.categoria_id);
    return categoria ? categoria.nombre : 'Cargando...';
  }

  getSubcategoriaNombre(): string {
    const subcategoria = this.subcategorias.find(sc => sc.id === this.normativa.subcategoria_id);
    return subcategoria ? subcategoria.nombre : 'Cargando...';
  }
}