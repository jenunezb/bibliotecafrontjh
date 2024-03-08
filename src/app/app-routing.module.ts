import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pagina/login/login.component';
import { UsuariosComponent } from './pagina/menu/usuarios/usuarios.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu/usuarios', component: UsuariosComponent,  },
  { path: 'menu', loadChildren: () => import('./pagina/menu/menu.module').then(x => x.MenuModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
