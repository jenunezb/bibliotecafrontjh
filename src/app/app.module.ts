import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './pagina/menu/menu.component';
import { LoginComponent } from './pagina/login/login.component';
import { UsuariosComponent } from './pagina/usuarios/usuarios.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { EnsayosComponent } from './pagina/ensayos/ensayos.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './pagina/empresas/empresas.component';
import { SedesComponent } from './pagina/sedes/sedes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SuelosComponent } from './pagina/suelos/suelos.component';
import { RegistroUsuariosComponent } from './pagina/registro-usuarios/registro-usuarios.component';
import { RegistroCiudadComponent } from './pagina/registro-ciudad/registro-ciudad.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AcerosComponent } from './pagina/aceros/aceros.component';
import { RegistroSedesComponent } from './pagina/registro-sedes/registro-sedes.component';
import { RegistroEmpresaComponent } from './pagina/registro-empresa/registro-empresa.component';
import { RegistroCilindroComponent } from './pagina/registro-cilindro/registro-cilindro.component';
import { RegistroMuestraComponent } from './pagina/registro-muestra/registro-muestra.component';
import { ObraComponent } from './pagina/obra/obra.component';
import { IngenieroComponent } from './pagina/ingeniero/ingeniero.component';
import { DigitadorComponent } from './pagina/digitador/digitador.component';
import { ClienteComponent } from './pagina/cliente/cliente.component';
import { RegistroObraComponent } from './pagina/registro-obra/registro-obra.component';

@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,
    AlertaComponent,
    LoginComponent,
    UsuariosComponent,
    EnsayosComponent,
    EmpresasComponent,
    SedesComponent,
    SuelosComponent,
    RegistroUsuariosComponent,
    RegistroCiudadComponent,
    AcerosComponent,
    RegistroSedesComponent,
    RegistroEmpresaComponent,
    RegistroCilindroComponent,
    RegistroMuestraComponent,
    ObraComponent,
    IngenieroComponent,
    DigitadorComponent,
    ClienteComponent,
    RegistroObraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    NgxPaginationModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    BrowserModule,
    FormsModule, 
    MatTableModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
