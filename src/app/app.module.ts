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
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { EnsayosComponent } from './pagina/ensayos/ensayos.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './pagina/usuarios/usuarios.component';
import { SedesComponent } from './pagina/sedes/sedes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SuelosComponent } from './pagina/suelos/suelos.component';
import { RegistroUsuariosComponent } from './pagina/registro-usuarios/registro-usuarios.component';
import { RegistroCiudadComponent } from './pagina/registro-ciudad/registro-ciudad.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegistroSedesComponent } from './pagina/registro-sedes/registro-sedes.component';
import { RegistroEmpresaComponent } from './pagina/registro-empresa/registro-empresa.component';
import { RegistroCilindroComponent } from './pagina/registro-cilindro/registro-cilindro.component';
import { RegistroMuestraComponent } from './pagina/registro-muestra/registro-muestra.component';
import { LibroComponent } from './pagina/libro/libro.component';
import { RegistroLibroComponent } from './pagina/registro-libro/registro-libro.component';
import { ConcretosPdfComponent } from './pagina/concretos-pdf/concretos-pdf.component';
import { OrdenConcretosComponent } from './pagina/orden-concretos/orden-concretos.component';
import { ResultadosConcretosComponent } from './pagina/resultados-concretos/resultados-concretos.component';
import { InformeConcretosComponent } from './pagina/informe-concretos/informe-concretos.component';
import { SuelosPdfComponent } from './pagina/suelos-pdf/suelos-pdf.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReporteComponent } from './pagina/reporte/reporte.component';
import { RegistroSuelosComponent } from './pagina/registro-suelos/registro-suelos.component';
import { ResultadosSuelosComponent } from './pagina/resultados-suelos/resultados-suelos.component';


@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,
    AlertaComponent,
    LoginComponent,
    EnsayosComponent,
    UsuariosComponent,
    SedesComponent,
    SuelosComponent,
    RegistroUsuariosComponent,
    RegistroCiudadComponent,
    RegistroSedesComponent,
    RegistroEmpresaComponent,
    RegistroCilindroComponent,
    RegistroMuestraComponent,
    LibroComponent,
    RegistroLibroComponent,
    ConcretosPdfComponent,
    OrdenConcretosComponent,
    ResultadosConcretosComponent,
    InformeConcretosComponent,
    SuelosPdfComponent,
    ReporteComponent,
    RegistroSuelosComponent,
    ResultadosSuelosComponent,

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
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
