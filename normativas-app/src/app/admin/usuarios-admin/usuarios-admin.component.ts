import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosService } from '../../services/usuarios.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css'],
  imports: [MatCardModule, MatInputModule, FormsModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule, HttpClientModule, NgIf],
  providers: [UsuariosService, AuthService]
})
export class UsuariosAdminComponent implements OnInit {
  userForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  isEditMode = false;
  currentUserId: number | null = null;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      rol: ['admin'] // Opcional, puedes tener un selector de rol
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.usuariosService.updateUsuario(this.currentUserId!, this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.cancelEdit();
        });
      } else {
        this.usuariosService.createUsuario(this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.userForm.reset();
        });
      }
    }
  }

  editUser(user: any) {
    this.isEditMode = true;
    this.currentUserId = user.id;
    // PatchValue para rellenar el formulario con los datos del usuario, sin la contraseña
    this.userForm.patchValue({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      password: ''
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.currentUserId = null;
    this.userForm.reset();
  }
}