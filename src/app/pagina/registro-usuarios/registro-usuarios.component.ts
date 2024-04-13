// registro-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service'

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent{

  dataSource = new MatTableDataSource<UsuarioDTO>([]);
  displayedColumns: string[] = ['cedula','nombre','ciudad','telefono','correo','acciones'];
  usuarioDto: UsuarioDTO;
  alerta: { mensaje: string, tipo: string } | null = null;
  correoDuplicado = false;
  alertaCorreoIncompleto = false;
  mostrarErrorCorreoVacio= false;
  mostrarErrorCorreoCampo= false;

  

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService,private adminService: AdministradorService){
    this.usuarioDto = new UsuarioDTO();
    this.listarCiudades();
  }

  listarCiudades(): void{
    this.authService.listarCiudades()
    .subscribe(
      (response: any) => {
        confirm
        this.dataSource.data = response.respuesta; 
        console.log(this.dataSource.data);
      },
      error => {
        console.error('Error al obtener la lista de ciudades:', error);
      }
    
    );
  }

  registrar(): void {

    if (this.usuarioDto.rol === 'administrador') {
      this.adminService.agregarAdministrador(this.usuarioDto).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
          alert('¡El Administrador ha sido creado!');
          window.close();
        },
        error: (err) => {
          if (err.error.respuesta === 'Por favor completa el campo de correo') {
            this.mostrarErrorCorreoVacio = true; // Mostrar mensaje de error de correo vacío
            this. mostrarErrorCorreoCampo= true;
          } else {
            this.mostrarErrorCorreoVacio = false; 
            this. mostrarErrorCorreoCampo= false;
          }
          this.alerta = { mensaje: err.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
        }
      });
    }
    
    if(this.usuarioDto.rol=='cliente'){
      this.adminService.agregarCliente(this.usuarioDto).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
          alert('¡El Cliente ha sido creado!');
        
          window.close();
        },
        error: (err) => {
          this.alerta = { mensaje: err.error.respuesta || 'Campo cedula ya esta registrado.', tipo: 'danger' };
        }
      });
    }

    if(this.usuarioDto.rol=='ingeniero'){
      this.adminService.agregarIngeniero(this.usuarioDto).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
          alert('¡El Ingeniero ha sido creado!');
        
          window.close();
        },
        error: (err) => {
          this.alerta = { mensaje: err.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
        }
      });
    }

    if(this.usuarioDto.rol=='digitador'){
      this.adminService.agregarDigitador(this.usuarioDto).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
          alert('¡El Digitador ha sido creado!');
        
          window.close();
        },
        error: (err) => {
          this.alerta = { mensaje: err.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
  
          }
      });
    }
    }

    public sonIguales():boolean{
      return this.usuarioDto.password == this.usuarioDto.confirmaPassword;
      }
      sonCamposVacios(): boolean {
        return !this.usuarioDto.rol || !this.usuarioDto.correo || !this.usuarioDto.password;
      }
      validarCorreo(): void {
        this.alertaCorreoIncompleto = !this.usuarioDto.correo; // Verifica si el campo de correo está vacío
      }
    
      // Método para limpiar la bandera de alerta de correo incompleto cuando el campo se llena
      limpiarAlertaCorreo(): void {
        if (this.usuarioDto.correo) {
          this.alertaCorreoIncompleto = false; // Oculta la alerta si el campo de correo está lleno
        }
      }
    
        // Función para mostrar alerta con estilo específico
    mostrarAlerta(mensaje: string, tipo: string): void {
      this.alerta = { mensaje: mensaje, tipo: tipo };
    }
    detectarCambios(): void {
      if ( this.usuarioDto.correo== null) {
        this.mostrarErrorCorreoVacio = true; 
        this.mostrarErrorCorreoCampo = true; // Mostrar alerta de NIT repetido
      } 
  }
}
