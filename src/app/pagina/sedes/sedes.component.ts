import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { SedesGetDTO } from 'src/app/modelo/sedes-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  dataSource = new MatTableDataSource<SedesGetDTO>([]);
  displayedColumns: string[] = ['Nombre', 'Direccion', 'telefono','acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;
  ciudad: string = '';

  constructor(private authService: AuthService,private adminService: AdministradorService) {}

  ngOnInit(): void {
    this.listarIngenieros();
  }

  listarIngenieros(): void {
    this.adminService.listarIngenieros()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta; 
        },
        error => {
          console.error('Error al obtener la lista de ingenieros:', error);
        }
      
      );
  }
  public listarSedes(): void{
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