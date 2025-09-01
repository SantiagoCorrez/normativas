import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NormativasAdminComponent } from './admin/normativas-admin/normativas-admin.component';
import { NormativaFormComponent } from './admin/normativa-form/normativa-form.component';
import { CategoriasAdminComponent } from './admin/categorias-admin/categorias-admin.component';
import { SubcategoriasAdminComponent } from './admin/subcategorias-admin/subcategorias-admin.component';
import { UsuariosAdminComponent } from './admin/usuarios-admin/usuarios-admin.component';
import { NormativasPublicoComponent } from './normativas-publico/normativas-publico.component';
import { NormativaDetailComponent } from './normativa-detail/normativa-detail.component';

export const routes: Routes = [
    { path: '', component: NormativasPublicoComponent },
    { path: 'normativas/:id', component: NormativaDetailComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'normativas', component: NormativasAdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'normativas/new', component: NormativaFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'normativas/:id', component: NormativaFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'categorias', component: CategoriasAdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'subcategorias', component: SubcategoriasAdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'usuarios', component: UsuariosAdminComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
