import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pagina/menu/menu.component';
import { LoginComponent } from './pagina/login/login.component';
import { UsuariosComponent } from './pagina/usuarios/usuarios.component';
import { LoginGuard } from './guards/permiso.service';

const routes: Routes = [
{ path: "menu", component: MenuComponent},
{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
{ path: "usuarios", component: UsuariosComponent, canActivate: [LoginGuard], data: { expectedRole: ["administrador"] }},
{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
