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
  cedula: string = '';
  nombre: string = '';
  telefono: string = '';
  correo: string = '';
  email: string = '';
  password: string = '';
  rol: string = '';
  confirmPassword: string = '';

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
    if (!this.cedula || !this.nombre || !this.telefono || !this.correo) {
      this.alerta = { mensaje: 'Por favor completa todos los campos.', tipo: 'danger' };
      return;
    }

    this.adminService.agregarUsuario(this.cedula, this.nombre, this.telefono, this.correo).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        alert('¡El Usuario ha sido creado!');
      
        window.close();
      },
      error: (err) => {
        this.alerta = { mensaje: err.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
      }
    });
  }
}