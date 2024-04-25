import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroSuelosDto } from 'src/app/modelo/registroSuelos-get-dto';
import { Router } from '@angular/router';




@Component({
  selector: 'app-resultados-suelos',
  templateUrl: './resultados-suelos.component.html',
  styleUrls: ['./resultados-suelos.component.css']
})
export class ResultadosSuelosComponent {
  seccionActiva: string = ''

  dataSource = new MatTableDataSource<ResultadosSuelosComponent>([]);

  constructor(private router: Router){}

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.router.navigateByUrl('/' + seccion); // Navegar a la ruta correspondiente
    
    
  }
}
