import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pagina/login/login.component';
import { MenuComponent } from './pagina/menu/menu.component';
import { InicioComponent } from './pagina/menu/inicio/inicio.component';
import { NavbarComponent } from './pagina/menu/navbar/navbar.component';
import { ReportesComponent } from './pagina/menu/reportes/reportes.component';
import { UsuariosComponent } from './pagina/menu/usuarios/usuarios.component';
import { SharedModule } from './pagina/shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    NavbarComponent,
    ReportesComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
