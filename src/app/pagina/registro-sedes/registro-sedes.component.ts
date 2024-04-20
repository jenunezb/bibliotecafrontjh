import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { SedesGetDTO } from 'src/app/modelo/sedes-dto';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { CiudadGetDto } from 'src/app/modelo/ciudad-get-dto';

@Component({
  selector: 'app-registro-sedes',
  templateUrl: './registro-sedes.component.html',
  styleUrls: ['./registro-sedes.component.css']
})
export class RegistroSedesComponent {

  dataSource = new MatTableDataSource<SedesGetDTO>([]);
  dataSources = new MatTableDataSource<CiudadGetDto>([]);
  displayedColumns: string[] = ['ciudad','direccion','telefono'];
  sedesDto: SedesGetDTO;
  alerta!: Alerta;
  ciudad: string = '';
  direccion: string = '';
  telefono: string = '';
  camposIncompletos: boolean = false;
  mostrarErrorSedeRepetido: boolean = false;

  
  constructor(private adminService: AdministradorService,private authService: AuthService){
    this.sedesDto = new SedesGetDTO();
    this.listarCiudades();
    this.listarSedes();
  }

  listarCiudades(): void{
    this.authService.listarCiudades()
    .subscribe(
      (response: any) => {
        confirm
        this.dataSources.data = response.respuesta; 
        console.log(this.dataSources.data);
      },
      error => {
        console.error('Error al obtener la lista de ciudades:', error);
      }
    
    );
  }

  listarSedes(): void{
    this.adminService.listarSedes()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta; 
          console.log(this.dataSource.data);
        },
        error => {
          console.error('Error al obtener la lista de sedes:', error);
        }
      
      );
    }
  
  registrar(): void {
    if (!this.ciudad || !this.direccion ||!this.telefono) {
      this.camposIncompletos = true;
      this.mostrarErrorSedeRepetido = false;
      return;
    }
    this.adminService.agregarSede(this.ciudad, this.direccion,this.telefono).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        alert('¡La sede ha sido creada!');
        window.close(); 
      },
      error: (error) => {
        console.error('Error al registrar la empresa:', error);
        if (error && error.error && typeof error.error === 'string') {
          // Mostrar mensaje de error del backend con estilo de error
          this.mostrarAlerta(error.error, 'danger');
        } else {
          // Mostrar mensaje de error genérico con estilo de error
          this.mostrarAlerta('La sede ya se encuentra registrada para esta ciudad.', 'danger');
        }
      },
      complete: () => {
        // Restablecer la bandera de campos incompletos una vez se inicia el registro
        this.camposIncompletos = true;
        this.mostrarErrorSedeRepetido = false;
      }
    });
  }

    // Función para mostrar alerta con estilo específico
    mostrarAlerta(mensaje: string, tipo: string): void {
      this.alerta = { mensaje: mensaje, tipo: tipo };
    }
    
  
    // Función para detectar cambios en los campos y ocultar el mensaje de error si todos los campos están llenos
    detectarCambios(): void {
      if (this.ciudad && this.direccion && this.telefono) {
        this.camposIncompletos = false; // Ocultar alerta de campos incompletos si el NIT está repetido
      this.mostrarErrorSedeRepetido = true; // Mostrar alerta de NIT repetido
    } else {
      this.camposIncompletos = false; // Ocultar alerta de campos incompletos si no hay errores
      this.mostrarErrorSedeRepetido = false; // Ocultar alerta de NIT repetido si no hay errores
    }
}

  }
