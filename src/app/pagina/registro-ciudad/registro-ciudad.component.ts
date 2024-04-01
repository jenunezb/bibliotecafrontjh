import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
@Component({
  selector: 'app-registro-ciudad',
  templateUrl: './registro-ciudad.component.html',
  styleUrls: ['./registro-ciudad.component.css']
})
export class RegistroCiudadComponent {
  
  alerta!: Alerta;
  ciudad: string = '';
  constructor(private adminService: AdministradorService){
  }
  
  public registrar(){
   this.adminService.agregarCiudad(this.ciudad).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: err => {
        this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
      }
      });
      }
    }