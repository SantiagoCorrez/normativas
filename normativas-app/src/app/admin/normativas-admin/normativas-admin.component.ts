import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NormativasService } from '../normativas.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-normativas-admin',
  templateUrl: './normativas-admin.component.html',
  styleUrls: ['./normativas-admin.component.css'],
  imports: [
    MatTableModule ,MatButtonModule,MatIconModule,RouterModule, HttpClientModule],
  providers:[NormativasService, AuthService]
})
export class NormativasAdminComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();

  constructor(private normativasService: NormativasService) {}

  ngOnInit(): void {
    this.getNormativas();
  }

  getNormativas() {
    this.normativasService.getNormativasAdmin().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteNormativa(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta normativa?')) {
      this.normativasService.deleteNormativa(id).subscribe(() => {
        this.getNormativas();
      });
    }
  }
}