import { Component } from '@angular/core';
import { CiudadGetDto } from 'src/app/modelo/ciudad-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro-ciudad',
  templateUrl: './registro-ciudad.component.html',
  styleUrls: ['./registro-ciudad.component.css']
})
export class RegistroCiudadComponent {

  ciudad: String;
  constructor(private adminService: AdministradorService){
    this.ciudad = new String();
  }
  
  public registrar(){
   this.adminService.agregarCiudad(this.ciudad).subscribe({
      next: data => {
      console.log(data);
      },
      error: error => {
      console.log(error);
      }
      });
      }
    }

