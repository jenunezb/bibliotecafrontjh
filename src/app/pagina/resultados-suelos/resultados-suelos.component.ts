import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroSuelosDto } from 'src/app/modelo/registroSuelos-get-dto';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/servicios/administradorservice.service';
import { GradacionDTO } from 'src/app/modelo/gradacion-dto';

@Component({
  selector: 'app-resultados-suelos',
  templateUrl: './resultados-suelos.component.html',
  styleUrls: ['./resultados-suelos.component.css']
})
export class ResultadosSuelosComponent {
  seccionActiva: string = ''
  codigo: number = 1;

  dataSource = new MatTableDataSource<GradacionDTO>([]);

  constructor(private router: Router, private administradorService: AdministradorService){}

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
  }

  ngOnInit(): void {
    this.mostrarResultados();
  }

  
  mostrarResultados(){
    this.administradorService.mostrarGradacion(this.codigo)
    .subscribe(
      (response: any) => {
        confirm
        this.dataSource.data = response.respuesta;
        console.log(this.dataSource.data + "entra");
      },
      error => {
        console.error('Error al obtener la lista de muestras de suelo:', error);
      }
    );
    window.open(`/resultados-suelos/${this.codigo}`, 'Asignar obra', 'width=900, height=700');
      }
}
