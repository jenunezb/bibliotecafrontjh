import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { SedesGetDTO } from 'src/app/modelo/sedes-dto';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-registro-sedes',
  templateUrl: './registro-sedes.component.html',
  styleUrls: ['./registro-sedes.component.css']
})
export class RegistroSedesComponent {

  dataSource = new MatTableDataSource<SedesGetDTO>([]);
  displayedColumns: string[] = ['ciudad','direccion','telefono'];
  sedesDto: SedesGetDTO;
  alerta!: Alerta;
  ciudad: string = '';
  direccion: string = '';
  telefono: string = '';

  
  constructor(private adminService: AdministradorService){
    this.sedesDto = new SedesGetDTO();
  }

  registrar(): void {
    if (!this.ciudad || !this.direccion ||!this.telefono) {
      this.alerta = { mensaje: 'Por favor completa todos los campos.', tipo: 'danger' };
      return;
    }
    this.adminService.agregarSede(this.ciudad, this.direccion,this.telefono).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        alert('¡La sede ha sido creada!');
        window.close(); 
      },
      error: (err) => {
        console.error('Error al registrar la sede:', err);
        this.alerta = { mensaje: err.error.respuesta || 'Error al procesar la solicitud.', tipo: 'danger' };
      }
    });
  }
}