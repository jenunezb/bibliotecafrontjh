import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pagina/menu/menu.component';
import { LoginComponent } from './pagina/login/login.component';
import { UsuariosComponent } from './pagina/usuarios/usuarios.component';
import { LoginGuard } from './guards/permiso.service';
import { EnsayosComponent } from './pagina/ensayos/ensayos.component';
import { SuelosComponent } from './pagina/suelos/suelos.component';
import { EmpresasComponent } from './pagina/empresas/empresas.component';
import { RegistroUsuariosComponent } from './pagina/registro-usuarios/registro-usuarios.component';
import { RegistroCiudadComponent } from './pagina/registro-ciudad/registro-ciudad.component';
import { RolesGuard } from './guards/roles.service';
import { AcerosComponent } from './pagina/aceros/aceros.component';
import { RegistroSedesComponent } from './pagina/registro-sedes/registro-sedes.component';
import { RegistroEmpresaComponent } from './pagina/registro-empresa/registro-empresa.component';
import { RegistroCilindroComponent } from './pagina/registro-cilindro/registro-cilindro.component';

const routes: Routes = [
    { path: "registro-usuarios", component: RegistroUsuariosComponent, canActivate: [RolesGuard], data: {expectedRole: ["administrador"] }  },
    { path: "registro-sedes", component: RegistroSedesComponent,canActivate: [RolesGuard], data: {expectedRole: ["administrador"] }  },
    { path: "registro-cilindro", component: RegistroCilindroComponent,canActivate: [RolesGuard], data: {expectedRole: ["administrador"] }  },
    { path: "registro-empresa", component: RegistroEmpresaComponent,canActivate: [RolesGuard], data: {expectedRole: ["administrador"] }  },
    { path: "menu", component: MenuComponent , canActivate: [LoginGuard]},
    { path: "login", redirectTo: "", component: LoginComponent,canActivate: [LoginGuard]},
    { path: "usuarios", component: UsuariosComponent , canActivate: [LoginGuard]},
    { path: "ensayos", component: EnsayosComponent },
    { path: "suelos", component: SuelosComponent },
    { path: "aceros", component: AcerosComponent },
    { path: "empresas", component: EmpresasComponent },
    { path: "registro-ciudad", component: RegistroCiudadComponent },
    { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }