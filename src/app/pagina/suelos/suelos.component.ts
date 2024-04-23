import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alerta } from 'src/app/modelo/alerta';
import { ConcretosDto } from 'src/app/modelo/concretos-dto';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-suelos',
  templateUrl: './suelos.component.html',
  styleUrls: ['./suelos.component.css']
})
export class SuelosComponent {

  dataSource = new MatTableDataSource<ConcretosDto>([]);
  displayedColumns: string[] = ['Cr','numerodeMuestra', 'proyecto', 'fechaProgramada', 'acciones']; // Define las columnas que deseas mostrar
  alerta!: Alerta;
  seccionActiva: string = ''

  constructor(private authService: AuthService,private router: Router, private administradorService: AdministradorService) { }

  ngOnInit(): void {

    this.listarSuelos();
  }
  
  listarSuelos(): void {
    this.administradorService.listarSuelos()
      .subscribe(
        (response: any) => {
          confirm
          this.dataSource.data = response.respuesta;
        },
        error => {
          console.error('Error al obtener la lista de muestras de suelo:', error);
        }

      );
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
  }
}