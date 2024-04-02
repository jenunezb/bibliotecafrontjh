import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { CiudadGetDto } from 'src/app/modelo/ciudad-get-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro-ciudad',
  templateUrl: './registro-ciudad.component.html',
  styleUrls: ['./registro-ciudad.component.css']
})
export class RegistroCiudadComponent implements OnInit {
  

  ngOnInit() {
    this.listarCiudades();
  }
  
  dataSource = new MatTableDataSource<CiudadGetDto>([]);
  displayedColumns: string[] = ['ciudad','acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;
  ciudad: string = '';

  constructor(private authService: AuthService,private adminService: AdministradorService){
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
  
 public listarCiudades(): void{
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
    }